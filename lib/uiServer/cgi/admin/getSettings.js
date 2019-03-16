module.exports = function () {
  const {
    entryRules,
    jsonDataStr,
    rulesTpl,
    defaultRules,
    testRules,
  } = this.accountMgr;
  this.body = {
    ec: 0,
    jsonData: jsonDataStr,
    authKey: this.accountMgr.getAuthKey(),
    entryRules,
    rulesTpl,
    defaultRules,
    testRules,
  };
};
