import Vue from 'vue'
import Vuex from 'vuex'
// 引入
Vue.use(Vuex)
// 注册
export default new Vuex.Store({
  // 公共状态，所有组件都可以访问到的
  // store刷新后数据会重载 所以用localStorage保存在本地
  state: localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : {
    userList: [] // 数据列表
  },
  mutations: {
    saveUserList (state, data) {
      // data为index请求传过来的数据 赋给staet里中的userList的
      state.userList = data
    }
  }

})
// 导出
