var net = require('../net');

module.exports = {
  getDomains: {
    routePath: '/apps/:appName/domains',
    method: 'get',
    okayCode: 200,
    //after: 'onlyRows'
    handler: net.domains.get
  },
  deleteDomain: {
    routePath: '/apps/:appName/domains/:domainName',
    method: 'delete',
    okayCode: 200,
    errorCode: 404,
    handler: net.domains.delete
  },
  deleteDomains: {
    routePath: '/apps/:appName/domains',
    method: 'delete',
    okayCode: 200,
    handler: net.domains.delete
  },
  addDomain: {
    routePath: '/apps/:appName/domains',
    payloadSource: 'query',
    method: 'post',
    okayCode: 201,
    errorCode: 422,
    handler: net.domains.add,
    after: function(cb) {
      this.responsePayload = {
        domain: this.requestPayload.domainName
      };
      cb();
    },
    before: function(cb) {
      this.requestPayload.domainName = this.requestPayload.domain_name.domain;
      cb();

    }
  }
};
