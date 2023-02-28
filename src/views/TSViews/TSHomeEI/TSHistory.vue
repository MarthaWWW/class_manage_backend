<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item><strong>历史预约记录</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
  <!--el-button @click="resetAcademyFilter" style="margin:20px;">清除学院过滤器</el-button>
   <el-button @click="clearFilter">清除所有过滤器</el-button> >
  <router-link to="/SmartClass/TSHome/TSteacher/TSteacherEdit" style="margin-left:20px;"><el-button round @click="handleAdd">增加教师</el-button></router-link>
  <router-link to="/SmartClass/TSHome/TSteacher" style="margin-left:20px;"><el-button round>退出编辑</el-button></router-link-->
  
  <div class="form">
    <router-view></router-view>
  </div>
  <div class="table">
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">

    <!-- 教室名称 -->
    <el-table-column
      prop="classroom__name"
      label="教室名称"
      width="100"
      >
    </el-table-column>

    <!-- 创建时间 -->
    <el-table-column
      prop="create_time"
      label="创建时间"
      width="180"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.create_time!= null">
              {{ parseTime(scope.row.create_time ) }}
            </span>
          </template>
    </el-table-column>

   <!-- 申请状态-->
    <el-table-column
      prop="status"
      label="申请状态"
      width="100"
      >
    </el-table-column>

    <!-- start_time-->
    <el-table-column
      prop="start_time"
      label="起始时间"
      width="180"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.start_time!= null">
              {{ parseTime(scope.row.start_time ) }}
            </span>
          </template>
    </el-table-column>

    <!-- end_time -->
    <el-table-column
      prop="end_time"
      label="结束时间"
      width="180"
      >
      <template slot-scope="scope">
            <span v-if="scope.row.end_time!= null">
              {{ parseTime(scope.row.end_time ) }}
            </span>
          </template>
    </el-table-column>

    <el-table-column
      prop="desc"
      label="借教室理由"
      width="180"
      >
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  </div>
  </div>
</template>

<script>
//api获取空闲教室接口
//import request from '@application/json'
//import { getActivityList } from 'express'

  export default {
    data() {
      return {
        tableData:[],
        teacher_id: this.$store.state.teacher_id,
        /*pageSize:10
        */
        //tableData: [
          //{
      //       classroomcapacity: 200,
      //       classroomname: '逸夫楼102',
      //       classroomtypename: '普通教室',
      //       id: 10,
      //       //status: '空闲',
      //       //students_sum: 0,
      //       //teach_class__name: None,
      //       time: '第一大节',
      //       status:'申请中',
      //       person:'罗翔'
      //       },
            
      //       {
      //       classroomcapacity: 200,
      //       classroomname: '逸夫楼102',
      //       classroomtypename: '普通教室',
      //       id: 11,
            
      //       //students_sum: 0,
      //       //teach_class__name: None,
      //       time: '第二大节',
      //       status:'申请',
      //       person:'张三'
      //       }
       //     ],
       originData:[],
        total:1
      }
    },

    mounted(){
      console.log(this.teacher_id)
      this.$axios.post('/api/common/form/teacher',
      {   
    action: 'list_form',
    pagenum: 1,
    pagesize: 10,
    teacher_id:this.teacher_id,
      }).then(res=>{
        this.tableData=res.data.retlist
        this.originData=res.data.retlist
        this.total=res.data.total
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
      fetchDate(){
        getActivityList().then(response => {
          this.tableData = response.data
        })
      },

      resetAcademyFilter() {
        this.$refs.filterTable.clearFilter('academy');
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
     
      handleDelete(index, row) {
        console.log(index, row);
        
        this.$axios.delete('/api/common/form/teacher',{
				data: {
					action: 'delete_form',
          id: row.id
				}
			}).then(res=>{
				if(res.data.ret===0)
         alert("删除成功")
        else
        {
         alert(res.data.msg)}
			})


      // 在页面中删除该项
      this.tableData.splice(index,1)
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
