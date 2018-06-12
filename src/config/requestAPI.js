/*数据请求统一处理*/
import axios from 'axios'
import {Loading,Toast} from 'vue-ydui/dist/lib.rem/dialog'
let  base =process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi' : process.env.URL;
axios.defaults.withCredentials=true;
axios.defaults.baseURL=base;
axios.interceptors.request.use(config => {
  return config;
}, err => {
  Toast({mes:'请求超时'});
  return Promise.resolve(err);
});
axios.interceptors.response.use(response =>{
  if (response.data && response.data.code === 401) { // 401, token失效
    console.log('token失效');
    Toast({mes:response.data.msg})
    return;
  }else if(response.data && response.data.code === 500){
    console.log('请求接口错误');
    Toast({mes:'请求接口错误'});
    return;
  }
  return response;
},err => {
  Toast({mes:err.toString()});
  Promise.resolve(err);
});
export function apiRequest(url,par, method, loadmsg, callback,isAllData=false){
  if (loadmsg.length != 0) {
    Loading.open(loadmsg);
  }
  axios({
    method: method,
    url: url,
    params:par,
    data:par,
    timeout: 15000,
  }).then(response=> {
    if(response.data.code==200){
      if (callback) {
        callback(isAllData==false?response.data:response)
      }
    }
    else{
      Toast({
        mes: response.data.msg,
        timeout: 2000,
      });
    }
    Loading.close();
  }).catch(error => {
    console.log(error.toString());
    Loading.close();
  })
}
