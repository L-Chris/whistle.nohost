module.exports = function () {
  const { rulesTpl } = this.request.body;
  this.accountMgr.setRulesTpl(rulesTpl);
  this.body = { ec: 0 };
};
