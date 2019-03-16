const { transformWhistle } = require('../../util');
const initNetwork = require('../network');

module.exports = function* () {
  const { req } = this;
  req.url = req.url.replace('/network', '');
  req.headers.host = 'local.wproxy.org';
  req.headers['x-forwarded-for'] = this.ip || '127.0.0.1';
  const port = yield initNetwork();
  yield transformWhistle(this, port);
};
