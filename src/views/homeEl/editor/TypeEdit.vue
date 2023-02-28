<template>
    <div>
        <el-form :model="Form" label-width="100px" class="demo-ruleForm">
    <!-- 教室类型条目 -->
  <el-form-item label="类型" prop="name">
    <el-input v-model="Form.name"></el-input>
  </el-form-item>
    <!--教室设施条目 -->
  <el-form-item label="教室设施" prop="facility">
    <el-input v-model="Form.facility"></el-input>
  </el-form-item>
  <el-form-item label="使用须知">
    <el-input type="textarea" v-model="Form.instructions"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交修改</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      Form: {
        id: this.$route.params.id,
        name: this.$route.params.name,
        facility: this.$route.params.facility,
        instructions: this.$route.params.instructions
      }
    }
  },

  beforeDestroy () {
    console.log('I quit this page')
    this.$emit('datareload')
  },

  methods: {
    submitForm () {
      if (this.$store.state.isModify === true)// 当这是一个修改表单时
      {
        // put请求
        this.$axios.put('/api/common/classroomtype',
          {
            action: 'modify_classroomtype',
            id: this.Form.id,
            newdata:
            {
              name: this.Form.name,
              facility: this.Form.facility,
              instructions: this.Form.instructions
            }
          }).then(res => {
				    if (res.data.ret === 0) { this.$message({ message: '修改成功', type: 'success' }) } else { this.$message.error(res.data.msg) }
			    })
      } else { // 当这是一个新增表单时
        this.$axios.post('/api/common/classroomtype',
          {
            action: 'add_classroomtype',
            data:
            {
              name: this.Form.name,
              facility: this.Form.facility,
              instructions: this.Form.instructions
            }

			    }).then(res => {
				    if (res.data.ret === 0) { this.$message({ message: '添加成功', type: 'success' }) } else { this.$message.error(res.data.msg) }
			    }, err => {
          console.log(err)
			    })
      }
      setTimeout(() => {
        this.$router.push(
          {
            name: 'typePage'
          })
      }, 2000)
    }

  }
}
</script>
