module.exports = function () {
  const { authKey } = this.request.body;
  this.accountMgr.setAuthKey(authKey);
  this.body = { ec: 0 };
};
