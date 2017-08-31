import wepy from 'wepy'

export default class comMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    }
  }
  copy(source) {
    return JSON.parse(JSON.stringify(source))
  }
  onLoad() {
    console.log('comMixin onLoad')

  }
}
