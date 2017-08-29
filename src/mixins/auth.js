import wepy from 'wepy'
import _ from '../model/wx.promise'

export default class authMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    }
  }
  authGet(key) {
    // 合成接口对应的授权名
    var scope = 'scope.' + key
    // Promise
    return new Promise((authRes, authRej) => {
      // 获取授权情况
      _.getSetting().then(res => {
        console.log(res)
        if (res.authSetting[scope]){
          // 曾经确实是授过权，直接 resolved
          authRes(true);
        } else {
          // 尚未授权，则需要主动挑起授权
          _.authorize({
            // 希望授权的名字
            scope: scope
          }).then(suc => {
            // 用户同意授权， resolved
            authRes(suc)
          }, rej => {
            // 不然的话 就是我刚刚提到的递归请求授权了
            // 因此编写 reGet
            this.reGet(scope, authRes)
          })
        }
      })
    })
  }
  reGet(scope, authRes){
    // 弹窗询问
    _.showModal({
      title: '授权提醒',
      content: '拒绝授权会影响小程序的使用, 请点击重新授权',
      confirmText: '重新授权',
      // 只有确定，没有取消
      showCancel: false
    }).then(() => {
      // 打开设置 用户自己设置被拒绝的权限为允许
      _.openSetting().then(() => {
        // 用户结束了设置框
        // 但是还要检查
        _.getSetting().then(res => {
          if (!res.authSetting[scope]){
            // 居然什么也没做就退出来设置了
            // 递归地 reGet
            // 写一个 setTimeout 防止太阻塞 JSCore ...
            setTimeout(() => {
              this.reGet(scope, authRes)
            })
          } else {
            // resolved！
            authRes()
          }
        })
      })
    })
  }
  onLoad() {
    console.log('authMixin onLoad')

  }
}
