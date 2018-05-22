/**
 * Created by dx on 18/2/27.
 */
const getters= {
  categoryLists:state => state.basicStorage.categoryList,
  configLists:state => state.basicStorage.configList,
  avatar:state => state.cookieMsg.avatar,
  token:state => state.cookieMsg.token,
  uid:state => state.cookieMsg.uid,
  uname:state => state.cookieMsg.uname,
  store:state => state.cookieMsg.store,
  cityName:state => state.basicStorage.cityName,
  locatingCity:state => state.basicStorage.locatingCity,
  quantity:state => state.basicStorage.quantity,
  invoice:state => state.basicStorage.invoice,
  userInfo:state => state.customerInfo.userInfo,
  router:state => state.basicStorage.router,
  scrollPosion:state =>state.basicStorage.scrollPosion,
  indexhomeScroll:state =>state.basicStorage.indexhomeScroll,
  shearUrl:state =>state.basicStorage.shearUrl,
  shearTitle:state =>state.basicStorage.shearTitle,
  title:state => state.basicStorage.title,
  baseInfo:state =>state.basicStorage.baseInfo,
}
export default getters;
