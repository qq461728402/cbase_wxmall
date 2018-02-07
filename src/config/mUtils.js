/**
 * Created by dx on 17/12/13.
 */
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
