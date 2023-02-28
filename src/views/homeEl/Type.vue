<template>
    <div>
      <!-- 按钮组 -->
      <div class="buttons">
  <router-link to="/home/basic/typeEdit" style="margin-left:20px;"><el-button round @click="handleAdd" style="color:black;">增加数据</el-button></router-link>
  <router-link to="/home/basic/type" style="margin-left:20px;"><el-button round style="color:black;">退出编辑</el-button></router-link>
    </div>
  <!-- 给类型编辑预留插槽 -->
  <div class="form">
    <el-collapse-transition>
    <router-view @datareload="onDataReload"></router-view>
  </el-collapse-transition>
  </div>
  <!-- 表格展示区 -->
  <div class="table">
      <el-table
    :data="tableData"
    style="width: 100%">
    <!-- 教室类型列 -->
    <el-table-column
      label="类型"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <!-- 教室设备列 -->
    <el-table-column
      label="设备"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.facility }}</span>
      </template>
    </el-table-column>
    <!-- 教室使用须知列 -->
    <el-table-column
      label="使用须知"
      width="370">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.instructions }}</span>
      </template>
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
    <!-- 分页功能区，是表格展示区的子分区 -->
  <div class="pagination">
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      total: 0
    }
  },
  created () {
    this.$axios.get('/api/common/classroomtype?action=list_classroomtype')
      .then(res => {
        this.tableData = res.data.retlist
      }, err => {
        console.log(err)
      })
  },

  methods: {
    onDataReload () {
      this.$axios.get('/api/common/classroomtype?action=list_classroomtype')
        .then(res => {
          this.tableData = res.data.retlist
        }, err => {
          console.log(err)
        })
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.$router.push(
        {
          name: 'typeEdit',
          params: {
            name: row.name,
            facility: row.facility,
            instructions: row.instructions,
            id: row.id // 传参但是不能修改，到时候禁用
          }
        }
      )
      this.$store.state.isModify = true
    },

    handleDelete (index, row) {
      console.log(index, row)
      this.$axios.delete('/api/common/classroomtype', {
      	data: {
      		action: 'delete_classroomtype',
          id: row.id
      	}
      }).then(res => {
      	if (res.data.ret === 0) { alert('删除成功') } else { alert(res.data.msg) }
      })

      // 在页面中删除该项
      this.tableData.splice(index, 1)
      this.total--
    },

    handleAdd () {
      this.$router.push(
        {
          name: 'typeEdit'
        }
      )
      this.$store.state.isModify = false
    }
  }
}
</script>

<style lang="scss" scoped>
    div{
        margin-left: 0px;
        margin-right:0px;
        margin-bottom: 20px;
        border-radius: 0px;

    }
    .breadCrumbZone{
      margin-top:30px;
      margin-left:20px;;
      margin-bottom: -20px;
    }

    .pagination{
      text-align: center;
      margin-top: 10px;
    }

    .form{
      margin-top:15px;
      text-align: left;
      margin-right:20px;
    }

    .buttons{
      text-align: right;
      margin-left:0px;
      margin-right:15px;
      margin-top:10px;
    }
</style>
