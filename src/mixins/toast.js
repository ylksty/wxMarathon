import wepy from 'wepy'

export default class toastMixin extends wepy.mixin {
  data = {
  }

  onLoad() {
    console.log('toastMixin onLoads')
  }

  loading(hide) {
    if (!hide) {
      wepy.showLoading({
        title: '加载中'
      })
    } else {
      wepy.hideLoading()
    }
  }
  serverFail(msg) {
    wepy.showToast({
      title: 'serverFail:' + msg,
      icon: 'loading',
      duration: 2000
    })
  }

  interfaceFail(msg) {
    wepy.showToast({
      title: 'interfaceFail:' + msg,
      icon: 'loading',
      duration: 2000
    })
  }

  dataFail(errorCode, msg) {
    wepy.showToast({
      title: 'dataFail:' + errorCode + ':' + msg,
      icon: 'loading',
      duration: 2000
    })
  }

  paramFail(msg) {
    wepy.showToast({
      title: 'paramFail:' + msg,
      icon: 'loading',
      duration: 2000
    })
  }
}
