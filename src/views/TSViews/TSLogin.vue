<template>
  <!-- Login -->
  <div id="login" >

     <div id="namebox">
        <div id="chinese"  style="color:whitesmoke;">教室智能管理系统</div>
        <div id="english"  style="text-decoration: none;color:whitesmoke;">class</div>
     </div>
    <div id="login-form">
      <h1>登陆</h1>
      <label for="name"><i class="el-icon-user-solid" style="color: #c1c1c1;font-size:19px;"></i></label>
      <input type="text" placeholder="用户名" id="name" autocapitalize="off" v-model.trim="name" aria-autocomplete="off">
      <p style="visibility: hidden;">用户名为必填选项</p>
      <label for="password"><i class="el-icon-right" style="color: #c1c1c1;font-size:19px;"></i></label>
      <input type="password" placeholder="密码" id="password" autocapitalize="off" v-model.trim="password">
      <p style="visibility: hidden">密码为必填选项</p>
      <el-select v-model="value" placeholder="请选择">
       
       <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
        
      </el-select>
    <div>

        <el-button type="primary" myname=name @click="handleLogin">登录</el-button>
        <el-button type="info" @click="handleReset">重置</el-button>
        <el-button  type="info">
          <router-link to="/login" active-class="marthaactive" style="text-decoration: none;color:aliceblue;">切换到管理员端</router-link></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Login',
  data: function () {
    return {
      name: '',
      password: '',
      value: '',
      options: [
        {
          value: 'teacher',
          label: '老 师'
        },
        {
          value: 'student',
          label: '学 生'
        },
        ]
    }
  },

  methods: {
    // 清空当前填写信息
    handleReset () {
      this.name = ''
      this.password = ''
    },
    // 验证信息是否正确
    handleLogin () {
      // 用户登录
      console.log(this.name, this.password, this.value)
      var value=this.value
      var username=this.name
      var userpassword=this.password
      // 与后端的接口，为了其他功能的测试先注释掉
      // // 在此处应该对于不同的value值(校级管理员/院级管理员)发送不同的ajax请求，页面跳转也应该传递不同的参数
      this.$axios.post('/api/common/signin',
      {
        
        identity: value,
        username: this.name,
        password: this.password
      }).then(res=>
      {
          console.log(res.data);
          if(res.data.ret===0)//返回成功
          {
            this.$message({
            message: '登录成功',
            type: 'success'})
            this.$store.state.username1=username
            this.$store.state.value=value
  
               if(this.value=="teacher"){
                  this.$store.state.teacher_id=res.data.id
                setTimeout(()=>{
                this.$router.push(
                {
                  name:"TShomePage"
                });},2000)
               }
               else if(this.value=="student"){
                  this.$store.state.student_id=res.data.id
                setTimeout(()=>{
                this.$router.push(
                {
                  name:"TShomestuPage"
                });},2000)
               }
          //   if(this.value=="teacher"){
          //     this.$router.push(
          //     {
          //       name:"TSClassPage",
          //       params:{
          //         username,
          //         value,
          //         teacher_id:res.data.id
          //       }
          //     })
          //   }
          // else if(this.value=="student")
          // {
          //   this.$router.push(
          //   {
          //     name:"TShomestuPage",
          //     params:{
          //       username,
          //       value,
          //       student_id:res.data.id
          //     }
          //   })
          // }
      }
      else if(res.data.ret===1)
      {
        this.$message.error(res.data.msg);
        console.log("ret.data.id :"+ret.data.id)
      }
      },err=>{
        console.log(err)
      })
    
      }
    },
  

  computed: {

  },

  watch: {
    // 动态监测,验证 input 中 值的输入
    name: function f () {
      const p = document.querySelectorAll('p')
      if (this.name.length < 1) {
        p[0].innerHTML = '用户名称应大于 1 '
      }
      if (this.name.length >= 1) {
        p[0].style.visibility = 'hidden'
      }
      if (this.name.length === 0) {
        p[0].style.visibility = 'visible'
      }
    },
    password: function f () {
      const p = document.querySelectorAll('p')
      if (this.password.length < 8) {
        p[1].style.visibility = 'visible'
        p[1].innerHTML = '用户密码应大于 8 '
      }
      if (this.password.length >= 8) {
        p[1].style.visibility = 'hidden'
      }
      if (this.password.length === 0) {
        p[1].innerHTML = '请重新输入密码'
        p[1].style.visibility = 'visible'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
            font-family: Martha;
            src: url(../../../public/font/Aa觉醒黑70J.ttf);
        }

  @font-face {
            font-family: Martha-1;
            src: url(../../../public/font/Eclipse.ttf);
        }

#login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  // 背景图片样式  
  background-image: url("../../../public/img/school7.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

#login-form {
  position: absolute;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 15px;
  // 表单 box-shadow 样式 好看
  box-shadow: 0 15px 25px rgba(0, 0, 0, .5);

  h1 {
    width: 60%;
    margin: 50px auto 0;
    color: #c1c1c1;
    text-align: center;
  }

  input {
    width: 60%;
    margin: 0 auto;
    // 注意 border outline 默认值
    outline: none;
    border: none;
    padding: 10px;
    border-bottom: 1px solid #fff;
    background: transparent;
    color: white;
  }

  label {
    width: 60%;
    margin: 0 auto;
    position: relative;
    top: 30px;
    left: -25px;
  }

  div {
    width: 60%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  button {
    // rgba
    background-color: rgba(9, 108, 144, 0.5);
    margin: 10px 25px 40px 25px;
  }

  p {
    width: 60%;
    margin: 8px auto;
    position: relative;
    left: -15px;
    color: #ff0000;
    font-size: 8px;
  }
}
// 浏览器兼容 , 针对谷歌浏览器 默认设置的 奇怪样式
input {
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out ,width 1s ease-out!important;
}
#namebox{
    position:absolute;
    top:75px;
    left:120px;
    height:500px;
    width:500px;
}

#chinese{
    font-family:Martha;
    font-weight:lighter;
    font-size:45px;
}

#english{
    font-family: Martha-1;
    font-size: 36px;
}
</style>
