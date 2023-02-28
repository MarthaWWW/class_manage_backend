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
      :filters="[{text: '150', value: 150}, 
      {text: '200', value: 200},
      ]"
      :filter-method="filterHandler"
      >
    </el-table-column> 

    <!-- 空闲起始时间列 -->
    <el-table-column
      prop="time__start_time"
      label="空闲起始时间">
      <template slot-scope="scope">
            <span v-if="scope.row.time__start_time!= null">
              {{ parseTime(scope.row.time__start_time ) }}
            </span>
          </template>
    </el-table-column>

    <!-- 空闲结束时间列 -->
    <el-table-column
      prop="time__end_time"
      label="空闲结束时间"
      width="180"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.time__end_time!= null">
              {{ parseTime(scope.row.time__end_time ) }}
            </span>
          </template>

      >
    </el-table-column>

     <el-table-column label="操作">
       <template slot-scope="scope"> 
        <el-button
          prop="apply"
          type="danger"
          size="mini"

          @click="handleApply(scope.row)">预约</el-button>
          <!-- @click="prohandleApply(scope.$index,scope.row)">准备预约</el-button> -->
        </template> 

       <!-- <el-checkbox-group v-model="checkList">
      <el-checkbox label="basketball">篮球</el-checkbox>
      <el-checkbox label="football">足球</el-checkbox>
      <el-checkbox label="volleyball">排球</el-checkbox> -->
      <!-- </el-checkbox-group> -->
    <!-- <el-checkbox label=id name="is_select" @click="prohandleApply(scope.index,scope.id)">准备预约</el-checkbox> 点击以后 is_select变成true， prop="id" -->
   </el-table-column> 
    
  </el-table>
<div class="pagination">
  <el-pagination align='center'
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[1,5,10,20]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
    </div>

    <!-- <el-checkbox-group v-model="courseSelected">
      <el-checkbox v-for="item in courseAll" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
   -->
  
  </div>
  </div>
</template>

<script>
//api获取空闲教室接口
//import request from '@application/json'
import { stringify } from "json5";
//import { getActivityList } from 'express'
// import { parseTime } from "@/utils/date.js";
 
  export default {
    data() {
      return {
      pageSize: 10,
      currentPage: 1,
      originData: [],
      tableData: [],
      total: 0,
      }
    },

    mounted(){
       var time_now=this.getDateTime();
      this.$axios.post('/api/common/classroomtime/list_information',
      {   
        pagenum: 1,
        pagesize: 1000,
        keywords: {
        status: "空闲",
        time_now:time_now

    }        
      }).then(res=>{
        this.total=res.data.total
        this.originData = res.data.retlist
       
      },err=>{
					console.log(err);
			})

      this.$axios.post('/api/common/classroomtime/list_information',
      {   
        pagenum: this.currentPage,
        pagesize: this.pageSize,
        keywords: {
        status: "空闲",
        time_now:time_now

    }        
      }).then(res=>{
        this.tableData=res.data.retlist
       
      },err=>{
					console.log(err);
			})

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
     // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      var time_now=this.getDateTime()
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
      this.$axios.post('/api/common/classroomtime/list_information',
      {   
        pagenum: this.currentPage,
        pagesize: this.pageSize,
        keywords: {
        status: "空闲",
        classroom_capacity_gte: 120,
        time_now:time_now
    }        
      }).then(res=>{
        this.tableData=res.data.retlist
      },err=>{
					console.log(err);
			})
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      var time_now=this.getDateTime()
      console.log(`当前页: ${val}`)
      this.currentPage = val
     this.$axios.post('/api/common/classroomtime/list_information',
      {   
        pagenum: this.currentPage,
        pagesize: this.pageSize,
        keywords: {
        status: "空闲",
        classroom_capacity_gte: 120,
        time_now:time_now
    }        
      }).then(res=>{
        this.tableData=res.data.retlist
      },err=>{
					console.log(err);
			})
    },
          

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
        

      handleApply(row){
        console.log(row.id+" "+this.getDateTime());
        
         this.$store.state.classroom_id=row.classroom_id,
         this.$store.state.start_time=this.parseTime(row.time__start_time), 
         this.$store.state.end_time=this.parseTime(row.time__end_time), 
        this.$router.push(
          {
            name:'TSclassapplystuEditPage',
          }
          )
      },

      resettypenameFilter() {
        this.$refs.filterTable.clearFilter('typename');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.id;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
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
