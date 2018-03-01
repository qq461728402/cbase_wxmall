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
}
export default getters;
