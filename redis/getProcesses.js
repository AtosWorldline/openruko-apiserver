module.exports = function(client, payload, cb){
  client.hgetall('ps:' + payload.appName, cb)
};
