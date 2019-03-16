module.exports = function () {
  const { jsonData } = this.request.body;
  this.accountMgr.setJsonData(jsonData);
  this.body = { ec: 0 };
};
