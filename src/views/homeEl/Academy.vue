<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>管理员管理</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
  <div class="ability">
    <div class="partA">
  <div class='search'>
  <input type="text" placeholder="请输入待查询管理员用户名" v-model="searchUsername" style="background-color:white;">
  <input type="button" value="查询" class="searchButton" @click="handleSearch">
  <!-- <input v-model="searchUsername" placeholder="请输入待查询管理员用户名" >
  <input  type="button" value="查询" class="searchButton"> -->

  </div>
  </div>
  <div class="partB">
  <el-button @click="clearFilter" >退出查询</el-button>
  <router-link to="/home/academy/managerEdit" style="margin-left:20px;"><el-button round @click="handleAdd" style="color:black;">增加客户</el-button></router-link>

<router-link to="/home/academy" style="margin-left:20px;"><el-button round style="color:black;">退出编辑</el-button></router-link>
<div class="flex-div uploaditem">
	<el-tooltip class="item" effect="dark" :content="tag.name" placement="top-start" v-for="(tag,index) in fileList" :key="index">
		<el-tag style="margin-right:10px;display:flex;" :disable-transitions="false" @close="handleClose(index)" closable  @click="downloadFile(tag)"><i class="el-icon-paperclip"></i><span class="tagtext">{{tag.name}}</span></el-tag>
	</el-tooltip>
	<el-upload
	:multiple="false"
	:auto-upload="true"
	:http-request="uploadFile"
	accept=".xls,.xlsx">
	<el-button class="btn"><i class="el-icon-paperclip"></i>上传xls/xlsx文件批量导入</el-button>
</el-upload>
</div>
  </div>
  </div>
  <!-- 显示后来的编辑框 -->
  <div class="form">
    <el-collapse-transition>
    <router-view @datareload="onDataReload"></router-view>
  </el-collapse-transition>
  </div>
  <div class="table">
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">

     <el-table-column
      prop="username"
      label="姓名"
      >
    </el-table-column>

    <el-table-column
      prop="username"
      label="手机号"
      >
    </el-table-column>

    <el-table-column
      prop="username"
      label="家庭地址"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
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
      pageSize: 10,
      currentPage: 0,
      originData: [],
      tableData: [],
      total: 0,
      searchUsername: '',

      // 上传后的文件列表
      fileList: [],
      // 允许的文件类型
      fileType: ['xls', 'xlsx'],
      // 运行上传文件大小，单位 M
      fileSize: 50,
      // 附件数量限制
      fileLimit: 1,
      // 请求头
      headers: { 'Content-Type': 'multipart/form-data' }

    }
  },

  created () {
    this.$axios.post('/api/mgr/academy',
      {
        action: 'list_manager',
        pagenum: 1,
        pagesize: 1000
      }).then(res => {
      this.originData = res.data.retlist
      this.total = res.data.total
    }, err => {
      console.log(err)
    })
    this.$axios.post('/api/mgr/academy',
      {
        action: 'list_manager',
        pagenum: 1,
        pagesize: this.pageSize
      }).then(res => {
      this.tableData = res.data.retlist
    }, err => {
      console.log(err)
    })
  },

  methods: {
    /* methods */
    uploadFile(item) {
	    const fileObj = item.file;	
	    let msgForm = new FormData();	// 创建FormData
	    msgForm.append('file', fileObj);	// 向FormData中添加文件对象
      console.log(msgForm)
	    msgForm.get("file");	// 此方法可以查看FormData中插入的对象
	    this.$axios.post('/api/mgr/import/academy',msgForm,{headers: { 'Content-Type': 'multipart/form-data' }}).then( res => {
        if(res.data.ret===0){
          this.$message({
          message: res.data.msg,
          type: 'success'
      })
      this.onDataReload()
        }
        else{
          this.$message.error(res.data.msg)
        }
	    })
    },

    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
      this.$axios.post('/api/mgr/academy',
        {
          action: 'list_manager',
          pagenum: this.currentPage,
          pagesize: this.pageSize
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
      this.$axios.post('/api/mgr/academy',
        {
          action: 'list_manager',
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }).then(res => {
        this.tableData = res.data.retlist
      }, err => {
        console.log(err)
      })
    },

    onDataReload () {
      this.$axios.post('/api/mgr/academy',
        {
          action: 'list_manager',
          pagenum: 1,
          pagesize: 1000
        }).then(res => {
        this.originData = res.data.retlist
        this.total = res.data.total
      }, err => {
        console.log(err)
      })
      this.$axios.post('/api/mgr/academy',
        {
          action: 'list_manager',
          pagenum: 1,
          pagesize: this.pageSize
        }).then(res => {
        this.tableData = res.data.retlist
      }, err => {
        console.log(err)
      })
    },

    handleSearch () {
      this.tableData = this.originData.filter(item => item.username.includes(this.searchUsername))
    },
    resetAcademyFilter () {
      this.$refs.filterTable.clearFilter('academy')
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
          name: 'managerEdit',
          params: {
            academy: row.academy,
            username: row.username,
            password: row.password,
            id: row.id // 传参但是不能修改，到时候禁用
          }
        }
      )
      this.$store.state.isModify = true
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$axios.delete('/api/mgr/academy', {
      	data: {
      		action: 'delete_manager',
          id: row.id
      	}
      }).then(res => {
      	if (res.data.ret === 0) { this.$message({ message: '删除成功', type: 'success' }) } else { this.$message.error(res.data.msg) }
      })
      // 在页面中删除该项
      this.tableData.splice(index, 1)
      this.originData.splice(index, 1)
      this.total--
    },

    handleAdd () {
      this.$router.push(
        {
          name: 'managerEdit'
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

    .el-breadcrumb-item{
      font-size:18px;
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
      line-height: 60px;
    }

</style>
