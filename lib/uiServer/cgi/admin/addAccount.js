
module.exports = function () {
  if (this.accountMgr.addAccount(this.request.body)) {
    this.success();
  } else {
    this.error();
  }
};
