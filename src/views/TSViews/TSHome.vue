<template>
    <el-container id="head">
    <!-- 切分为header -->
  <el-header style="text-align: right; font-size: 12px; height:70px;">
        <div class="projectname" >
          <i class="el-icon-s-check" style="margin-right: 20px;font-size:35px;color:white;"></i><span>教室智能管理系统</span><span class="english">class_manage</span></div>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px;font-size:20px;color:white;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>老师和学生的个人信息</el-dropdown-item>
          <el-dropdown-item><router-link to='/SmartClass/login' style="text-decoration:none">退出登录</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="username" style="font-size:18px; color:white">{{this.$store.state.username1}}</div>
    </el-header>

    <!-- 切分为aside+Main-->
  <el-container id="body" style="display:flex;">
    <el-aside width="230px" style="background-color: rgb(238, 241, 246);box-sizing:border-box">
    <el-menu :default-openeds="['1', '2','3']">

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user"></i><span class="first-class">预约教室</span></template>
        <el-menu-item-group>
          <el-menu-item index="1-1" v-show="value==='school'"><router-link to="/SmartClass/TSHome/TSClass" active-class="marthaactive" style="text-decoration: none;color:black;">学院管理员管理</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/SmartClass/TSHome/TSClass" active-class="marthaactive" style="text-decoration: none;color:black;">空闲教室情况显示</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="/SmartClass/TSHome/TSApply" active-class="marthaactive" style="text-decoration: none;color:black;">教室查询及申请预约</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link to="/SmartClass/TSHome/TShistory" active-class="marthaactive"  style="text-decoration: none;color:black;">历史预约记录</router-link></el-menu-item>
         </el-menu-item-group>
      </el-submenu> 

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-school"></i><span class="first-class">上课辅助</span></template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="/SmartClass/TSHome/TSAttendence" active-class="marthaactive" style="text-decoration: none;color:black;">出勤统计</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/SmartClass/TSHome/TSSignin" active-class="marthaactive" style="text-decoration: none;color:black;">自动签到</router-link></el-menu-item>
                  </el-menu-item-group>
      </el-submenu>

       <el-submenu index="3">
        <template slot="title"><i class="el-icon-class"></i><span class="first-class">辅助工具</span></template>
          <el-menu-item-group>
          <el-menu-item index="3-1"><router-link to="/SmartClass/TSHome/TSFlow" active-class="marthaactive" style="text-decoration: none;color:black;">教室流量</router-link></el-menu-item>
          <!-- <el-menu-item index="3-2"><router-link to="/SmartClass/TSHome/TSFlow" active-class="marthaactive" style="text-decoration: none;color:black;">教室流量</router-link></el-menu-item> -->
          <!--el-menu-item index="2-4"><router-link to="/SmartClass/TSHome/TSbooking" active-class="marthaactive" style="text-decoration: none;color:black;">教室预约管理</router-link></el-menu-item-->
        </el-menu-item-group>
      </el-submenu>

      
    </el-menu>
  </el-aside>

    <el-container>

      <el-main width="500px">
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
      username1: this.$store.state.username1,
      value:  this.$store.state.value,
    }
  },

  mounted () {
    console.log(this.username1,this.value,this.$store.state.teacher_id)
    var teacher_id=this.$store.state.teacher_id
    this.$store.state.teacher_id=teacher_id
    
  }
}
</script>

<style scoped>
  *{
    padding:0;
    margin:0;
  }
  @font-face {
            font-family: Martha;
            src: url(../../../public/font/Aa觉醒黑70J.ttf);
        }

  @font-face {
            font-family: Martha-1;
            src: url(../../../public/font/Eclipse.ttf);
        }

   @font-face {
            font-family: Martha-2;
            src: url(../../../public/font/三极露融体.ttf);
        }

     @font-face {
            font-family: Martha-3;
            src: url(../../../public/font/Aa西洋味道.ttf);
        }
  .el-header {
    background-color:  #20588c;
    color: #333;
    text-align: center;
    line-height: 70px;
    display: block;
  }

  .el-aside {
    background-color: #6acce8;
    color: #333;
    text-align: center;
    line-height: 200px;
    height:100%-73px;
    position: absolute;
    top:71.5px;
  }

  .el-main {
    background-color: #0d3b47;
    color: #333;
    height:611px;
    position:absolute;
    top:70px;
    left: 200px;
    text-align: right;
    margin-bottom: 15px;;
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
  }
  .projectname{
      color:rgb(220, 200, 200);
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
    width:999px;
    background-color: rgb(210, 228, 236);
    margin:24px 28px;
    border:1px solid transparent;
    border-radius: 40px;
  }

  .english{
    font-family: Martha-1;
    font-size: 30px;
    margin-left: 50px;
    line-height:80px;
  }

  .username{
    font-family: Martha-2;
  }

  .first-class{
    font-family: Martha;
    font-weight: lighter;
    font-size: 18px;
  }

</style>
