module.exports = function () {
  const { entryRules } = this.request.body;
  this.accountMgr.setEntryRules(entryRules);
  this.body = { ec: 0 };
};
