/**
 * Created by dx on 17/12/13.
 */
import Cookies from 'js-cookie'
const TokenKey = 'Token'
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
   var getStr=window.localStorage.getItem(name)!=undefined?window.localStorage.getItem(name):'';
  if(getStr.length>0)return JSON.parse(getStr);
  else return {};
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}



export function getToken(name) {
  return Cookies.get(name)
}

export function setToken(name,value) {
  return Cookies.set(name, value)
}

export function removeToken(name) {
  return Cookies.remove(name)
}

