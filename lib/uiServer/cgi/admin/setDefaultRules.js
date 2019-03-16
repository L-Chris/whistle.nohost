module.exports = function () {
  const { defaultRules } = this.request.body;
  this.accountMgr.setDefaultRules(defaultRules);
  this.body = { ec: 0 };
};
