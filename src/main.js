import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import toast from 'components/common/toast'

import { getRainbow } from './common/utils'

Vue.config.productionTip = false;

// 安装toast插件
Vue.use(toast);

// Vue.prototype.$bus = new Vue(); // 事件总线

// 自定义指令，随机生成背景色
Vue.directive('rainbow', {
  bind(el, binging, vnode) {
    getRainbow(el);
  }
})

// 输入框自动获取焦点
Vue.directive('focus', {
  inserted(el, binging, vnode) {
    el.focus();
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
