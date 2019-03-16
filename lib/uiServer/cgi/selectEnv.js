const { COOKIE_NAME, ENV_MAX_AGE, decodeURIComponentSafe, getClientId } = require('../../util');

module.exports = function () {
  const { name, envId, redirect } = this.request.query;
  const envName = decodeURIComponentSafe(envId);
  const env = this.envMgr.setEnv(getClientId(this), name, envName);
  let value = '';
  if (env) {
    value = encodeURIComponent(`${name}/${env.envName}`);
  }
  this.cookies.set(COOKIE_NAME, value, {
    path: '/',
    expires: new Date(Date.now() + (ENV_MAX_AGE * 1000)),
  });
  if (redirect && typeof redirect === 'string') {
    this.redirect(redirect);
  } else {
    this.body = { ec: 0 };
  }
};
