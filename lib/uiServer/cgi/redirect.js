const { getClientId } = require('../../util');

module.exports = function () {
  const { url, name, env } = this.request.query;
  const account = this.accountMgr.getAccount(name);
  if (account) {
    this.envMgr.setEnv(getClientId(this), name, env);
  }
  this.redirect(url || './');
};
