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
      if(getStore('avatar').length>0){
        state.avatar=getStore('avatar');
      }else{
        state.avatar=getToken('avatar');
        if(getToken('avatar')){
          setStore('avatar',getToken('avatar'));
          removeToken('avatar');
        }
      }
    },
    SET_TOKEN:(state)=>{
      var getToken=getToken('token');
      if(getToken.length>0){
        state.token=getToken('token');
        if(getToken('token')){
          setStore('token',getToken);
          removeToken('token');
        }
      }else{
        state.token=getStore('token');
      }
    },
    SET_UID:(state)=>{
      if(getStore('uid').length>0){
        state.uid=getStore('uid');
      }else{
        state.uid=getToken('uid');
        if(getToken('uid')){
          setStore('uid',getToken('uid'));
          removeToken('uid');
        }
      }
    },
    SET_UNAME:(state)=>{
      if(getStore('uname').length>0){
        state.uname=getStore('uname');
      }else{
        state.uname=getToken('uname');
        if(getToken('uname')){
          setStore('uname',getToken('uname'));
          removeToken('uname');
        }
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
