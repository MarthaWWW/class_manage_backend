<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <!-- 用户真实姓名条目 -->
  <el-form-item label="真实姓名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
    <!-- 用户名条目 -->
  <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
    <!-- 用户密码条目 -->
  <el-form-item label="用户密码" prop="password">
    <el-input v-model="ruleForm.password"></el-input>
  </el-form-item>
    <!-- 选择所属学院 -->
  <el-form-item label="所属学院" prop="academy" >
    <el-select v-model="ruleForm.academy" placeholder="请选择所属学院" :disabled="!ruleForm.isSchool">
      <el-option v-for="academy in academyData" :label="academy" :value="academy" :key="academy"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      academyData: [
        '土木与环境工程学院', '冶金与生态工程学院', '材料科学与工程学院', '机械工程学院', '自动化学院', '计算机与通信工程学院', '数理学院',
        '化学与生物工程学院', '东凌经济管理学院', '文法学院', '马克思主义学院'
      ],
      ruleForm: {
        id: this.$route.params.id,
        username: this.$route.params.username,
        password: this.$route.params.password,
        academy: this.$route.params.academy,
        name: this.$route.params.name,
        isSchool: this.$store.state.isSchool,
      },
      rules: {
        name: [
          { required: true, message: '请输入教师真实姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入教师用户名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],

        password: [
          { required: true, message: '请输入修改过后的密码', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],

        academy: [
          { required: true, message: '请选择所属学院', trigger: 'change' }
        ]
      }
    }
  },
  beforeDestroy () {
    console.log('I quit this page')
    this.$emit('datareload')
  },
  methods: {
    handleChangeCommodityType(){
        this.listQuery.orderType==='R'?this.isDisabled=false:this.isDisabled=true//初始状态
        },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          console.log('修改失败!')
          return false
        }
      })
      if (this.$store.state.isModify === true)// 当这是一个修改表单时
      {
        // put请求
        this.$axios.put('/api/mgr/teacher',
          {
            action: 'modify_teacher',
            id: this.ruleForm.id,
            newdata:
            {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              academy: this.ruleForm.academy,
              name: this.ruleForm.name
            }
          }).then(res => {
				    if (res.data.ret === 0) { this.$message({ message: '修改成功', type: 'success' }) } else { this.$message.error(res.data.msg) }
			    })
      } else { // 当这是一个新增表单时
        this.$axios.post('/api/mgr/teacher',
          {
				    action: 'add_teacher',
            data:
            {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              academy: this.ruleForm.academy,
              name: this.ruleForm.name
            }

			    }).then(res => {
				    if (res.data.ret === 0) { this.$message({ message: '添加成功', type: 'success' }) } else { this.$message.error(res.data.msg) }
			    }, err => {
          console.log(err)
			    })
      }
      setTimeout(() => { this.$router.push({ name: 'teacherPage' }) }, 2000)
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
