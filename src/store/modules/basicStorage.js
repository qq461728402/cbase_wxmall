/**
 * Created by dx on 18/2/27.
 */
const basicStorage={
  state:{
    configList:[],//首页存储
    categoryList:[],//分类列表
    goodsList:[],//商品列表
  },
  mutations:{
     SET_CATELIST:(state,list)=>{
       state.categoryList=list;
     },
     SET_GOODSLIST:(state,list,categoryId)=>{
       state.goodsList.unshift({'id':categoryId,'list':list});
     },
     SET_CONFIGLIST:(state,list) => {
        state.configList=list;
     },
  },
  actions: {
    setCategoryList({commit},list){
      commit('SET_CATELIST',list);
    },
    setGoodList({commit},list,categoryId){
      commit('SET_GOODSLIST',list,categoryId);
    },
    setConfig({commit},list){
      commit('SET_CONFIGLIST',list);
    }
  }
}
export  default basicStorage;
