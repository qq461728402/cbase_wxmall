import router from './router'
import store from './store'
router.beforeEach((to, from, next) => {
  if(1==2){
    next('/personalCenter/loginWithCode')
  }
  else {
    next();
  }
})
router.afterEach(() => {

})
