
module.exports = function () {
  this.body = { ec: 0, list: this.accountMgr.getAllAccounts() };
};
