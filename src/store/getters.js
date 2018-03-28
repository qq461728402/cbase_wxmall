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
  cityName:state => state.basicStorage.cityName,
  locatingCity:state => state.basicStorage.locatingCity,
  quantity:state => state.basicStorage.quantity,
  invoice:state => state.basicStorage.invoice,
  userInfo:state => state.basicStorage.userInfo,
  router:state => state.basicStorage.router,
  scrollPosion:state =>state.basicStorage.scrollPosion,
  indexhomeScroll:state =>state.basicStorage.indexhomeScroll,

}
export default getters;
