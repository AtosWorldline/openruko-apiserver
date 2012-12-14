module.exports = function(client, payload, cb){
  var appName = payload.appName;
  var ps = payload.ps;
  var type = new RegExp(payload.type);

  if(ps){
    var multi = client.MULTI();
    stopByPs(multi);
    multi.EXEC(cb);
  }

  if(type){
    client.SMEMBERS('ps:' + appName, function(err, results){
      if(err) return cb(err);
      var multi = client.MULTI();
      results.forEach(function(ps){
        if(!type.test(ps)) return;
        stopByPs(multi, appName, ps);
      });
      multi.EXEC(cb);
    });
  }
};

module.exports.stopByPs = function stopByPs(multi, appName, ps){
    multi.SREM('ps:' + appName, ps);
    multi.DEL('ps:' + appName + ':' + ps);
    client.SMEMBERS('dyno:' + appName + ':' + ps, function(err, dynos){
      if(err) return cb(err);
      dynos.forEach(function(dyno){
        multi.DEL('dyno:' + appName + ':' + ps + ':' + dyno);
      });
    });
  }
