module.exports = function () {
  const { testRules } = this.request.body;
  this.accountMgr.setTestRules(testRules);
  this.body = { ec: 0 };
};
