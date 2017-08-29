/**
 * Created by yanglk on 17/8/29.
 */
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (err) {
        //失败
        reject(err)
      }
      fn(obj)
    })
  }
}

export default [
  'login', 'getUserInfo', 'authorize', 'getSetting', 'startRecord', 'stopRecord',
  'showModal', 'openSetting'
].reduce((acc, cur) => {
  acc[cur] = wxPromisify(wx[cur]);

return acc;
}, {
  wxPromisify: wxPromisify
});
