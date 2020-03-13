import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import { getRainbow } from './common/utils'

Vue.config.productionTip = false;

// Vue.prototype.$bus = new Vue(); // 事件总线

Vue.directive('rainbow', { // 自定义指令，随机生成背景色
  bind(el, binging, vnode) {
    getRainbow(el);
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
