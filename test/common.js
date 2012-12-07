var server = require('../apiserver/apiserver');
var _ = require('underscore');
var request = require('request').defaults({json: true});

exports.defaultUser = {
  email: 'test@test.com',
  name: 'test',
  password: 'test',
  apiKey: '28790f7a7e2a33a7d12b0d5206cbc36020a36649',
  isSuperUser: false
};

exports.defaultKey = {
  sshKey: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDKwNiuklprOgtXBOyS10l40bGdztXQg9nKT5a+bwEmbyuXMOSa49c5YzXgGcEdhtQ2CbJ9GK9URywPD3SX0JgFQ588tT5E75ZhbSXgRQLipwDZF5g4RaKuZwpJ3ifb9TVl/M0gh8oVFCyZdLj4NHbLg1qG46oeKqKmBBuNPjxC2Ki9yiA3aFe1mKNxivDWf/c44cvYRC/D4/Ckn7Iql1xSpMXHvPzRRYjKElHhZlHuBRp1aezb+WxN11zHg9b+xsN5t7EjShVyGmld5LpwG7ZCqTUvy8LbFCKEELpr1/5atASb4d3vNYZ77lLb9Mx0GozJ5nYlAdLqXbhMvT6bTAyj me@hostname',
  fingerprint: '6cbcf7c2b4703cd2b49b2c49878c403e'
}

var app;
exports.startServer = function(cb){
  if(app) return cb();
  app = server.createServer({
    port: 5000,
    s3key: 123,
    s3secret: 123
  });
  app.start(cb);
};

exports.addUser = function(user, cb){
  if(typeof user === 'function'){
    cb = user;
    user = {};
  }
  app.db.exec('addUser', _(user).defaults(exports.defaultUser), function(err, results){
    if(err) return cb(err);
    cb(null, results.rows[0]);
  });
};

exports.cleanDB = function(cb){
  app.db.exec('clean', null, cb);
};

var base = 'http://:' + exports.defaultUser.apiKey + '@localhost:5000';
exports.addApp = function(cb){
  request.post({
    url: base + '/apps',
    qs: {
      'app[name]' : 'myApp',
      'app[stack]': null
    }
  }, cb);
};

exports.addConfig = function(cb){
  request.put({
    url: base + '/apps/myApp/config_vars',
    body: JSON.stringify({
      KEY1: 'VALUE1',
      KEY2: 'VALUE2'
    }),
    json: false
  }, cb);
};
