/**
 * Created by dx on 18/2/27.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import basicStorage from './modules/basicStorage'
import getters from './getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    basicStorage
  },
  getters
});
export  default store;
