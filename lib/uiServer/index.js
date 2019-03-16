const Koa = require('koa');
const onerror = require('koa-onerror');
const serve = require('koa-static');
const path = require('path');
const router = require('koa-router')();
const setupRouter = require('./router');
const accountMgr = require('../accountMgr');
const envMgr = require('../envMgr');
const whistleMgr = require('../whistleMgr');

const MAX_AGE = 1000 * 60 * 5;
const success = function () {
  this.body = { ec: 0 };
};
const error = function (em, ec) {
  em = em || '请求失败，请刷新页面重试';
  ec = ec || 2;
  this.body = { ec, em };
};

module.exports = (server, options) => {
  const { username, password } = options.config;
  const app = new Koa();
  app.proxy = true;
  onerror(app);
  app.use(function* (next) {
    this.success = success;
    this.error = error;
    this.accountMgr = accountMgr;
    this.envMgr = envMgr;
    this.config = options.config;
    this.whistleMgr = whistleMgr;
    this.admin = { username, password };
    if (/\.(?:woff|svg|eot|ttf)$/i.test(this.path)) {
      this.req.url = `/js${this.path.substring(this.path.lastIndexOf('/'))}`;
    } else if (this.path === '/' || this.path === '/index.html') {
      this.req.url = '/select.html';
    }
    yield next;
  });
  setupRouter(router);
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(serve(path.join(__dirname, '../../public'), { maxage: MAX_AGE }));
  server.on('request', app.callback());
};
