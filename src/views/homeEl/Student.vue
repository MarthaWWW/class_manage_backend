<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>学生管理</strong></el-breadcrumb-item>
        <el-breadcrumb-item v-if="!isSchool"><strong>{{this.managerAcademy}}</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
  <div class="ability">
    <div class="partA">
  <div class='search'>
    <input type="text" placeholder="请输入待查询学生真实姓名" v-model="searchName">
  <input type="button" value="查询" class="searchButton" @click="handleSearch">
  <!-- <el-input v-model="searchName" placeholder="请输入待查询学生真实姓名" style="width:300px;"></el-input>
  <el-button @click="handleSearch" style="background-color:#F56C6C;margin-right:60px;color:white">查询</el-button> -->
  </div>
  </div>
  <div class="partB">
  <el-button @click="clearFilter">退出查询</el-button>
  <router-link to="/home/student/studentEdit" style="margin-left:20px;"><el-button round @click="handleAdd">增加学生</el-button></router-link>
  <router-link to="/home/student" style="margin-left:20px;"><el-button round>退出编辑</el-button></router-link>
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
    <!-- 学院列 -->
    <el-table-column
      prop="academy"
      label="所属学院"
      sortable
      width="200"
      column-key="academy"
      :filters="[{text: '土木与环境工程学院', value: '土木与环境工程学院'},
      {text: '冶金与生态工程学院', value: '冶金与生态工程学院'}, {text: '材料科学与工程学院', value: '材料科学与工程学院'},
      {text: '机械工程学院', value: '机械工程学院'}, {text: '自动化学院', value: '自动化学院'},
      {text: '计算机与通信工程学院', value: '计算机与通信工程学院'}, {text: '数理学院', value: '数理学院'},
      {text: '化学与生物工程学院', value: '化学与生物工程学院'},{text: '东凌经济管理学院', value: '东凌经济管理学院'},
      {text: '文法学院', value: '文法学院'},
      {text: '外国语学院', value: '外国语学院'}]"
      :filter-method="filterHandler"
      v-show="isSchool"
    >
    </el-table-column>
    <!-- 教学班列 -->
    <el-table-column
      prop="teach_class__name"
      label="教学班级"
      width="120">
    </el-table-column>

    <!-- 用户名列 -->
     <el-table-column
      prop="username"
      label="用户名"
      width="120"
      >
    </el-table-column>
    <!-- 真实姓名列 -->
    <el-table-column
      prop="name"
      label="真实姓名"
      width="120"
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
      managerAcademy: this.$store.state.academy,
      isSchool: this.$store.state.isSchool,
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
    this.$axios.post('/api/mgr/student',
      {
        action: 'list_student',
        academy:this.managerAcademy,
        pagenum: 1,
        pagesize: 1000

      }).then(res => {
      this.originData = res.data.retlist
      this.total = res.data.total
    }, err => {
      console.log(err)
    })

    this.$axios.post('/api/mgr/student',
      {
        action: 'list_student',
        academy:this.managerAcademy,
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
	    msgForm.append('excel', fileObj);	// 向FormData中添加文件对象
      console.log(msgForm)
	    msgForm.get("excel");	// 此方法可以查看FormData中插入的对象
	    this.$axios.post('/api/mgr/import/student',msgForm,{headers: { 'Content-Type': 'multipart/form-data' }}).then( res => {
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

    onDataReload () {
      this.$axios.post('/api/mgr/student',
        {
          action: 'list_student',
          academy:this.managerAcademy,
          pagenum: 1,
          pagesize: 1000

        }).then(res => {
        this.originData = res.data.retlist
        this.total = res.data.total
      }, err => {
        console.log(err)
      })

      this.$axios.post('/api/mgr/student',
        {
          action: 'list_student',
          academy:this.managerAcademy,
          pagenum: 1,
          pagesize: this.pageSize

        }).then(res => {
        this.tableData = res.data.retlist
      }, err => {
        console.log(err)
      })
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
      this.$axios.post('/api/mgr/student',
        {
          action: 'list_student',
          academy:this.managerAcademy,
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
      this.$axios.post('/api/mgr/student',
        {
          action: 'list_student',
          academy:this.managerAcademy,
          pagenum: this.currentPage,
          pagesize: this.pageSize

        }).then(res => {
        this.tableData = res.data.retlist
      }, err => {
        console.log(err)
      })
    },

    handleSearch () {
      this.tableData = this.originData.filter(item => item.name.includes(this.searchName))
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
          name: 'studentEdit',
          params: {
            academy: row.academy,
            username: row.username,
            name: row.name,
            password: row.password,
            id: row.id // 传参但是不能修改，到时候禁用
          }
        }
      )
      this.$store.state.isModify = true
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$axios.delete('/api/mgr/student', {
      	data: {
      		action: 'delete_student',
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
          name: 'studentEdit',
          params:{
            academy:this.$store.state.academy
          }
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
      line-height: 60px;
    }
</style>
