const { checkLogin } = require('../../../util');

module.exports = function* (next) {
  const { username, password } = this.admin;
  const accept = checkLogin(this, {
    username,
    password,
    nameKey: 'nohost_admin_name',
    authKey: 'nohost_admin_key',
  });
  if (accept) {
    yield next;
  }
};
