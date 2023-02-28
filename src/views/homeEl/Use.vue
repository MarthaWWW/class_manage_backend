<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item><strong>我的售后服务预约</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="ability">
    <div class="partA">
  <div class='search'>
  <input type="text" placeholder="请输入待查询客户名" v-model="searchName">
  <input type="button" value="查询" class="searchButton" @click="handleSearch">
  <!-- <el-input v-model="searchName" placeholder="请输入待查询教室名" style="width:300px;"></el-input>
  <el-button @click="handleSearch" style="background-color:#F56C6C;margin-right:60px;color:white">查询</el-button> -->
  </div>
  </div>
  <div class="partB">
  <el-button @click="clearFilter">退出查询</el-button>
  </div>
  </div>
  <div class="form">
    <router-view @datareload="onDataReload"></router-view>
  </div>
  <div class="table">
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">

    <el-table-column
      prop="classroom__name"
      label="客户姓名"
      width="150">
    </el-table-column>

    <el-table-column
      prop="classroom__type__name"
      label="联系方式"
      width="180">
    </el-table-column>

    <el-table-column
      prop="classroom__capacity"
      label="家庭住址"
      width="180">
    </el-table-column>

    <el-table-column
      prop="students_sum"
      label="预约时间"
      width="180">
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
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchName: '',
      pageSize: 10,
      currentPage: 1,
      originData: [],
      tableData: [],
      total: 0
    }
  },
  created () {
    this.$axios.post('/api/common/classroomtime/list_information',
      {
        pagenum: 1,
        pagesize: 1000,
        keywords: {}
      }).then(res => {
      this.originData = res.data.retlist
      this.total = res.data.total
    }, err => {
      console.log(err)
    })
    this.$axios.post('/api/common/classroomtime/list_information',
      {
        pagenum: 1,
        pagesize: this.pageSize,
        keywords: {}
      }).then(res => {
      this.tableData = res.data.retlist
    }, err => {
      console.log(err)
    })
    var loop=20
    while(loop!==0)
    {
    this.$axios.post('/api/common/classroomtime/list_information',
        {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          keywords: {}
        }).then(res => {
        this.tableData.splice(0,this.total,res.data.retlist)
      }, err => {
        console.log(err)
      })
    
    setTimeout(()=>{console.log("refreshing")},10000*(20-loop)+5000)
    loop--;
    }
  },

  methods: {
    onDataReload () {
      this.$axios.post('/api/common/classroomtime/list_information',
        {
          pagenum: 1,
          pagesize: 1000,
          keywords: {}
        }).then(res => {
        this.originData = res.data.retlist
        this.total = res.data.total
      }, err => {
        console.log(err)
      })
      this.$axios.post('/api/common/classroomtime/list_information',
        {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          keywords: {}
        }).then(res => {
        this.tableData.splice(0,this.total,res.data.retlist)
      }, err => {
        console.log(err)
      })
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
      this.$axios.post('/api/common/classroomtime/list_information',
        {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          keywords: {}
        }).then(res => {
        this.tableData = res.data.retlist
      }, err => {
        console.log(err)
      })
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.$axios.post('/api/common/classroomtime/list_information',
        {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          keywords: {}
        }).then(res => {
        this.tableData = res.data.retlist
      }, err => {
        console.log(err)
      })
    },

    handleSearch () {
      this.tableData = this.originData.filter(item => item.classroom__name.includes(this.searchName))
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
      this.tableData = this.originData
    },
    formatter (row, column) {
      return row.id
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.$router.push(
        {
          name: 'useEdit',
          params: {
            academy: row.academy,
            username: row.username,
            id: row.id // 传参但是不能修改，到时候禁用
          }
        }
      )
      this.$store.state.isModify = true
    },

    handleAdd () {
      this.$router.push(
        {
          name: 'useEdit'
        }
      )
      this.$store.state.isModify = false
    }

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

    input{
      outline: none;
    }

    .search{
      width:440px;
      height:48px;
      border: 1px solid #dedede;
      margin:5px auto;
      background: #eceaeb;
      border-radius: 7px;
      box-shadow: 2px 5px 4px #bfbfbf,-2px 5px 4px #bfbfbf;
    }

    [type=text]{
      width: 320px;
      height:36px;
      margin:5px;
      border: 1px solid #cccccc;
      box-shadow: 1px 1px 1px #bfbfbf inset,-1px -1px 1px #bfbfbf inset;
      border-radius: 2px;
      font-size: 16px;
      text-indent: 5px;
    }

    .searchButton{
      width:90px;
      height:35px;
      background-image: url("../../../public/img/bgg.png");
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: center;
      background-size: cover;
      border-radius: 3px;
      position:relative;
      bottom:-2px;
      right:1px;
      border:1px solid #5ca3b4;
      box-shadow: 1px 1px 2px #5ca3b4 inset,-1px -1px 2px #5ca3b4 inset;
      font-size:18px;
      color: white;
      font-weight: bold;
      margin-right: 8px;
    }
    .ability{
      display: flex;
    }

    .partA{
      flex:1;
    }

    .partB{
      flex:1;
      line-height: 62px;
    }
</style>
