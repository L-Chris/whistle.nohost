
const { BASE_URL } = require('../../util');

module.exports = function () {
  const curEnv = this.envMgr.getEnv(this);
  const list = this.accountMgr.getAccountList(this.request.query.parsed);
  this.body = {
    ec: 0, baseUrl: BASE_URL, curEnv, list,
  };
};
