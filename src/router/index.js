import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Header from '@/components/header'
import Wrap from '@/components/wrap'
import HomePage from '@/components/homePage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',name: '',redirect:"/login",
    },
    {
      path: '/login',name: '登录',component: Login,
    },
    {
      path: '/header',name: '',component: Header,
    },
    // {
    //   path: '/',name: '',redirect:"/wrap",
    // },{
    //   path: '/wrap',name: '主页面',component: Wrap,
    //   redirect: '/wrap/homePage',
    //   children:[{
    //   	path: 'homePage',name: '首页',component: HomePage,
    //   }]
    // }
  ]
})
