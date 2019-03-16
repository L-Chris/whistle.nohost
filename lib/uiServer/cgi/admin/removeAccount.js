module.exports = function () {
  const { name } = this.request.body;
  if (this.accountMgr.removeAccount(name)) {
    this.whistleMgr.kill(name);
    this.success();
  } else {
    this.error();
  }
};
