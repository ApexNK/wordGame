
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import routes from './routers.js';

/* eslint-disable no-new */

// 初始化依赖
[VueResource, VueRouter].map((plugin) => {
  Vue.use(plugin);
});
const router = new VueRouter({
  routes
});

router.beforeEach(function (to, from, next) {
  console.log(to, from)
  next()
});

new Vue({
  router,
  components: {
    App
  }
}).$mount('#app');
