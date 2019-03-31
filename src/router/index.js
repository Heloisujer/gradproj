import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import ManagerIndex from '@/components/managerIndex'
import TeacherIndex from '@/components/teacherIndex'
import StudentIndex from '@/components/studentIndex'
import ManManage from '@/components/pages/manManage'
import TeaManage from '@/components/pages/teaManage'
import StuManage from '@/components/pages/stuManage'
import TopicManage from '@/components/pages/topicManage'
import SystemManage from '@/components/pages/systemManage'
import DepartManage from '@/components/pages/departManage'
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
      path: '/managerIndex',name: '',component: ManagerIndex,
      children:[
        {
          path:'/managerIndex/manManage',
          component:ManManage
        },
        {
          path:'/managerIndex/teaManage',
          component:TeaManage
        },
        {
          path:'/managerIndex/stuManage',
          component:StuManage
        },
        {
          path:'/managerIndex/departManage',
          component:DepartManage
        },
        {
          path:'/managerIndex/topicManage',
          component:TopicManage
        },
        {
          path:'/managerIndex/systemManage',
          component:SystemManage
        }
      ]
    },
    {
      path: '/teacherIndex',name: '',component: TeacherIndex,
    },
    {
      path: '/studentIndex',name: '',component: StudentIndex,
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
