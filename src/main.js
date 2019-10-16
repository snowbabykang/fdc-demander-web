Vue.config.devtools = process.env.NODE_ENV === 'development'


import App from './App'
import Antd from 'ant-design-vue'
import store from './vuex/store'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../static/js/flexible.js'

import 'ant-design-vue/dist/antd.less'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/common.css'

Vue.use(Antd);

// 简单配置
// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })


router.beforeEach((to, from, next) => {
   if (to.path == '/login') {
       store.dispatch('removeToken');
   }
   NProgress.start();
   next();
});
router.afterEach(transition => {
  NProgress.done();
});


// 全局公用方法
import global from './api/common'
Vue.prototype.GLOBAL = global


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
