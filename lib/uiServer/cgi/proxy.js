const LRU = require('lru-cache');
const { transformWhistle } = require('../../util');
const whistleMgr = require('../../whistleMgr');

const tempCache = new LRU({ maxAge: 5000 });

module.exports = function* (next) {
  const account = this.account || this.accountMgr.getAccount(this.params.name);
  if (!account) {
    return yield next;
  }
  const { name } = account;
  const { req } = this;
  req.url = req.url.substring(`/account/${name}`.length);
  if (!req.url.indexOf('/cgi-bin/get-data?') && req.url.indexOf('ip=self') !== -1) {
    const followerIp = this.envMgr.getFollower(this);
    if (followerIp) {
      req.url = req.url.replace('ip=self', `ip=self,${followerIp}`);
    }
  }
  req.headers.host = 'local.wproxy.org';
  req.headers['x-forwarded-for'] = this.ip || '127.0.0.1';
  const port = yield whistleMgr.fork(account);
  try {
    yield transformWhistle(this, port);
  } catch (err) {
    if (err.code === 'ECONNREFUSED' && !tempCache.get(name)) {
      tempCache.set(name, 1);
      whistleMgr.kill(name);
    }
    throw err;
  }
};
