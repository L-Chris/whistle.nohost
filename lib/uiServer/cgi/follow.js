
const net = require('net');

module.exports = function () {
  const { followIp } = this.request.query;
  if (net.isIP(followIp)) {
    this.envMgr.setFollower(followIp, this);
    this.type = 'html';
    this.body = '<p style="text-align: center; padding: 20px 0;">设置成功，<a href="./">点击调整到选择环境页面</a></p>';
    return;
  }
  this.body = {
    ec: 0,
    clientIp: this.ip,
    followerIp: this.envMgr.getFollower(this),
  };
};
