const Koa = require('koa');
const accountMgr = require('./accountMgr');
const envMgr = require('./envMgr');
const whistleMgr = require('./whistleMgr');
const {
  WHISTLE_ENV_HEADER,
  WHISTLE_RULE_VALUE,
  isFromComposer,
} = require('./util');

const ENABLE_CAPTURE = /^(?:[^#]*\s)?enable:\/\/(?:capture|https|intercept)(?:\s|$)/m;

module.exports = (server) => {
  const app = new Koa();
  app.proxy = true;
  app.use(function* () {
    let { account, env } = envMgr.getEnvByHeader(this, isFromComposer(this));
    if (!account) {
      env = envMgr.getEnvOnly(this);
      account = env && accountMgr.getAccount(env.name);
    }
    let proxyUrl = '';
    if (account) {
      const headers = {};
      let envValue = `${account.name}/`;
      if (env) {
        const { envName } = env;
        if (envName) {
          envValue = `${envValue}${envName}`;
          const { rules } = accountMgr.getRules(account.name, envName);
          if (rules) {
            // 设置了拦截https请求，则所有该环境的请求都开启
            if (ENABLE_CAPTURE.test(rules)) {
              this.body = '* enable://capture';
              return;
            }
            headers[WHISTLE_RULE_VALUE] = encodeURIComponent(rules);
          }
        }
      }
      headers[WHISTLE_ENV_HEADER] = encodeURIComponent(envValue);
      const envHeader = `reqHeaders://(${JSON.stringify(headers)})`;
      const port = yield whistleMgr.fork(account);
      proxyUrl = `internal-proxy://127.0.0.1:${port}`;
      this.body = `/./ ${proxyUrl} ${envHeader}`;
    }
  });
  server.on('request', app.callback());
};
