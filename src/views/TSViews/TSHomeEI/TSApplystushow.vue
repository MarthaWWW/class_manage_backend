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

    <!-- 教室类型 -->
      <el-table-column
      prop="classroom__type__name"
      label="教室类型"
      width="150"
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
      width="150"
      >
    </el-table-column>

    <!-- 教室容量列-->
    <el-table-column
      prop="classroom__capacity"
      label="容量"
      width="100"
      >
    </el-table-column> 

    <!-- 空闲起始时间列 -->
    <el-table-column
      prop="time__start_time"
      label="空闲起始时间"
      width="200"
      >
      <span v-if="scope.row.time__start_time!= null">
              {{ parseTime(scope.row.time__start_time ) }}
      </span>
    </el-table-column>

    <!-- 空闲结束时间列 -->
    <el-table-column
      prop="time__end_time"
      label="空闲结束时间"
      width="200"
      >
      <span v-if="scope.row.time__end_time!= null">
              {{ parseTime(scope.row.time__end_time ) }}
      </span>
    </el-table-column>

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
        student_id: this.$store.state.student_id,
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
        parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      }
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
      return value.toString().padStart(2, '0')
    })
    return time_str
  },
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
          "student_id:"+this.student_id+
          "desc:"+this.desc+
          "start_time:"+this.start_time+
          "end_time:"+this.end_time
        );
        this.$axios.post("/api/common/form/student",
      {
        action: "add_form",
        data: {
          classroom_id:this.tableData[0].classroom_id,//选取tabledata的第一项的classroom_id
          student_id: this.student_id,
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
