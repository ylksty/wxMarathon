import wepy from 'wepy'

export default class configMixin extends wepy.mixin {
  data = {
    devRequest: 'https://result.eolinker.com/XZJACKU081cdbb1ae05330e2abbaf09c3c218212915a835?uri=',
    prodRequest: 'todo',
    api: {
      index_banners_head: '/banners/head',
      index_project_list: '/product/list',
      product_data: '/product/{id}',
      store_list: '/store/list'
    }
  }

  onLoad() {
    console.log('configMixin onLoads')
  }

  getUri(type) {
    if (this.data.api[type]) {
      if (this.$parent.isProd) {
        return this.data.prodRequest
      } else {
        return this.data.devRequest + this.data.api[type]
      }
    } else {
      return undefined
    }
  }
}
