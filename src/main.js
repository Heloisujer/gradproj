// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';

import Print from 'vue-print-nb'
Vue.use(Print);

import axios from 'axios';
import qs from 'qs';
//引入公共js文件
import common from './common'
Vue.use(common);
/*使用axios插件*/
Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false;
// 引入所有css样式文件
import './assets/css/index.less';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})