/**
 * Created by dx on 17/10/26.
 */
import Vue from 'vue';
import axios from 'axios'
import router from '../router'
import VueAxios from 'vue-axios'
import YDUI from 'vue-ydui'
import store from '../store'
import {removeStore} from './mUtils'
Vue.use(VueAxios, axios)
Vue.use(YDUI)
axios.defaults.withCredentials=true;
axios.defaults.baseURL = process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi' : 'http://weixin.e-cbest.com/test';//http://joewee.mynatapp.cc/mall
store.dispatch('getToken');
// axios.defaults.headers.token = store.getters.token;
/*
 * 拦截器*/
axios.interceptors.response.use(response =>{
  if (response.data && response.data.code === 401) { // 401, token失效
    removeStore('userInfo');
  }else if(response.data && response.data.code === 500){
    console.log(response.request.responseURL);
  }
  return response;
});
export  const  uploadURL=axios.defaults.baseURL+'/api/file/upload';
/*par 参数
 *url 接口地址
 *method 请求方式POST Get
 */
export function baseHttp(ydui, url, par, method, loadmsg, callback) {
  if (loadmsg.length != 0) {
    ydui.$dialog.loading.open(loadmsg);
  }
  axios({
    method: method,
    url: url,
    params:par,
    data:par,
    timeout: 15000,
  }).then(function (response) {
    if(response.data.code==200){
      if (callback) {
        callback(response.data)
      }
    }
    else{
      ydui.$dialog.toast({
        mes: response.data.msg,
        timeout: 2000,
      });
    }
    ydui.$dialog.loading.close();
  }).catch(function (error) {
    console.log(error);
    ydui.$dialog.loading.close();
    // ydui.$dialog.toast({
    //   mes: error,
    //   timeout: 1000,
    //   icon: 'error',
    // });
  })
}


export function baseHttp1(ydui, url, par, method, loadmsg, callback) {
  if (loadmsg.length != 0) {
    ydui.$dialog.loading.open(loadmsg);
  }
  axios({
    method: method,
    url: url,
    params:par,
    data:par,
    timeout: 15000,
  }).then(function (response) {
    if(response.data.code!=200){
      ydui.$dialog.toast({
        mes: response.data.msg,
        timeout: 2000,
      });
    }
    if (callback) {
      callback(response.data)
    }
    ydui.$dialog.loading.close();
  }).catch(function (error) {
    console.log(error);
    ydui.$dialog.loading.close();
    // ydui.$dialog.toast({
    //   mes: error,
    //   timeout: 1000,
    //   icon: 'error',
    // });
  })
}

/*
 获取Cookie是否存在
 */
export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return true;
  }
  return false;
}
var eventBus = new Vue({});
export default eventBus;

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export  function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}



