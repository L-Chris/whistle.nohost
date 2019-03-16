module.exports = function () {
  const { password } = this.request.body;
  if (this.accountMgr.changePassword(this.user.name, password)) {
    this.success();
  } else {
    this.error();
  }
};
