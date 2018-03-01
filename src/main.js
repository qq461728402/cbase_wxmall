// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.base.css';
import 'vue-ydui/dist/ydui.rem.css';
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueWechatTitle from 'vue-wechat-title'
import Icon from 'vue-svg-icon/Icon.vue'
Vue.config.productionTip = false
Vue.use(YDUI);
Vue.use(VueAxios, axios)
Vue.use(VueWechatTitle);
Vue.component('icon', Icon)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.filter('dateYY', function(value) {
  if (!value) { return ''};
  var str = "" + value;
  if(str.length<11){return str};
  return str.substr(0,11);
});
Vue.filter('toTel', function(value) {
  if (!value) { return ''}
  var start = value.slice(0,4);
  var end = value.slice(-2);
  return start+"******"+end;
})
Vue.filter('num2P', function(value) {
  if (!value) { return ''}
  var str = "" + value;
  if(str == null || str == "0") return "0.00";
  if(str.indexOf('.') == -1) str += ".00";
  else str += "00";
  var m = /^\d+.\d{2}/.exec(str);
  return m != null ? m[0] : "0.00";
});
