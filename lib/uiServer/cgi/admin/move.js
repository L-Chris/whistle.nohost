
module.exports = function () {
  const { fromName, toName } = this.request.body;
  if (this.accountMgr.moveAccount(fromName, toName)) {
    this.success();
  } else {
    this.error();
  }
};
