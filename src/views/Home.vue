<template>
    <el-container id="head">
    <!-- 切分为header -->
  <el-header style="text-align: right; font-size: 12px; height:70px;">
        <div class="projectname" >
        <i class="el-icon-s-check" style="margin-right: 20px;font-size:35px;color:white;"></i><span>教室智能管理系统后台</span><span class="english">class_manage</span></div>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px;font-size:20px;color:white;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item><p style="text-decoration:none" @click="handleLogout">退出登录</p></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="username" style="font-size:18px; color:white">{{this.$store.state.username}}</div>

    </el-header>

    <!-- 切分为aside+Main-->
  <el-container id="body" style="display:flex;">
    <el-aside width="210px" style="background-color: rgb(238, 241, 246);box-sizing:border-box">
    <el-menu :default-openeds="['1', '2']">
      <el-submenu index="1">
        <template slot="title" class='title' ><i class="el-icon-user"></i><span class="first-class">用户管理</span></template>
        <el-menu-item-group>
          
          <el-menu-item index="1-1"><router-link to="/home/academy"  active-class="marthaactive" style="text-decoration: none;color:black;font-size:15px;line-height:40px;" >学院管理员管理</router-link></el-menu-item> 
          <el-menu-item index="1-2"><router-link to="/home/teacher" active-class="marthaactive" style="text-decoration: none;color:black;font-size:15px;height:40px;line-height:40px;">教师管理</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="/home/student" active-class="marthaactive" style="text-decoration: none;color:black;font-size:15px;height:40px;line-height:40px;">学生管理</router-link></el-menu-item>
         </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
      <!-- <el-submenu index="2"> -->
        <template slot="title" class='title'><i class="el-icon-school"></i><span class="first-class">教室管理</span></template>
        <el-menu-item-group>
          <el-menu-item index="2-2"><router-link to="/home/basic" active-class="marthaactive" style="text-decoration: none;color:black;font-size:15px;height:40px;line-height:40px;">教室基本信息管理</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/home/use" active-class="marthaactive" style="text-decoration: none;color:black;font-size:15px;height:40px;line-height:40px;">使用信息管理</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/home/arrange" active-class="marthaactive" style="text-decoration: none;color:black;font-size:15px;height:40px;line-height:40px;">自动排课</router-link></el-menu-item>
          <el-menu-item index="2-4"><router-link to="/home/booking" active-class="marthaactive" style="text-decoration: none;color:black;font-size:15px;height:40px;line-height:40px;">预约信息管理</router-link></el-menu-item>
          <el-menu-item index="2-5"><router-link to="/home/flowSim" active-class="marthaactive" style="text-decoration: none;color:black;font-size:15px;height:40px;line-height:40px;">教室实时流量</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>

    <el-container>

      <el-main>
        <div class="service">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</el-container>

</template>

<script>
export default {
  data () {
    return {
      isSchool: this.$store.state.isSchool
    }
  },

  mounted () {
    console.log(this.username, this.value)
  },

  methods:
  {
    
    handleLogout(){
      var authority =''
      if(this.isSchool === true)
      authority = 'school'
      else
      authority = 'academy'
      this.$axios.post('/api/mgr/signout',
          {
            action: authority
          }).then(res => {
          console.log(res.data)
          if (res.data.ret === 0) {
            setTimeout(() => {
              this.$router.push(
                {
                  name: 'Login'
                })
            }, 2000)
            this.$message({ message: '退出登录成功，即将跳转到登陆界面', type: 'success' })
          } else if (res.data.ret === 1) { this.$message.error(res.data.msg) }
        }, err => {
          console.log(err)
        })
  
    }
  }

}
</script>

<style>
  @font-face {
            font-family: Martha;
            src: url(../../public/font/Aa觉醒黑70J.ttf);
        }

  @font-face {
            font-family: Martha-1;
            src: url(../../public/font/Eclipse.ttf);
        }

   @font-face {
            font-family: Martha-2;
            src: url(../../public/font/三极露融体.ttf);
        }

     @font-face {
            font-family: Martha-3;
            src: url(../../public/font/Aa西洋味道.ttf);
        }
  .el-header {
    background-color: #057d9f;
    color: #333;
    text-align: center;
    line-height: 70px;
    display: block;
  }

  .el-aside {
    background-color: #61b7cf;
    color: #333;
    text-align: center;
    line-height: 200px;
    height:100%;
    position: absolute;
    top:71.5px;

  }

  .el-main {
    background-color: #61b7cf;
    color: #333;
    height:100%;
    width:calc(100% - 210px);
    position:absolute;
    top:70px;
    left: 210px;
    text-align: right;
    margin-bottom: 15px;
    
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-header{
      display: flex;
      width:100%;
      position: absolute;
      background-color: #077D9F;
  }
  .projectname{
      color:white;
      text-align: left;
      display: block;
      flex:1;
      margin-left: 104px;
      font-family:Martha;
      font-weight:lighter;
      font-size:35px;
      line-height:70px;
  }

  #head{
    display: block;
  }

  .service{
    box-sizing:border-box;
    width:1073px;
    background-color: whitesmoke;
    margin:23px 50px;
    border:1px solid transparent;
    border-radius: 40px;
    
  }

  .english{
    font-family: Martha-1;
    font-size: 32px;
    margin-left: 50px;
    line-height:80px;
  }

  .username{
    font-family: Martha-2;
  }

  .first-class{
    font-family: Martha;
    font-weight: lighter;
    font-size: 20px;
  }

  .el-submenu__title{
    border: 1px solid #dedede;
    background: #f6f4f5;
    width:210px;
    height:60px;
    border-radius: 12px;
    box-shadow: 4px 11px 7px #bfbfbf,-4px 11px 7px #bfbfbf;
  }

</style>
