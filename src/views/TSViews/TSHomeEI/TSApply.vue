<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item><strong>教室使用状态查询</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div></div>
      <div>请填写教室名称以及借用时间，用于查询教室使用状态。
       </div>

      <el-form :inline="true" :model="formInline" class="form-inline">
        <!-- 借教室类型 -->
        <el-form-item label="借教室类型" prop="classroom_type_name" >
            <el-select v-model="ruleForm.classroom_type_name" placeholder="请选择教室类型">
            <el-option label="会议室" value="会议室"></el-option>
            <el-option label="普通教室" value="普通教室"></el-option>
            </el-select>
        </el-form-item>

      <!-- 使用时间条目 -->
        <el-form-item label="借教室日期" prop="timeymd" >
          <el-date-picker
            v-model="ruleForm.timeymd"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
             :picker-options="pickerOptions"
            >
          </el-date-picker>
        </el-form-item>
  
     <el-form-item label="借教室开始时间" prop="start_timehms" >
     <el-select v-model="ruleForm.value1" placeholder="请选择开始时间">
        <el-option
        v-for="item in ruleForm.options1"
        :key="item.value1"
        :label="item.label1"
        :value="item.value1">
        </el-option>
      </el-select>
      </el-form-item>

    <el-form-item label="结束时间" prop="end_timehms" >
     <el-select v-model="ruleForm.value2" placeholder="请选择结束时间">
        <el-option
        v-for="item in ruleForm.options2"
        :key="item.value2"
        :label="item.label2"
        :value="item.value2">
        </el-option>
      </el-select>
      </el-form-item>

        <!-- 教室的状态 -->
        <el-form-item label="教室状态" prop="status" >
            <el-select v-model="ruleForm.status" placeholder="请选择教室类型">
            <el-option label="有课" value="有课"></el-option>
            <el-option label="空闲" value="空闲"></el-option>
            <el-option label="已预约" value="已预约"></el-option>
            </el-select>
        </el-form-item>
        </el-form>

        <el-form :inline="true" :model="formInline" :rules="rules" class="form-inline">
        <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm"> -->
        <!-- 教室名称条目 -->
        <el-form-item style='margin-bottom:20px;' label="教室名称" prop="classroom_name" placeholder="请输入教室的名称(楼名称+教室编号）" >
          <el-input v-model="ruleForm.classroom_name"></el-input>
        </el-form-item>

        <!-- 教室教室容量最小值 -->
        <el-form-item style='margin-bottom:20px;' label="容量最小值" prop="classroom_capacity_gte" >
          <el-input v-model="ruleForm.classroom_capacity_gte"></el-input>
        </el-form-item>
        
        <el-form-item  style='margin-bottom:20px;' label="容量最大值" prop="classroom_capacity_lte" >
          <el-input v-model="ruleForm.classroom_capacity_lte"></el-input>
        </el-form-item>

        <el-form-item  style='margin-bottom:20px;' label="教室学生人数" prop="students_sum_lte" >
          <el-input v-model="ruleForm.students_sum_lte"></el-input>
        </el-form-item>

        <!-- 借教室原因 -->
        <el-form-item  style='margin-bottom:20px;' label="借教室原因" prop="desc" placeholder="必填项" >
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <!-- <el-menu-item index="1-4"><router-link to="/SmartClass/TSHome/TShistory" active-class="marthaactive"  style="text-decoration: none;color:black;">历史预约记录</router-link></el-menu-item> -->
          <!-- <router-link tag="a" target="_blank" :to="{name:'detail',query:{goodsId:'1111'}}">热门好货</router-link> -->

          <el-button type="primary" @click="submitClassroom('ruleForm')">查询</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </el-form>



    </div>
</template>

<script>
//import { log } from "console";

  export default {
    
    data() {
      return {
        pickerOptions:{
          disabledDate(time){
            return time.getTime()<Date.now();
          }
        },
        ruleForm: {
        timeymd: undefined,
        start_timehms:undefined,
        end_timehms:undefined,
        status:undefined,
        teacher_id:  this.$store.state.teacher_id,//借教室人的id
        classroom_name: undefined,
        classroom_type_name: undefined,
        desc: undefined,
        students_sum_lte: undefined,
        classroom_capacity_gte:undefined,
        classroom_capacity_lte:undefined,
        options1:[
        {
          value1: '08:00:00',
          label: '第一节课'
        },
        {
          value1: '09:55:00',
          label: '第二节课'
        },
        {
          value1: '13:30:00',
          label: '第三节课'
        },
        {
          value1: '15:20:00',
          label: '第四节课'
        },
        {
          value1: '17:10:00',
          label: '第五节课'
        },
        {
          value1: '19:30:00',
          label: '第六节课'
        },
       ],
       options2:[
        {
          value2: '09:35:00',
          label: '第一节课'
        },
        {
          value2: '11:30:00',
          label: '第二节课'
        },
        {
          value2: '15:05:00',
          label: '第三节课'
        },
        {
          value2: '16:55:00',
          label: '第四节课'
        },
        {
          value2: '18:45:00',
          label: '第五节课'
        },
        {
          value2: '21:05:00',
          label: '第六节课'
        },
       ]
       },
        tableData:[],
        OriginData:[],
        total:100,
        pageSize: 10,

        rules: {
          classroom_name: [
            { required: false, message: '请输入教室的名称(楼名称+教室编号）', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],

           desc: [
            { required: true, message: '请输入借教室原因', trigger: 'blur' },
            { min: 1, max: 10000, message: '长度在 1 到 10000 个字符', trigger: 'blur' }
          ],

        }
      };
    },
    methods: {
      
  getDateTime(){
    //LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
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

  starttime(){
    var now="";
    now= this.ruleForm.timeymd + " " + this.ruleForm.value1;
    //now= this.ruleForm.timeymd + " " + this.ruleForm.value1;
    console.log("starttime:"+now);
    return now;
  },
  
endtime(){
    var now="";
    now= this.ruleForm.timeymd + " " + this.ruleForm.value2;
     console.log("endtime:"+now);
    return now;
  },
  
  //首先输入条件获得 
      submitClassroom(){

      var start_time=this.starttime();
      var end_time=this.endtime();
      var time_now=this.getDateTime();
        console.log(
        this.ruleForm.classroom_type_name+
        this.starttime()+
        this.endtime()+
        this.ruleForm.status+
        this.ruleForm.classroom_name+
        this.ruleForm.classroom_capacity_gte+
        this.ruleForm.classroom_capacity_lte+
        this.ruleForm.students_sum_lte+
        this.ruleForm.desc+
        this.getDateTime()
      )
      this.$axios.post('/api/common/classroomtime/list_information',
      {   
        
        pagenum: 1,
        pagesize: 5,
        keywords: {
          status:this.ruleForm.status,
          classroom_name: this.ruleForm.classroom_name,
          classroom_capacity_gte:this.ruleForm.classroom_capacity_gte,
          classroom_capacity_lte:this.ruleForm.classroom_capacity_lte,
          classroom_type_name:this.ruleForm.classroom_type_name,
          start_time:start_time,
          end_time:end_time,
          students_sum_lte: this.ruleForm.students_sum_lte,
          time_now:time_now,
        }
      }).then(res=>{
        console.log(res.data.retlist);

        if(res.data.ret===0)//返回成功
          {
            this.$message({
            message: '查询成功',
            type: 'success'})
            this.$store.state.tableData=res.data.retlist
            this.$store.state.total=res.data.total
            this.$store.state.originData = res.data.retlist            
            this.$store.state.desc = this.ruleForm.desc
            this.$store.state.start_time=this.starttime()
            this.$store.state.end_time=this.endtime()
            
            console.log(
          "classroom_id: "+this.$store.state.originData.classroom_id+
          "          start_time:"+this.$store.state.start_time+
          "          end_time:"+this.$store.state.end_time
        );
            //跳转到显示结果的页面
            setTimeout(()=>{
            this.$router.push(
                {
                  name:"TSApplyshowPage",
                  path:'/SmartClass/TSHome/TSApply/TSApplyshow',
                });},1000)
               
        }
        else{
          this.$message({
            message: '暂无符合您需求的教室，请另选教师'
            })
        }
        },err=>{
            console.log(err);
        })
      },
    
    //申请该教室
    handleApply(row){
        console.log(row.id+"       ");
        console.log(row.id+this.getDateTime());
        var time_now = this.getDateTime();
        var start_time=this.starttime();
        var end_time=this.endtime();
        this.$router.push(
          {
            name:'TSclassapplyEditPage',
          }
          )
    },
      //   this.$axios.post("/api/common/form/teacher",
      // {
        
      //   action: "add_form",
      //   data: {
      //     classroom_id: row.classroom_id,
      //     teacher_id: this.$store.state.teacher_id,
      //     start_time:time__start_time,
      //     end_time:time__end_time,
      //     desc: this.ruleForm.desc,
      //     },
      //   time_now: time_now,//将时间转成”2022-5-10 15:01:00“格式
      //   }).then(res=>{
      //   if(res.data.ret===0)
      //     {
      //       this.$message({
      //       message: '预约成功',
      //       type: 'success'})
      //     }
      //   else if(res.data.ret===1)
      //       {
      //         this.$message.error(res.data.msg);
      //         console.log("ret.data.id :"+ret.data.id)
      //       }
      //       },err=>
      //       {
      //          console.log(err);
      //       })
      //   },

      resetForm(formName) {
        this.$refs[formName].resetFields();
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
    .breadCrumbZone{
      margin-top:30px;
      margin-left:20px;;
      margin-bottom: 20px;
    }

    .pagination{
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .form{
      text-align: left;
    }

    .form-inline{
      text-align: left;
      padding-left:20px;
    }
</style>
