<template>
     <div>
       <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>空闲教室情况显示</el-breadcrumb-item>
        <el-breadcrumb-item><strong>借教室原因填写</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <div class="input">
        <el-input v-model="desc" placeholder="请输入借教室原因(必填项):" style="margin-top:25px;width:500px;margin-left:50px;margin-bottom:20px" ></el-input>
         <el-button
          prop="apply"
          type="danger"
          size="mini"
          @click="handleApply()">提交</el-button>
    </div>
    </div>
</template>

<script>

  export default {
    
    data() {
      return {
        desc:'',
        classroom_id:this.$store.state.classroom_id,
          start_time:this.$store.state.start_time,
          end_time:this.$store.state.end_time, 
          student_id: this.$store.state.student_id,
        }
    },
    methods: {
       getDateTime(){
          var date = new Date();
          var now = "";
          var month = date.getMonth()+1;
          var dates = date.getDate();
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();
          month = month < 10 ? ('0'+month) : month;
          dates = dates < 10 ? ('0'+dates) : dates;
          hours = hours < 10 ? ('0'+hours) : hours;
          minutes = minutes < 10 ? ('0'+minutes) : minutes;
          seconds = seconds < 10 ? ('0'+seconds) : seconds;
          now = date.getFullYear() + "-" + month + "-" + dates + " " + hours + ":" + minutes + ":" + seconds;
          return now;
        },

 handleApply(){
          this.$axios.post("/api/common/form/student",
        {
        action: "add_form",
        data: {
          //classroomtime_id:  this.$store.state.classroomtime_id,
          classroom_id:this.classroom_id,
          start_time:this.start_time,
          end_time:this.end_time, 
          student_id: this.student_id,
          desc: this.desc
          },
          time_now: this.getDateTime(),//将时间转成”2022-5-10 15:01:00“格式
          }).then(res=>{
        if(res.data.ret===0)
             {
              this.$message({
              message: '提交申请成功',
              type: 'success'})
             }
             else{
              this.$message.error(res.data.msg);
             }
	 		    },err=>
           {
	 			console.log(err);
         });
        }
  }
  }
</script>


<style lang="scss" scoped>
    div{
        margin-left: 10px;
        margin-right:25px;
        margin-bottom: 10px;
        border-radius: 10px;
        
    }
    // .breadCrumbZone{
    //   margin-top:200px;
    //   margin-left:20px;;
    //   margin-bottom: 20px;
    // }

    .breadCrumbZone{
      margin-top:30px;
      margin-left:20px;;
      margin-bottom: 10px;
    }
    
    .pagination{
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    
    .input{
      text-align: left;
    }

    .form{
      text-align: left;
    }

    .form-inline{
      text-align: left;
      padding-left:20px;
    }
</style>
