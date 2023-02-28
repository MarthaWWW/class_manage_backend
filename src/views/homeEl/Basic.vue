<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>教室管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>教室基本信息管理</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
  <div class="ability">
    <div class="partA">
  <div class='search'>
  <input type="text" placeholder="请输入待查询教室名" v-model="searchName">
  <input type="button" value="查询" class="searchButton" @click="handleSearch">
  <!-- <el-input v-model="searchName" placeholder="请输入待查询教室名" style="width:200px;margin-right:10px;" ></el-input>
  <el-button @click="handleSearch" style="background-color:#F56C6C;color:white">查询</el-button> -->
  </div>
  </div>
  <div class="partB">
  <el-button @click="clearFilter" style="margin-left:10px">清除过滤器</el-button>
  <router-link to="/home/basic/type" style="margin-left:10px;"><el-button round @click="handleType"  style="color:black;">展示教室类型</el-button></router-link>
  <router-link to="/home/basic/basicEdit" style="margin-left:10px;"><el-button round @click="handleAdd" style="color:black;">增加数据</el-button></router-link>
  <router-link to="/home/basic" style="margin-left:10px;"><el-button round style="color:black;">退出编辑/收起教室类型</el-button></router-link>
<div class="flex-div uploaditem">
	<el-tooltip class="item" effect="dark" :content="tag.name" placement="top-start" v-for="(tag,index) in fileList" :key="index">
		<el-tag style="margin-right:10px;display:flex;" :disable-transitions="false" @close="handleClose(index)" closable  @click="downloadFile(tag)"><i class="el-icon-paperclip"></i><span class="tagtext">{{tag.name}}</span></el-tag>
	</el-tooltip>

</div>
  </div>
  </div>
  <div class="form">
  <el-collapse-transition>
    <router-view  @datareload="onDataReload"></router-view>
  </el-collapse-transition>
  </div>
  <div class="table">
  <el-table
    :data="tableData"
    style="width: 100%">
     <el-table-column
      prop="name"
      label="教室名"
      width="90"
      >
    </el-table-column>

    <el-table-column
      prop="type__name"
      label="教室类型"
      width="90"
      >
    </el-table-column>

    <el-table-column
      prop="capacity"
      label="教室容量"
      width="80"
      >
    </el-table-column>

    <el-table-column
      prop="type__facility"
      label="教室设施"
      width="130"
      >
    </el-table-column>

    <el-table-column
      prop="type__instructions"
      label="使用须知"
      width="280"
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
      searchName: '',
      currentPage: 0,
      tableData: [],
      originData: [],
      total: 0,
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
    this.$axios.post('/api/common/classroom',
      {
        action: 'list_classroom',
        pagenum: 1,
        pagesize: 1000
      }).then(res => {
      this.originData = res.data.retlist
      this.total = res.data.total
    }, err => {
      console.log(err)
    })
    this.$axios.post('/api/common/classroom',
      {
        action: 'list_classroom',
        pagenum: 1,
        pagesize: this.pageSize
      }).then(res => {
      this.tableData = res.data.retlist
    }, err => {
      console.log(err)
    })
  },

  methods: {
  
    onDataReload () {
      this.$axios.post('/api/common/classroom',
        {
          action: 'list_classroom',
          pagenum: 1,
          pagesize: 1000
        }).then(res => {
        this.originData = res.data.retlist
        this.total = res.data.total
      }, err => {
        console.log(err)
      })
      this.$axios.post('/api/common/classroom',
        {
          action: 'list_classroom',
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
      this.$axios.post('/api/common/classroom',
        {
          action: 'list_classroom',
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
      this.$axios.post('/api/common/classroom',
        {
          action: 'list_classroom',
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
          name: 'basicEdit',
          params: {
            name: row.name,
            capacity: row.capacity,
            type_name: row.type_name,
            id: row.id // 传参但是不能修改，到时候禁
          }
        }
      )

      this.$store.state.isModify = true
    },

    handleType (index, row) {
      console.log(index, row)
      this.$router.push(
        {
          name: 'type'
        }
      )
    },

    handleDelete (index, row) {
      console.log(index, row)
      this.$axios.delete('/api/common/classroom', {
      	data: {
      		action: 'delete_classroom',
          id: row.id
      	}
      }).then(res => {
      	if (res.data.ret === 0) { this.$message({ message: '删除成功', type: 'success' }) } else { this.$message.error(res.data.msg) }
      })
      this.tableData.splice(index, 1)
      this.originData.splice(index, 1)
      this.total--
    },

    handleAdd () {
      this.$router.push(
        {
          name: 'basicEdit'
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
      margin-left:20px;
      margin-bottom: 30px;
    }

    .pagination{
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .form{
      margin-top:15px;
      padding-top: 10px;
      margin-left:20px;
      margin-right:20px;
      text-align: left;
      background-color: white;
    }

    input{
      outline: none;
    }

    .search{
      width:340px;
      height:48px;
      border: 1px solid #dedede;
      margin:5px auto;
      background: #eceaeb;
      border-radius: 7px;
      box-shadow: 2px 5px 4px #bfbfbf,-2px 5px 4px #bfbfbf;
    }

    [type=text]{
      width: 240px;
      height:36px;
      margin:5px;
      border: 1px solid #cccccc;
      box-shadow: 1px 1px 1px #bfbfbf inset,-1px -1px 1px #bfbfbf inset;
      border-radius: 2px;
      font-size: 16px;
      text-indent: 5px;
    }

    .searchButton{
      width:70px;
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
      flex:2;
      line-height: 62px;
    }
</style>
