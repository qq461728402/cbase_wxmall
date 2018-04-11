/**
 * Created by dx on 18/3/1.
 */
import {getToken,removeToken,getStore,setStore} from '../../config/mUtils'
/**
 * Created by dx on 18/2/27.
 */
const cookieMsg={
  state:{
    avatar:'',
    token:'',
    uid:'',
    uname:''
  },
  mutations:{
    SET_AVATAR:(state)=>{
      var avatarstr=getToken('avatar');
      if(avatarstr.length>0){
        state.avatar=getToken('avatar');
        if(getToken('avatar')){
          setStore('avatar',avatarstr);
          removeToken('avatar');
        }
      }else{
        state.avatar=getStore('avatar');
      }
    },
    SET_TOKEN:(state)=>{
      // setStore('token','eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjM0MjcxNTQsInN1YiI6IntcInVpZFwiOjIsXCJzY29wZVwiOlwiQUxMXCJ9IiwiaXNzIjoiTUFMTCJ9.wr-LxT4oQa4i7lPjfv2HTVJf3oHMy-2y4WUFrqb4ZMw');
      //  state.token=getStore('token');
      var tokenstr=getToken('token');
      if(tokenstr.length>0){
        state.token=getToken('token');
        if(getToken('token')){
          setStore('token',tokenstr);
          removeToken('token');
        }
      }else{
        state.token=getStore('token');
      }
    },
    SET_UID:(state)=>{
      var tokenuid=getToken('uid');
      if(tokenuid.length>0){
        state.uid=getToken('uid');
        if(getToken('uid')){
          setStore('uid',tokenuid);
          removeToken('uid');
        }
      }else{
        state.uid=getStore('uid');
      }
    },
    SET_UNAME:(state)=>{
      var tokenuname=getToken('uname');
      if(tokenuname.length>0){
        state.uname=getToken('uname');
        if(getToken('uname')){
          setStore('uname',tokenuname);
          removeToken('uname');
        }
      }else{
        state.uname=getStore('uname');
      }
    },
  },
  actions: {
    getAvatar({commit}){
      commit('SET_AVATAR');
    },
    getToken({commit}){
      commit('SET_TOKEN');
    },
    getUid({commit}){
      commit('SET_UID');
    },
    getUname({commit}){
      commit('SET_UNAME');
    }
  }
}
export  default cookieMsg;
