/**
 * Created by dx on 18/2/27.
 */
const basicStorage={
  state:{
    cityName:'',//城市名称
    locatingCity:'',//定位城市
    configList:[],//首页存储
    categoryList:[],//分类列表
    goodsList:[],//商品列表
    quantity:'',//存储购物车数量
    invoice:{
      invoiceType:'NO',
      invoiceTitle:'',
      taxNumber:'',
      invoiceinfos:'商品明细'
    },//发票信息存储
  },
  mutations:{
     SET_CITYNAME:(state,cityName) =>{
        state.cityName=cityName;
     },
     SET_LOACTINGCITY:(state,cityName)=>{
        state.locatingCity=cityName;
     },
     SET_CATELIST:(state,list)=>{
       state.categoryList=list;
     },
     SET_GOODSLIST:(state,list,categoryId)=>{
       state.goodsList.unshift({'id':categoryId,'list':list});
     },
     SET_CONFIGLIST:(state,list) => {
        state.configList=list;
     },
    SET_QUANTITY:(state,quantity) =>{
      state.quantity=quantity;
    },
    SET_INVOIVE:(state,invoice) =>{
      state.invoice=invoice;
    }
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
    },
    setCityName({commit},cityName){
      commit('SET_CITYNAME',cityName);
    },
    setLocatingCity({commit},cityName){
      commit('SET_LOACTINGCITY',cityName);
    },
    setQuantity({commit},quantity){
      commit('SET_QUANTITY',quantity);
    },
    setInvoice({commit},invoice){
      commit('SET_INVOIVE',invoice);
    }
  }
}
export  default basicStorage;
