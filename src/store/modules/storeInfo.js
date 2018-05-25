/**
 * Created by dx on 18/3/1.
 */
import {getToken,removeToken,getStore,setStore} from '@/config/mUtils'

const storeInfo={
  state:{
    storeinfo:{
      storeDesc: '',
      storeId: 1,
      storeName: "",
      storePhone: ""
    }
  },
  mutations:{
    SET_STOREINFO:(state,storeinfo)=>{
      state.storeinfo=storeinfo;
    },
  },
  actions: {
    getStoreInfo({commit},storeinfo){
      commit('SET_STOREINFO',storeinfo);
    }
  },
  getters:{
    storeinfo:state => state.storeinfo,
  }
}
export  default storeInfo;
