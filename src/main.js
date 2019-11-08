import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入axios
import axios from 'axios'
Vue.config.productionTip = false
//把axios挂载到vue原型上
Vue.prototype.$axios = axios
//设置基准路径
axios.defaults.baseURL = "http://127.0.0.1:3000"
//路由守卫
router.beforeEach((to,from,next)=>{
   //如果不是登录页，判断是否有token
   if(to.path !=='/login'){
      const token = JSON.parse(localStorage.getItem("userInfo")||'{}').token
      if(token){
        next()
      }else{
        next('/login')
      }
   }else{
     next()
   }
})
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
