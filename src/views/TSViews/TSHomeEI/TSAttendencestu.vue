<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>教师管理</strong></el-breadcrumb-item>
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

    <!-- 教室容量列 width=70,没设置，180-->
    <el-table-column
      prop="status"
      label="状态"
      >
    </el-table-column> 

    <!-- 空闲起始时间列 -->
    <el-table-column
      prop="time__start_time"
      label="缺勤起始时间">
      <template slot-scope="scope">
            <span v-if="scope.row.time__start_time!= null">
              {{ parseTime(scope.row.time__start_time ) }}
            </span>
          </template>
    </el-table-column>

    <!-- 空闲结束时间列 -->
    <el-table-column
      prop="time__end_time"
      label="缺勤结束时间"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.time__end_time!= null">
              {{ parseTime(scope.row.time__end_time ) }}
            </span>
          </template>
    </el-table-column>
    
  </el-table>
  </div>

  <div class="table">
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
  export default {
    data() {
      return {
        pageSize:10,
        tableData: [],
        originData:[],
        id:this.$store.state.student_id,
        total:4
      }
    },

    mounted(){
      console.log( "输出id:"+this.id)
      this.$axios.post('/api/common/personal',
      {   
        id:this.id,
      }).then(res=>{
        
        this.tableData=res.data.result_list
        this.originData = res.data.result_list
        
        console.log("result_list"+result_list)
        console.log("tableData"+this.tableData)
      },err=>{
					console.log(err);
			})
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
  }
  }
</script>

<style lang="scss" scoped>
    div{
        margin-left: 12px;
        margin-right:25px;
        margin-bottom: 10px;
        border-radius: 30px;
        
    }
    .breadCrumbZone{
      margin-top:30px;
      margin-left:20px;;
      margin-bottom: -20px;
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
