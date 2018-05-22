/**
 * Created by dx on 18/3/1.
 */
import {getToken,removeToken,getStore,setStore} from '@/config/mUtils'

const customerInfo={
  state:{
    customerinfo:{
      customerId:0,
      customerLastname:'',
      avatar: "",
      customerNickname: "",
      customerPhone: "",
      customerEmail: "",
      customerGender: "",
      mediaId: "",
      bonusPoints: 0,
      growth: "",
      tags: [],
      rankName: ""
    }
  },
  mutations:{
    SET_CUSTOMERINFO:(state,customerinfo)=>{
      state.customerinfo=customerinfo;
    },
  },
  actions: {
    getCustomerInfo({commit},customerinfo){
      commit('SET_CUSTOMERINFO',customerinfo);
    }
  },
  getters:{
    customerinfo:state => state.customerinfo,
  }
}
export  default customerInfo;
