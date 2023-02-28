<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item><strong>空闲教室情况显示</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

  <div class="form">
    <router-view></router-view>
  </div>
  
  <div class="table" style="middle">
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">

    <!-- 空闲教室id列-->
    <el-table-column
      prop="classroom_id"
      label="id"
      width="50"
      :formatter="formatter"
      ></el-table-column>

    <!-- 教室类型 -->
      <el-table-column
      prop="classroom__type__name"
      label="教室类型"
      width="100"
      column-key="typename"
      :filters="[{text: '会议室', value: '会议室'}, 
      {text: '普通教室', value: '普通教室'},
      ]"
      :filter-method="filterHandler"
      ></el-table-column>


    <!-- 教室名称列:逸夫楼101-->
    <el-table-column
      prop="classroom__name"
      label="教室名称"
      width="100"
      >
    </el-table-column>

    <!-- 教室容量列-->
    <el-table-column
      prop="classroom__capacity"
      label="容量"
      width="70"
      >
    </el-table-column> 

     <!-- 学生人数列 -->
    <el-table-column
      prop="students_sum"
      label="学生人数"
      width="90"
      >
    </el-table-column>

    <!-- 空闲起始时间列 -->
    <el-table-column
      prop="time__start_time"
      label="空闲起始时间"
      width="160"
      >
    </el-table-column>

    <!-- 空闲结束时间列 -->
    <el-table-column
      prop="time__end_time"
      label="空闲结束时间"
      width="160"
      >
    </el-table-column>

    <!-- 上课老师列 -->
    <el-table-column
      prop="teach_class__name"
      label="上课老师"
      width="120"
      >
    </el-table-column>


     <!-- <el-table-column label="操作">
       <template slot-scope="scope"> 
        <el-button 
          prop="apply"
          type="danger"
          size="mini"
          @click="handleApply()">预约</el-button>  -->
          <!-- @click="prohandleApply(scope.$index,scope.row)">准备预约</el-button> -->
         <!-- </template>  
         </el-table-column>   -->
    
  </el-table>

  <el-button
          prop="apply"
          type="danger"
          size="mini"
          @click="handleApply()">预约</el-button> 

  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize">
    </el-pagination>
    </div>
  </div>
  </div>
</template>

<script>
import { stringify } from "json5";

  export default {
    data() {
      return {
        tableData:this.$store.state.tableData,
        originData:this.$store.state.originData,
        pageSize:10,
        desc:this.$store.state.desc,
        //classroom_id: this.originData.classroom_id,
        classroom_id:1,
        teacher_id: this.$store.state.teacher_id,
        start_time:this.$store.state.start_time,
        end_time:this.$store.state.end_time,
        total:0
      }
    },

    mounted(){
    //   this.$axios.post('/api/common/classroomtime/list_information',
    //   {   
    //     pagenum: 1,
    //     pagesize: 100,
    //     keywords: {
    //     status: "空闲",
    //     classroom_capacity_gte: 120,
    // }        
    //   }).then(res=>{
        this.tableData=this.$store.state.tableData
        this.total= this.$store.state.total
        this.originData = this.$store.state.originData

      // },err=>{
			// 		console.log(err);
			// })

    },


  methods: {
    //now时间 yyyy-mm-dd hh:mm:ss
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
    //申请该教室
    handleApply(){
        var time_now = this.getDateTime();
        console.log(
          "classroom_id: "+this.tableData[0].classroom_id+
          "teacher_id:"+this.teacher_id+
          "desc:"+this.desc+
          "start_time:"+this.start_time+
          "end_time:"+this.end_time
        );
        this.$axios.post("/api/common/form/teacher",
      {
        action: "add_form",
        data: {
          classroom_id:this.tableData[0].classroom_id,//选取tabledata的第一项的classroom_id
          teacher_id: this.teacher_id,
          desc:this.desc,
          start_time:this.start_time,
          end_time:this.end_time
          },
          time_now: time_now,//将时间转成”2022-5-10 15:01:00“格式
          }).then(res=>{
        if(res.data.ret===0)
             {
              this.$message({
            message: '预约成功',
            type: 'success'})
             }
             else if(res.data.ret===1)
      {
        this.$message.error(res.data.msg);
        console.log("ret.data.id :"+ret.data.id)
      }
	 		    },err=>
           {
	 			console.log(err);
         })
        },

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
      margin-bottom: 30px;
    }

    .pagination{
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .form{
      text-align: left;
    }
</style>
