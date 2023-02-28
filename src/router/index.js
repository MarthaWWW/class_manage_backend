import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Academy from '@/views/homeEl/Academy.vue'
import Teacher from '@/views/homeEl/Teacher.vue'
import Student from '@/views/homeEl/Student.vue'
import Basic from '@/views/homeEl/Basic.vue'
import Use from '@/views/homeEl/Use.vue'
import Arrange from '@/views/homeEl/Arrange.vue'
import Booking from '@/views/homeEl/Booking.vue'
import FlowSim from '@/views/homeEl/FlowSim.vue'
import Type from '@/views/homeEl/Type.vue'
import ManagerEdit from '@/views/homeEl/editor/ManagerEdit.vue'
import TeacherEdit from '@/views/homeEl/editor/TeacherEdit.vue'
import StudentEdit from '@/views/homeEl/editor/StudentEdit.vue'
import TypeEdit from '@/views/homeEl/editor/TypeEdit.vue'
import BasicEdit from '@/views/homeEl/editor/BasicEdit.vue'

import TSLogin from '@/views/TSViews/TSLogin.vue'
import TSHome from '@/views/TSViews/TSHome.vue'
import TSHomestu from '@/views/TSViews/TSHomestu.vue'
import TSClass from '@/views/TSViews/TSHomeEI/TSClass.vue'
import TSclassapplyEdit from '@/views/TSViews/TSHomeEI/TSclassapplyEdit.vue'
import TSClassstu from '@/views/TSViews/TSHomeEI/TSClassstu.vue'
import TSclassapplystuEdit from '@/views/TSViews/TSHomeEI/TSclassapplystuEdit.vue'
import TSApply from '@/views/TSViews/TSHomeEI/TSApply.vue'
import TSApplyshow from '@/views/TSViews/TSHomeEI/TSApplyshow.vue'
import TSApplystu from '@/views/TSViews/TSHomeEI/TSApplystu.vue'
import TSApplystushow from '@/views/TSViews/TSHomeEI/TSApplystushow.vue'
import TSHistory from '@/views/TSViews/TSHomeEI/TSHistory.vue'
import TSHistorystu from '@/views/TSViews/TSHomeEI/TSHistorystu.vue'
import TSAttendence from '@/views/TSViews/TSHomeEI/TSAttendence.vue'
import TSAttendenceCamera from '@/views/TSViews/TSHomeEI/TSAttendenceCamera.vue'
import TSSignin  from '@/views/TSViews/TSHomeEI/TSSignin.vue'
import TSAttendencestu from '@/views/TSViews/TSHomeEI/TSAttendencestu.vue'
import TSFlow from '@/views/TSViews/TSHomeEI/TSFlow.vue'
import TSFlowstu from '@/views/TSViews/TSHomeEI/TSFlowstu.vue'
import TSMyclass from '@/views/TSViews/TSHomeEI/TSMyclass.vue'


Vue.use(VueRouter) // 注册路由插件
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 配置表,匹配是按照顺序进行的
const routes = [
  {
    name: 'homePage',
    path: '/home',
    component: Home,
    children: [
      {
        name: 'academyPage',
        path: '/home/academy',
        component: Academy,
        children: [
          {
            name: 'managerEdit',
            path: '/home/academy/managerEdit',
            component: ManagerEdit
          }

        ]
      },

      {
        name: 'teacherPage',
        path: '/home/teacher',
        component: Teacher,
        children: [
          {
            name: 'teacherEdit',
            path: '/home/teacher/teacherEdit',
            component: TeacherEdit
          }
        ]
      },

      {
        name: 'studentPage',
        path: '/home/student',
        component: Student,
        children: [
          {
            name: 'studentEdit',
            path: '/home/student/studentEdit',
            component: StudentEdit
          }
        ]
      },

      {
        name: 'basicPage',
        path: '/home/basic',
        component: Basic,
        children: [
          {
            name: 'typePage',
            path: '/home/basic/type',
            component: Type,
            children: [
              {
                name: 'typeEdit',
                path: '/home/basic/typeEdit',
                component: TypeEdit
              }
            ]
          },

          {
            name: 'basicEdit',
            path: '/home/basic/basicEdit',
            component: BasicEdit
          }
        ]
      },

      {
        name: 'usePage',
        path: '/home/use',
        component: Use
      },

      {
        name: 'arrangePage',
        path: '/home/arrange',
        component: Arrange
      },

      {
        name: 'bookingPage',
        path: '/home/booking',
        component: Booking
      },

      {
        name: 'flowSimPage',
        path: '/home/flowSim',
        component: FlowSim
      },

    ]
  },

  {
    name: 'TShomePage',
    path: '/SmartClass/TSHome',
    component: TSHome,
    children: [
      {
        name: 'TSClassPage',
        path: '/SmartClass/TSHome/TSClass',
        component: TSClass,
      },
              
      {
        name:'TSclassapplyEditPage',
        path:'/SmartClass/TSHome/TSClass/TSclassapplyEdit',
        component:TSclassapplyEdit,
      },

      {
        name:'TSApplyPage',
        path: '/SmartClass/TSHome/TSApply',
        component: TSApply,

      },

        {
          name:'TSApplyshowPage',
          path:'/SmartClass/TSHome/TSApply/TSApplyshow',
          component:TSApplyshow,
        },

      {
        path: '/SmartClass/TSHome/TSHistory',
        component: TSHistory
      },

      {
        path: '/SmartClass/TSHome/TSAttendence',
        component: TSAttendence,
      },
      {
        name: 'TSAttendenceCamera',
        path: '/SmartClass/TSHome/TSApply/TSAttendenceCamera',
        component: TSAttendenceCamera
      },
      
      {
        name: 'TSSignin',
        path: '/SmartClass/TSHome/TSSignin',
        component: TSSignin
      },

      {
        path: '/SmartClass/TSHome/TSFlow',
        component: TSFlow
      },

      {
        name: 'TSMyclass',
        path: '/SmartClass/TSHome/TSMyclass',
        component: TSMyclass
      },
    ]
  },
  {
    name: 'TShomestuPage',
    path: '/SmartClass/TSHomestu',
    component: TSHomestu,
    children: [
      {
        name: 'TSClassstuPage',
        path: '/SmartClass/TSHomestu/TSClassstu',
        component: TSClassstu,
      },

      {
        name:'TSclassapplystuEditPage',
        path:'/SmartClass/TSHome/TSclassapplystuEdit',
        component:TSclassapplystuEdit,
      },

      {
        path: '/SmartClass/TSHomestu/TSApplystu',
        component: TSApplystu,
      },

      {
          name:'TSApplystushowPage',
          path:'/SmartClass/TSHome/TSApplystu/TSApplystushow.vue',
          component:TSApplystushow,
      },

      {
        path: '/SmartClass/TSHomestu/TSHistorystu',
        component: TSHistorystu
      },

      {
        path: '/SmartClass/TSHomestu/TSFlowstu',
        component: TSFlowstu
      },
      
      {
        path: '/SmartClass/TSHomestu/TSAttendencestu',
        component: TSAttendencestu,
      },

      
    ]
  },

  {
    name:'Login',
    path: '/login',
    component: Login
  },

  {
    path:'/SmartClass/login',
    component:TSLogin
  },

  // 重定向

  {
    path: '/',
    redirect: '/SmartClass/login'
  },
  
]

const router = new VueRouter({
  routes
})

export default router
