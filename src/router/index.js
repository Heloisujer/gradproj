import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import ManagerIndex from '@/components/managerIndex'
import TeacherIndex from '@/components/teacherIndex'
import StudentIndex from '@/components/studentIndex'
import ManManage from '@/components/pages/manManage'
import TeaManage from '@/components/pages/teaManage'
import StuManage from '@/components/pages/stuManage'
import TopicManage from '@/components/topicManage'
import SystemManage from '@/components/pages/systemManage'
import DepartManage from '@/components/pages/departManage'
import TeaDetails from '@/components/pages/teaDetails'
import StuDetails from '@/components/pages/stuDetails'
import ModifyPsw from '@/components/modifyPsw'
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
          path:'/managerIndex/systemManage',
          component:SystemManage
        },
        {
          path:'/managerIndex/topicManage',
          component:TopicManage
        }
      ]
    },
    {
      path: '/teacherIndex',name: '',component: TeacherIndex,
      children:[
        {
          path:'/teacherIndex/topicManage',
          component:TopicManage
        },
        {
          path:'/teacherIndex/teaDetails',
          component:TeaDetails
        },
        {
          path:'/teacherIndex/modifyPsw',
          component:ModifyPsw
        }
      ]
    },
    {
      path: '/studentIndex',name: '',component: StudentIndex,
      children:[
        {
          path:'/studentIndex/topicManage',
          component:TopicManage
        },
        {
          path:'/studentIndex/stuDetails',
          component:StuDetails
        },
        {
          path:'/studentIndex/modifyPsw',
          component:ModifyPsw
        }
      ]
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
