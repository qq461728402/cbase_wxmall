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
      state.uid=getToken('avatar');
      if(getToken('avatar')){
        removeToken('avatar');
      }
    },
    SET_TOKEN:(state)=>{
      if(getStore('token')){
        state.token=getStore('token');
      }else{
        state.token=getToken('token');
        if(getToken('token')){
          setStore('token',getToken('token'));
          removeToken('token');
        }
      }
    },
    SET_UID:(state)=>{
      state.uid=getToken('uid');
      if(getToken('uid')){
        removeToken('uid');
      }
    },
    SET_UNAME:(state)=>{
      state.uname=getToken('uname');
      if(getToken('uname')){
        removeToken('uname');
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
