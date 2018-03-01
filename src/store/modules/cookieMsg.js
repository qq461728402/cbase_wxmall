/**
 * Created by dx on 18/3/1.
 */
import {getToken} from '../../config/mUtils'
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
      state.avatar=getToken('avatar');
    },
    SET_TOKEN:(state)=>{
      state.token=getToken('token');
    },
    SET_UID:(state)=>{
      state.uid=getToken('uid');
    },
    SET_UNAME:(state)=>{
      state.uname=getToken('uname');
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
