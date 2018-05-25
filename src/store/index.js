/**
 * Created by dx on 18/2/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import basicStorage from './modules/basicStorage'
import cookieMsg from './modules/cookieMsg'
import customerInfo from './modules/customerInfo'
import storeInfo from './modules/storeInfo'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    basicStorage,
    cookieMsg,
    customerInfo,
    storeInfo
  },
  getters
});
export  default store;
