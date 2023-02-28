<template>
    <div class="editform">
        <el-form :model="Form" label-width="100px" class="demo-ruleForm">
    <!-- 教室类型条目 -->
  <el-form-item label="教室名" prop="name">
    <el-input v-model="Form.name"></el-input>
  </el-form-item>
    <!--教室设施条目 -->
  <el-form-item label="教室容量" prop="capacity">
    <el-input v-model="Form.capacity"></el-input>
  </el-form-item>
  <el-form-item label="教室类型" prop="type_id">
    <el-select v-model="Form.type_id" placeholder="请选择教室类型">
      <el-option v-for="type in typeData" :label="type.name" :value="type.id" :key="type"></el-option>
    </el-select>
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
        name: this.$route.params.name,
        capacity: this.$route.params.capacity,
        type_id: this.$route.params.type_id,
        id: this.$route.params.id
      },

      typeData: []
    }
  },

  mounted () {
    this.$axios.get('/api/common/classroomtype?action=list_classroomtype')
      .then(res => {
        this.typeData = res.data.retlist
      }, err => {
        console.log(err)
      })
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
        this.$axios.put('/api/common/classroom',
          {
            action: 'modify_classroom',
            id: this.Form.id,
            newdata:
            {
              name: this.Form.name,
              capacity: this.Form.capacity,
              type_id: this.Form.type_id
            }
          }).then(res => {
				    if (res.data.ret === 0) { this.$message({ message: '修改成功', type: 'success' }) } else {
            this.$message.error(res.data.msg)
          }
			    })
      } else { // 当这是一个新增表单时
        this.$axios.post('/api/common/classroom',
          {
            action: 'add_classroom',
            data:
            {
              name: this.Form.name,
              capacity: this.Form.capacity,
              type_id: this.Form.type_id
            }

			    }).then(res => {
				  if (res.data.ret === 0) { this.$message({ message: '添加成功', type: 'success' }) } else {
            this.$message.error(res.data.msg)
          }
			    }, err => {
          console.log(err)
			    })
      }
      setTimeout(() => { this.$router.push({ name: 'basicPage' }) }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
    .editform{
        padding: 10px 15px;
    }
</style>
