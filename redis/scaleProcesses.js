var stopByPs = require('./stopProcesseses').stopByPs;
var getCurrentRelease = require('./getCurrentRelease').get,
var printf = require('printf');
var uuid = require('uuid');

module.exports = function(client, payload, cb){
  var appName = payload.appName;
  var type = payload.type;
  var typeRegExp = new RegExp(type);
  var qty = +payload.qty;

  client.SMEMBERS('ps:' + appName, function(err, results){
    if(err) return cb(err);
    var multi = client.MULTI();
    var resultsFiltered = results.filter(function(ps){
      return typeRegExp.test(ps);
    });

    if(resultsFiltered.length === qty){
      return;
    }else if(resultsFiltered.length > qty){
      resultsFiltered.forEach(function(ps){
        stopByPs(multi, appName, ps);
      });
    }else if(resultsFiltered.length < qty){
      getCurrentRelease(appName, function(err, release){
        if(err) return cb(err);
        _.range(resultsFiltered.length, qty).forEach(function(id){
          startWithType(multi, {
            appName: appName, 
            type: type,
            id:  id,
            command: release.pstable[type]
          });
          restartByType(multi, {
            appName: appName,
            type: type
          })
        });
      });
    }
    multi.EXEC(cb);
  });
};

module.exports.startWithType = function startWithType(multi, options){
  var appName = options.appName;
  var type = options.type;
  var id = options.id;
  var command = options.command;
  var release = options.release;

  multi.SADD(printf("ps:%s", appName), printf("%s.%d", type, id));
  multi.HMSET(printf("ps:%s:%s.%d", appName, type, id), {
    id: uuid.v4(),
    app_name: appName,
    state: null,
    process: printf("%s.%d", type, id),
    command: command,
    rendezvous_url: null,
    type: 'Ps'
  });
};
