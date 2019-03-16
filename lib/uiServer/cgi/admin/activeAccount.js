
module.exports = function () {
  const { name, active } = this.request.body;
  if (this.accountMgr.activeAccount(name, active !== 'false')) {
    this.success();
  } else {
    this.error();
  }
};
