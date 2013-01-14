var redis = require('redis'),
client = redis.createClient();

function getDomainName (hostname) {
  var idx = hostname.lastIndexOf('.');

  if (idx < 0) {
    return hostname;
  }
  idx = hostname.lastIndexOf('.', idx - 1);
  if (idx < 0) {
    return hostname;
  }
  return hostname.substr(idx);
};

module.exports = {
  domains: {
    get: function (cb) {
      var self = this,
      appName = this.requestPayLoad.appName;

      client.lrange('apps:domains:' + appName, 0, -1, function (err, backends) {

        if(err)
         return cb(err, 500);

       if(!Array.isArray(backends))
         return self.responsePayLoad = [];

       self.responsePayLoad = backends;
       cb();
     });
    },
    delete : function (cb) {
      var self = this,
        domainToDelete = self.requestPayLoad.domain || null,
        appName = self.requestPayLoad.appName;

      var multi = client.multi(),
        toDelete = [];

      function onDelete (err, results) {
        var deleted = results.reduce(function(a,b){return a+b;});
        if(err)
          return  cb(err, 500);
        if(deleted < 1)
          return  cb('', 404);
        cb();
      }

      if(domainToDelete !== null) {
        //remove only one domain associated to the app
        multi.lrem('apps:domains:' + appName, 1, domainToDelete);
        toDelete = ['frontend:' + domainToDelete,
                    'dead:' + domainToDelete];
        multi.del( toDelete );
        multi.exec( onDelete );

      } else {
        //remove all domains associated to the app

        client.lrange('apps:domains:' + appName, 0, -1, function getDomains(err, domains) {
          if(err)
            return cb(err, 500);

          if(!domains)
            return cb('', 404);

          toDelete = ['apps:domains:' + appName];
          domains.forEach(function(domain) {
            toDelete.concat(['frontend:' + domain, 'dead:' + domain]);
          });

          multi.del( toDelete );
          multi.exec( onDelete );
        }
      });
    },
    add: function (cb) {
      var self = this,
        appName = self.requestPayLoad.appName,
        domainToAdd = self.requestPayLoad.domainName,
        ips = ;

      var multi = client.multi();
      multi.rpush('apps:domains:' + appName, domainToAdd);
      multi.rpush('frontend:' + domainToAdd, appName);

      //ToDo -> ips !!!!
      ips.forEach(function(ip) {
        multi.rpush('frontend:' + domainToAdd, ip);
      });
      
      multi.exec( function(err) {
        if(err)
          return cb(err);
        cb(); // real response is handled by after
      });

    }
  }
};