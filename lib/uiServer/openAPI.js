const proxy = require('./cgi/proxy');
const { AUTH_KEY } = require('../util');

const CGI_MAP = {
  'add-env': 'rules/add',
  'add-top-env': 'rules/project',
  'add-top-rules': 'rules/project',
  'add-rules': 'rules/add',
  'modify-env': 'rules/add',
  'modify-rules': 'rules/add',
  'remove-env': 'rules/remove',
  'remove-rules': 'rules/remove',
  'rename-env': 'rules/rename',
  'rename-rules': 'rules/rename',
  list: 'rules/list',
};

module.exports = function* (next) {
  const name = this.get('x-nohost-account-name');
  let { cgiName } = this.params;
  cgiName = CGI_MAP[cgiName];
  const account = cgiName && this.accountMgr.getAccount(name);
  if (!account) {
    return;
  }
  const autKey = this.get('x-nohost-auth-key') || '';
  if (autKey !== this.accountMgr.getAuthKey()) {
    this.status = 403;
    return;
  }
  const { req } = this;
  req.headers['x-whistle-auth-key'] = AUTH_KEY;
  let { url } = req;
  const index = url.indexOf('?');
  url = index === -1 ? '' : url.substring(index);
  req.url = `/account/${name}/cgi-bin/${cgiName}${url}`;
  this.account = account;
  yield proxy.call(this, next);
};
