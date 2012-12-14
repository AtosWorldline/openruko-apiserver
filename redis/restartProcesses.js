var printf = require('printf');
var uuid = require('uuid');

module.exports = function(client, payload, cb){
  var ps = payload.ps;
  var type = payload.type;

  var multi = client.MULTI();
  if(ps){
    restartByPs(multi, {
      appName: appName,
      ps: ps
    });
  }

  if(type){
    restartByType(multi, {
      appName: appName,
      type: type
    });
  }
  multi.EXEC(cb);
}

module.exports.restartByType = function(multi, options, cb){
  var appName = options.appName;
  var type = options.type;
  var typeRegExp = new RegExp(type);

  client.SMEMBERS('ps:' + appName, function(err, results){
    if(err) return cb(err);
    results.forEach(function(ps){
      if(!typeRegExp.test(ps)) return;
      restartByPs(multi, ps);
    });
  });
}

module.exports.restartByPs = function restartByPs(multi, options){
  var appName = options.appName;
  var ps = options.ps;
  var dynoId = uuid.v4();
  client.SRANDMEMBER('host', function(err, host){
    multi.RPUSH(printf('dyno:%s:%s', appName, ps), printf('%s:%s', host, dynoId));
  });
  client.watch('HMSET', printf('dyno:%s:%s:%s:%s', appName, ps, host, dynoId), function(obj){
    if(obj.state !== 'up') return;
    client.LLEN(printf('dyno:%s:%s', appName, ps), function(err, length){
      if (length <=1) return;
      client.LPOP(printf('dyno:%s:%s', appName, ps), function(err, hostAndDyno){
        if(err) return cb(err);
        client.DEL(printf('dyno:%s:%s:%s', appName, ps, hostAndDyno))
      })
    });
  });
  }
