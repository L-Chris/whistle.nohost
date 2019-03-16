module.exports = function () {
  const { name, password } = this.request.body;
  if (this.accountMgr.changePassword(name, password)) {
    this.success();
  } else {
    this.error();
  }
};
