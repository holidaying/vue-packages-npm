// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import posaComponents from './posasrc/index'

import jQuery from "./posasrc/packages/jquery.min.js";
//全局处理
window.jQuery = window.$ = jQuery;
Vue.config.productionTip = false;
Vue.use(posaComponents);
    /* eslint-disable no-new */
window.testVue = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
})
