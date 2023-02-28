<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>教室管理</el-breadcrumb-item>
        <el-breadcrumb-item>教室预约管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>教师预约</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="tags">
        <el-tag style="margin-left:10px;">待审批</el-tag>
        <el-tag type="success" style="margin-left:10px;">已通过</el-tag>
        <el-tag type="danger" style="margin-left:10px;">已驳回</el-tag>
      </div>
  <div class="tableTeacher">
  <el-table
    :data="tableDataTeacher"
    :row-class-name="tableRowClassName"
    style="width: 100%">

    <el-table-column
      prop="create_time"
      width="150"
      label="申请表创建时间">
    </el-table-column>

    <el-table-column
      prop="teacher__name"
      width="80"
      label="教师姓名">
    </el-table-column>
  <!-- classroomtime_id关联查询列 -->
    <el-table-column
      prop="classroom__name"
      width="80"
      label="教室名">
    </el-table-column>

    <el-table-column
      prop="start_time"
      width="150"
      label="申请起始时间">
    </el-table-column>

    <el-table-column
      prop="end_time"
      width="150"
      label="申请结束时间">
    </el-table-column>

    <el-table-column
      prop="desc"
      width="150"
      label="申请理由">
    </el-table-column>

    <el-table-column
      prop="status"
      label="申请状态"
      sortable
      width="80"
      column-key="status"
      :filters="[{text: '申请中', value: '申请中'},
      {text: '通过', value: '通过'},
      {text: '驳回', value: '驳回'}]"
      :filter-method="filterHandler">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleAllow(scope.$index, scope.row)">批准</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDisallow(scope.$index, scope.row)">驳回</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="pagination">
    <el-pagination align='center'
    @size-change="handleSizeChangeTeacher"
    @current-change="handleCurrentChangeTeacher"
    :current-page="currentPageTeacher"
    :page-sizes="[1,5,10,20]"
    :page-size="pageSizeTeacher"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
    </div>
  </div>
 <el-divider></el-divider>
 <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>教室管理</el-breadcrumb-item>
        <el-breadcrumb-item>教室预约管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>学生预约</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

  <div class="tags">
        <el-tag style="margin-left:10px;">待审批</el-tag>
        <el-tag type="success" style="margin-left:10px;">已通过</el-tag>
        <el-tag type="danger" style="margin-left:10px;">已驳回</el-tag>
      </div>
  <div class="tableStudent" style="margin-top:10px;">
  <el-table
    :data="tableDataStudent"
    :row-class-name="tableRowClassName"
    style="width: 100%">

     <el-table-column
      prop="create_time"
      width="150"
      label="申请表创建时间">
    </el-table-column>

    <el-table-column
      prop="student__name"
      width="80"
      label="教师姓名">
    </el-table-column>
  <!-- classroomtime_id关联查询列 -->
    <el-table-column
      prop="classroom__name"
      width="80"
      label="教室名">
    </el-table-column>

    <el-table-column
      prop="start_time"
      width="150"
      label="申请起始时间">
    </el-table-column>

    <el-table-column
      prop="end_time"
      width="150"
      label="申请结束时间">
    </el-table-column>

    <el-table-column
      prop="desc"
      width="150"
      label="申请理由">
    </el-table-column>

    <el-table-column
      prop="status"
      label="申请状态"
      sortable
      width="80"
      column-key="status"
      :filters="[{text: '申请中', value: '申请中'},
      {text: '通过', value: '通过'},
      {text: '驳回', value: '驳回'}]"
      :filter-method="filterHandler">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleAllow(scope.$index, scope.row)">批准</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDisallow(scope.$index, scope.row)">驳回</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination align='center'
    @size-change="handleSizeChangeStudent"
    @current-change="handleCurrentChangeStudent"
    :current-page="currentPageStudent"
    :page-sizes="[1,5,10,20]"
    :page-size="pageSizeStudent"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalStudent">
  </el-pagination>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageSizeTeacher: 10,
      currentPageTeacher: 0,
      originDataTeacher: [],
      tableDataTeacher: [],
      totalTeacher: 0,

      pageSizeStudent: 10,
      currentPageStudent: 0,
      originDataStudent: [],
      tableDataStudent: [],
      totalStudent: 0

    }
  },
  created () {
    // 获取教师表信息
    this.$axios.post('/api/common/form/manager',
      {
        action: 'list_form_teacher',
        pagenum: 1,
        pagesize: 1000
      }).then(res => {
      this.originDataTeacher = res.data.retlist
      this.totalTeacher = res.data.total
    }, err => {
      console.log(err)
    })

    this.$axios.post('/api/common/form/manager',
      {
        action: 'list_form_teacher',
        pagenum: 1,
        pagesize: this.pageSizeTeacher
      }).then(res => {
      this.tableDataTeacher = res.data.retlist
    }, err => {
      console.log(err)
    })

    // 获取学生表信息
    this.$axios.post('/api/common/form/manager',
      {
        action: 'list_form_student',
        pagenum: 1,
        pagesize: 1000
      }).then(res => {
      this.originDataStudent = res.data.retlist
      this.totalStudent = res.data.total
    }, err => {
      console.log(err)
    })

    this.$axios.post('/api/common/form/manager',
      {
        action: 'list_form_student',
        pagenum: 1,
        pagesize: this.pageSizeStudent
      }).then(res => {
      this.tableDataStudent = res.data.retlist
    }, err => {
      console.log(err)
    })
  },

  methods: {
    // 用不同的颜色表示当前申请状态
    tableRowClassName ({ row, rowIndex }) {
      if (row.status === '驳回') {
        return 'warning-row'
      } else if (row.status === '通过') {
        return 'success-row'
      } else {
        return 'waiting-row'
      }
    },

    // 每页条数改变时触发 选择一页显示多少行
    // 老师的分页相关方法
    handleSizeChangeTeacher (val) {
      console.log(`每页 ${val} 条`)
      this.currentPageTeacher = 1
      this.pageSizeTeacher = val
      this.$axios.post('/api/common/form/manager',
        {
          action: 'list_form_teacher',
          pagenum: this.currentPageTeacher,
          pagesize: this.pageSizeTeacher
        }).then(res => {
        this.tableDataTeacher = res.data.retlist
      }, err => {
        console.log(err)
      })
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChangeTeacher (val) {
      console.log(`当前页: ${val}`)
      this.currentPageTeacher = val
      this.$axios.post('/api/common/form/manager',
        {
          action: 'list_form_teacher',
          pagenum: this.currentPageTeacher,
          pagesize: this.pageSizeTeacher
        }).then(res => {
        this.tableDataTeacher = res.data.retlist
      }, err => {
        console.log(err)
      })
    },

    // 学生的分页相关方法
    handleSizeChangeStudent (val) {
      console.log(`每页 ${val} 条`)
      this.currentPageStudent = 1
      this.pageSizeStudent = val
      this.$axios.post('/api/common/form/manager',
        {
          action: 'list_form_student',
          pagenum: this.currentPageStudent,
          pagesize: this.pageSizeStudent
        }).then(res => {
        this.tableDataStudent = res.data.retlist
      }, err => {
        console.log(err)
      })
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChangeStudent (val) {
      console.log(`当前页: ${val}`)
      this.currentPageStudent = val
      this.$axios.post('/api/common/form/manager',
        {
          action: 'list_form_student',
          pagenum: this.currentPageStudent,
          pagesize: this.pageSizeStudent
        }).then(res => {
        this.tableDataStudent = res.data.retlist
      }, err => {
        console.log(err)
      })
    },
    resetAcademyFilter () {
      this.$refs.filterTable.clearFilter('academy')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      return row.id
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    },
    // 批准操作
    handleAllow (index, row) {
      row.status = '通过'
      this.$axios.post('/api/common/form/manager',
        {
          action: 'modify_form',
          id: row.id,
          status: '通过',
          optional_words: {
            classroom_id: row.classroom_id,
            start_time: row.start_time,
            end_time: row.end_time

          }
        }).then(res => {
        if (res.data.ret === 0) {
          this.$message({ message: '审批成功', type: 'success' })
        } else {
          this.$message.error('审批失败')
        }
			    }, err => {
        console.log(err)
			    })
    },

    // 驳回操作
    handleDisallow (index, row) {
      row.status = '驳回'
      this.$axios.post('/api/common/form/manager',
        {
          action: 'modify_form',
          id: row.id,
          status: '驳回'
        }).then(res => {
        if (res.data.ret === 0) { this.$message({ message: '审批成功', type: 'success' }) } else {
          this.$message.error('审批失败')
        }
			    }, err => {
        console.log(err)
			    })
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
      margin-bottom: 20px;
    }

    .pagination{
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .form{
      text-align: left;
    }

    .tags{
      text-align: right;
    }

</style>
