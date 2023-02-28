<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item><strong>教室实时流量</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>


  <div  class="form">
    <router-view></router-view>
  </div>
  
  <div class="table" style="middle">
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">

    <!-- 教室名称列:逸夫楼101-->
    <el-table-column
      prop="classroom__name"
      label="教室名称"
      width="200"
      >
    </el-table-column>

    <el-table-column
      prop="students_sum"
      label="教室人数"
      width="200"
      >
    </el-table-column>

    <el-table-column
      prop="classroom__capacity"
      label="教室容量"
      width="200"
      >
    </el-table-column>

    <el-table-column label="教室实时流量"
     prop="percentage"
      width="160">
      <template slot-scope="scope">
        <!-- <el-progress 
          :stroke-width="20" 
          :percentage="100" :format="format"
        ></el-progress> -->
        <el-progress type="circle" :percentage="(scope.row.students_sum/scope.row.classroom__capacity*100)"></el-progress>
     </template>
    </el-table-column>
  </el-table>

  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize">
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

  export default {
    data() {
      return {
        
        originData:[],
        pageSize:10,
        tableData: [
          {
            classroom__capacity: 200,
            classroom__name: "逸夫楼101",
             students_sum: 79,
          },
          {
            classroom__capacity: 150,
            classroom__name: "逸夫楼102",
             students_sum: 30,
          },
          {
            classroom__capacity: 100,
            classroom__name: "逸夫楼103",
             students_sum: 50,
          },
          ],
 percentage:0,
      total:0,
      endtime:"",
      }
    },

    mounted(){
      var timenow=this.getDateTimenow();  
     //定时器每隔60s刷新页面，获取一次数据，显示新的数据
      this.refreshData = setInterval(() => {
        //需要刷新的数据
      timenow=this.getDateTimenow();
       this.tableData=[];
      this.$axios.post('/api/common/classroomtime/list_information',
      {   
        pagenum: 1,
        pagesize: 5,
        keywords: {
        status: "空闲",
        start_time:timenow,
        end_time:this.endtime

    }        
      }).then(res=>{
        this.tableData=res.data.retlist
        this.total=res.data.total
        this.originData = res.data.retlist
        console.log(this.tableData)
      },err=>{
					console.log(err);
			})

        console.log("tableData"+this.tableData)
        console.log("percentage"+percentage)

    }, 1000 * 10)

     if(this.tableData[0].students_sum!=30)
     {
      console.log("加载数据后总人数变化了："+this.tableData[0].students_sum)
     }
          },

    methods: {
  //     getendtime(){
  // var date = new Date();
	// var enttime = "";
	// var month = date.getMonth()+1;
	// var dates = date.getDate();
  // var hours = date.getHours();
	// var minutes = date.getMinutes();
	// var seconds = date.getSeconds();
  // date=date+1;
  // hours="00"
  // minutes="00"
  // seconds="00"
  // enttime = date.getFullYear() + "-" + month + "-" + dates + " " + hours + ":" + minutes + ":" + seconds;
  // return enttime
  //     },

  //最接近当前时间的开始时间
  getDateTimenow(){
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
	seconds = '00';
  var hours2 = date.getHours();
	var minutes2 = date.getMinutes();
	var seconds2 = date.getSeconds();
	hours2 = hours;
	minutes2 = minutes;
	seconds2 = '00';

	now = date.getFullYear() + "-" + month + "-" + dates + " " + hours + ":" + minutes + ":" + seconds;
	
  var flag = 0;
  //划分时分秒
  if( 0<=hours&&hours<=9)
  {
    if(hours==9)
      if(minutes<=35)
      flag=1;
      else 
      flag=2;
    flag=1;
  }
  else if(10<=hours&&hours<=11)
  { 
    if(hours==11)
      if(minutes<=30)
      flag=2;
      else
      flag=3;
    flag=2;
  }
  else if(12<=hours&&hours<=15)
  { 
    if(hours==15)
      if(minutes<=5)
      flag=3;
      else
      flag=4;
    flag=3;
  }
  else if(16==hours)
  { 
      if(minutes<=55)
      flag=3;
      else
      flag=4;
  }
  else if(17<=hours&&hours<=18)
  { 
    if(hours==18)
      if(minutes<=45)
      flag=5;
      else
      flag=6;
    flag=5;
  }
    else if(18<hours&&hours<=24)
  { 
    flag=6;
  }

  switch(flag){
    case 1:
      hours = "08";
	    minutes = "00";
      hours2 = "09";
	    minutes2 = "35";
    case 2:
      hours = "09";
	    minutes = "55";
      hours2 = "11";
	    minutes2 = "30";
    case 3:
      hours = "13";
	    minutes = "30";
      hours2 = "15";
	    minutes2 = "05";
    case 4:
      hours = "15";
	    minutes = "20";
      hours2 = "16";
	    minutes2 = "55";
    case 5:
      hours = "17";
	    minutes = "10";
      hours2 = "18";
	    minutes2 = "45";
    case 6:
      hours = "19";
	    minutes = "30";
      hours2 = "21";
	    minutes2 = "05";
  }
  now = date.getFullYear() + "-" + month + "-" + dates + " " + hours + ":" + minutes + ":" + seconds;
  this.endtime=date.getFullYear() + "-" + month + "-" + dates + " " + hours2 + ":" + minutes2 + ":" + seconds2;
  console.log("now:"+now);
  console.log("endtime:"+this.endtime);
  return now;
},


      //计算教室占比
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      },

      // flow(row){
      //   var p=this.tableData[row].students_sum/ this.tableData[row].classroom__capacity*100;
      //   if(p===100) return "满";
      //   else return p;
      // },
        
        //修改时间格式
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
  
  //销毁定时器
  beforeDestroy() {
	clearInterval(this.refreshData);
	this.refreshData = null
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
