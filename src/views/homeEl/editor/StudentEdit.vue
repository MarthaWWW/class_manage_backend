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
  <!-- 教学班条目 -->
  <el-form-item label="所属教学班" prop="teach_class__name">
    <el-select v-model="ruleForm.teachClass.id" placeholder="请选择所属教学班">
      <el-option v-for="teachClass in teachClassData" :label="teachClass.name" :value="teachClass.id" :key="teachClass"></el-option>
    </el-select>
  </el-form-item>
    <!-- 选择所属学院 -->
  <el-form-item label="所属学院" prop="academy" >
    <el-select v-model="ruleForm.academy" placeholder="请选择所属学院" :disabled="!ruleForm.isSchool">
      <el-option v-for="academy in academyData" :label="academy" :value="academy" :key="academy"></el-option>
    </el-select>
  </el-form-item>
<el-form-item label="上传照片">
<el-upload class="upload-demo"
                 ref="upload"
                 list-type="picture-card"
                 action='/api/mgr/student/other'
                 :limit="9"
                 :on-preview="handlePictureCardPreview"
                 :before-upload="beforeupload"
                 :on-exceed="exceedHandle"
                 :auto-upload="false"
                 :multiple='true'>
        <i class="el-icon-plus"></i>
      </el-upload>

</el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit()">提交修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList:[],
      academyData: [
        '土木与环境工程学院', '冶金与生态工程学院', '材料科学与工程学院', '机械工程学院', '自动化学院', '计算机与通信工程学院', '数理学院',
        '化学与生物工程学院', '东凌经济管理学院', '文法学院', '马克思主义学院'
      ],
      /*
      teachClassData: [
        { id: 1, name: '计192' },
        { id: 3, name: '计191' }
      ],
      */
      teachClassData: [],
      teach_class__id: 0,
      ruleForm: {
        isSchool: this.$store.state.isSchool,
        id: this.$route.params.id,
        username: this.$route.params.username,
        password: this.$route.params.password,
        academy: this.$route.params.academy,
        name: this.$route.params.name,
        teachClass: {
          id: 1,
          name: '计192'
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入学生真实姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入学生用户名', trigger: 'blur' },
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
  mounted () {
    this.$axios.get('/api/mgr/teachclass?action=list_teachclass')
      .then(res => {
        console.log(res.data)
        this.teachClassData = res.data.retlist
      }, err => {
        console.log(err)
      })
  },
  beforeDestroy () {
    console.log('I quit this page')
    this.$emit('datareload')
  },
  methods: {
    // 2，上传前事件
    beforeupload (file) {
      // 2.1，重新写一个表单上传的方法
      this.param = new FormData()
      this.fileList.push(file) // 把单个文件变成数组
      let images = [...this.fileList] // 把数组存储为一个参数，便于后期操作
      // 2.2，遍历数组
      images.forEach((img, index) => {
        this.param.append(`img_${index+1}`, img) // 把单个图片重命名，存储起来（给后台）
      })
      return false
    },
    // 3，点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 4，表单提交的事件
    onSubmit () {
      let _this = this
      this.$refs.upload.submit()
      // 4.1，下面append的东西就会到form表单数据的this.param中；
      this.param.append('action','add_student') 
      this.param.append('username',_this.ruleForm.username) 
      this.param.append('name',_this.ruleForm.name) 
      this.param.append('password',_this.ruleForm.password) 
      this.param.append('academy',_this.ruleForm.academy) 
      this.param.append('teach_class_id',_this.ruleForm.teachClass.id) 
      // 4.2，赋予提交请求头，格式为：'multipart/form-data'（必须！！）
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      // 4.3，然后通过下面的方式把内容通过axios来传到后台
      _this.$axios.post('/api/mgr/student/other', this.param, config).then( res => {
        if(res.data.ret===0){
          _this.$message({message: '添加成功',type: 'success'})  
        }
        else{
          _this.$message.error(res.data.msg)
        }
        })
        setTimeout(() => { _this.$router.push({ name: 'studentPage' }) }, 2000)
          
    },
    // 5设置超过9张图给与提示
    exceedHandle () {
      alert('您现在选择已超过9张图, 请重新选择')
    }

    // handleUpload(raw)
    // {
    //   this.fileList.push(raw.file);
    // },

    // async handlePush(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //     } else {
    //       console.log('修改失败!')
    //       return false
    //     }
    //   })
    //   var that=this
    //   if (that.$store.state.isModify === true)// 当这是一个修改表单时
    //   {
    //       that.$refs.upload.submit()
    //       console.log("this.fileList", that.fileList)
    //       let formData = new FormData();  //  将文件封装进FormData
    //       that.fileList.forEach(function(item,index)
    //       {
    //         console.log('img_'+(index+1).toString)
    //         formData.append(`img_${index+1}`,item,item.name)
    //       })
    //       formData.append('id',that.ruleForm.id) 
    //       formData.append('action','modify_student') 
    //       formData.append('username',that.ruleForm.username) 
    //       formData.append('name',that.ruleForm.name) 
    //       formData.append('password',that.ruleForm.password) 
    //       formData.append('academy',that.ruleForm.academy) 
    //       formData.append('teach_class_id',that.ruleForm.teachClass.id) 
    //       that.$axios.post('/api/mgr/student/other',formData,{headers: { 'Content-Type': 'multipart/form-data' }})
    //       .then(res => {
		// 		    if (res.data.ret === 0) { that.$message({ message: '修改成功', type: 'success' }) } else { that.$message.error(res.data.msg) }
		// 	    })
    //   } 
    //   else { // 当这是一个新增表单时
    //       that.$refs.upload.submit()
    //       console.log("this.fileList", that.fileList)
    //       let formData = new FormData();  //  将文件封装进FormData
    //       formData.append('action','add_student') 
    //       formData.append('username',that.ruleForm.username) 
    //       formData.append('name',that.ruleForm.name) 
    //       formData.append('password',that.ruleForm.password) 
    //       formData.append('academy',that.ruleForm.academy) 
    //       formData.append('teach_class_id',that.ruleForm.teachClass.id) 
    //       that.fileList.forEach(function(item,index)
    //       {
    //         formData.append(`img_${index+1}`, item,item.name)
    //       })
    //       // formData.append('img_1', this.fileList[0],this.fileList[0].name)
    //       // formData.append('img_2', this.fileList[1],this.fileList[1].name)
    //       that.$axios.post('/api/mgr/student/other',formData,{headers: { 'Content-Type': 'multipart/form-data' }})
    //       .then( res => {
    //         if(res.data.ret===0){
    //           that.$message({message: '添加成功',type: 'success'})  
    //         }
    //         else{
    //           that.$message.error(res.data.msg)
    //         }
    //       })
    //       }
    //       setTimeout(() => { that.$router.push({ name: 'studentPage' }) }, 2000)
    //       },
    
,
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
