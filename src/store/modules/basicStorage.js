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
    quantity:'0',//存储购物车数量
    shearUrl:window.location.href,
    shearTitle:document.title,
    scrollPosion:0,
    indexhomeScroll:0,
    invoice:{
      invoiceType:'NO',
      invoiceTitle:'',
      taxNumber:'',
      invoiceinfos:'商品明细'
    },//发票信息存储
    router:'/',//支付路由
    title:'',
    baseInfo:{
      storePhone:'',
      storeDesc:'',
      storeName:'',
      storeId:'',
    },
  },
  mutations:{
    SET_BASEINFO:(state,baseinfo) =>{
      state.baseInfo=baseinfo;
    },
    SET_SHEARURL:(state,shearUrl) => {
      state.shearUrl=shearUrl;
    },
    SET_TITLE:(state,title) =>{
      state.title=title;
    },
    SET_SHEARTITLE:(state,shearTitle) => {
      state.shearTitle=shearTitle;
    },
    SET_ROUTER:(state,router) => {
      state.router=router;
    },

    SET_INDEXHOMESCROLL:(state,indexhomeScroll) =>{
      state.indexhomeScroll=indexhomeScroll;
    },
    SET_SCROLLPOSION:(state,scrollPosion) =>{
      state.scrollPosion=scrollPosion;
    },
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
    },
  },
  actions: {
    setbaseInfo:({commit},baseinfo) =>{
      commit('SET_BASEINFO',baseinfo)
    },
    setshearTitle({commit},shearTitle){
      commit('SET_SHEARTITLE',shearTitle)
    },
    setshearUrl({commit},shearUrl){
      commit('SET_SHEARURL',shearUrl)
    },
    setTitle({commit},title){
      commit('SET_TITLE',title)
    },
    setindexhomeScroll({commit},indexhomeScroll){
      commit('SET_INDEXHOMESCROLL',indexhomeScroll)
    },
    setscrollPosion({commit},scrollPosion){
      commit('SET_SCROLLPOSION',scrollPosion)
    },
    setrouter({commit},router){
      commit('SET_ROUTER',router);
    },
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
    },
  }
}
export  default basicStorage;
