<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>出勤统计</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

    <el-form class="photo">
    <el-row>
 	   <el-col :span="12">
        <el-form-item label="请上传课堂照片：" prop="Identity_photo" required>
              <el-upload style="margin-top: 20%; left:50%;text-align: center;" action="#" list-type="picture-card" :on-preview="handlePictureCardPreview"
                  :class="{hasChs:form.Identity_photo!= ''}" accept="image/jpeg,image/png,image/jpg"
                  :on-remove="handleRemove" :on-change="handleChange" 
                  ref="refUpload" :file-list="filelist"
                  :auto-upload="true"
                  :http-request="uploadFile"
                  >
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且单个不超过10M</div>
                  <i class="el-icon-plus"></i>
              </el-upload>
           
            <el-dialog title="图片预览" :visible.sync="dialogVisible" :append-to-body="true" width="50%"
              :modal="false">
                      <div style="padding: 15px;">
                          <el-image style="display: flex;" :src="dialogImageUrl">
                          </el-image>
                      </div>
            </el-dialog>

          
      </el-form-item>
           </el-col>
             </el-row>
             <!-- <div>
               <el-button size="mini" type="danger" @click="importRow">上传</el-button>
               </div> -->
      </el-form>

  <div class="form">
    <router-view></router-view>
  </div>

  <div class="table">
   <router-link to="/SmartClass/TSHome/TSApply/TSAttendenceCamera" style="margin-left:20px;"><el-button size="mini" type="primary" >打开照相机</el-button></router-link>

  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        pageSize:10,
        total:4,
        
        url: '',
        file:null,
        fileList:[],
        filesData: [
            [],               
        ],
        // xlsxFile:"",
        dialogVisible: false,
        dialogImageUrl: '',
        form:{
            Identity_photo: '', //身份证件照               
        },
        load:{
            Identity_photo: '', //身份证件照               
        }
	    }
    },
    mount(){
    },

    methods: {
      //上传图片
      //  sendfile(){
      //   var f = this.dataURLtoFile(this.dialogImageUrl,"img");
      //   let formdata = new FormData()
      //   formdata.append('img',f);
      //   // formdata.append('token',storage.get('loginToken'));
      //   // formdata.append('op',"uploadChannelPic");   
      //   // formdata.append('data',JSON.stringify({}));
      // //这里是请求接口进行传递formdata 
      //   this.$axios.post("/api/attendance/count_sum",
      //   formdata, {headers: { 'Content-Type': 'multipart/form-data' }}
      //   ).then(res => {
      //     if(res.data.ret==0)
      //     alert(
      //       "现在教室里的人数是"+res.data.sum
      //     )
      //      alert("上传成功")
      // //请求成功后赋值给要展示的图片
      //   this.fileImg = JSON.parse(res.data).picUrl})
      //   },

         dataURLtoFile (dataurl, filename) {
        var arr = dataurl.split(',')
        var mime = arr[0].match(/:(.*?);/)[1]
        var bstr = atob(arr[1])
        var n = bstr.length
        
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        console.log("[u8arr], filename, { type: mime }:   "+[u8arr]+filename+{ type: mime });
        return new File([u8arr], filename, { type: mime })
        
      },

      uploadFile(item) {
	    const fileObj = item.file;	
	    let msgForm = new FormData();	// 创建FormData
	    msgForm.append('img', fileObj);	// 向FormData中添加文件对象
      console.log(msgForm)
	    msgForm.get("img");	// 此方法可以查看FormData中插入的对象
      console.log("准备上传图片")
      this.$axios.post("/api/attendance/count_sum",
        msgForm, {headers: { 'Content-Type': 'multipart/form-data' }}
        ).then(res => {
          if(res.data.ret===0)
           { alert(
              "现在教室里的人数是"+res.data.sum)
           }else{
               this.$message.error(res.data.msg)
           }
      //请求成功后赋值给要展示的图片
        this.fileImg = JSON.parse(res.data).picUrl})
        },

      //图片预览
	 handlePictureCardPreview(file) {
         this.dialogImageUrl = file.url;
         this.dialogVisible = true;
    },
    //删除上传的图片
    handleRemove(file, fileList) {
         this.fileList=[]
         this.form.Identity_photo = ''
         if (file.status == 'ready') {
             const self = this
             let reader = new FileReader()
             reader.readAsDataURL(file.raw)
             reader.onload = function(event) {
                 let img_base64 = reader.result;
                 self.filesData[0].forEach(item => {
                     if (item == img_base64) {
                         //删除指定元素
                         self.filesData[0].splice(0, 1)
                     }
                 })
             }
         }
     },

     //图片改变时触发
      handleChange(file, fileList) {
          // 检查文件类型
            const isImage = file.raw.type.includes("image");
            if (!isImage) {
                this.$message.error("上传文件类型必须是图片!");
                return false
            }
            // 检查文件大小
            if (file.size > (10 * 1024 * 1024)) {
                this.$message.error(`上传文件大小不能超过10Mb`);
                this.$refs['refUpload'].handleRemove(file);
                return false;
            }
            // 检查文件数量
            if (fileList.length > 1) {
                this.$message.error(`上传文件最大数量为1`);
                this.$refs['refUpload'].handleRemove(file);
                return false;
            }
            this.load.Identity_photo=''
            this.fileList.splice(0, 1, file);
            this.form.Identity_photo = '1'
            // 读取文件
            var _self = this;
            var reader = new FileReader();
            reader.readAsDataURL(file.raw);
            reader.onload = function(event) {
                _self.filesData[0].push({
                    file: reader.result,
                    filename: file.name,
                });
            };
            return true;
        },

  //     //获取file的内容
  //     getFile(){
  //    //获取file内容
  //   let files = this.$refs.refUpload;
  //    this.xlsxFile = files;
  //  },

   //上传文件
   importRow(file) {
       console.log("准备上传");
            // var _self = this;
            // // 读取文件
            // var reader = new FileReader();

            // reader.onload = function(event) {
            //     _self.filesData[0].push({
            //         file: reader.result,
            //         filename: file.name,
            //     });
            // };
            //this.$refs['refUpload'];
           var file=this.form.Identity_photo;
           file.name="img";
            console.log(file.name);
             console.log("获取到文件");
    // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
    //创建一个FormData对象，然后通过append() 方法向对象中添加键值对
      let formData = new window.FormData(); 
      formData.append("file", this.file);
       formData.append("filename", this.file.name);
     // that.importUrl 上传的接口url
      that.$axios.post('/api/attendance/count_sum',
          {img:this.formData}
        ).then(function(response) {
          that.$message.success('上传成功');
        }) .catch(function(error) {
          that.$message.error(res.data.msg);
        });
   },
      // submitImg(formName) {
      //   //返回 _this.imgSrc 并alert人数
      //   this.$refs[formName].validate((valid) => {
      //       var res=35;
      //       alert('本节课一共'+res+'人');
          
      //   });
      //   if(this.isModify===true)// 当这是一个修改表单时
      //   {
      //       //put请求
      //     this.$axios.put('/api/mgr/teacher',
      //     {
      //       action: 'modify_teacher',
      //       id: this.id,
      //       newdata: 
      //       {
      //         username: this.username,
      //         password: this.password,
      //         academy: this.academy,
      //         name: this.name
      //       } 
      //     }).then(res=>
      //     {
			// 	    if(res.data.ret===0)
      //       alert("修改成功")
      //       else{
      //         alert(res.data.msg)
      //       }
			//     })
      //   }
      //   else{// 当这是一个新增表单时
      //     this.$axios.post('/api/mgr/teacher',
      //     {
			// 	    action: 'add_teacher', 
      //       data: 
      //       {
      //         username: this.username, 
      //         password: this.password,
      //         academy: this.academy,
      //         name: this.name
      //       }

			//     }).then(res=>
      //     {
			// 	    if(res.data.ret===0)
      //       alert("添加成功")
      //       else{
      //         alert(res.data.msg)
      //       }
			//     },err=>
      //     {
			// 	console.log(err);
			//     })
      //   }
      // },

      //上传文件 并显示返回值
    //         sendfile(){
    //     this.$axios.post('/api/attendance/count_sum',
    //   {  
    //     img:this.fileList
    //   }).then(res=>{
    //     if(res.data.ret!=0){
    //        this.$message({
    //         message: '上传成功',
    //         type:'success'
    //         })
    //   }
    //     else{
    //       this.$message({
    //         message: '上传失败'
    //         })
    //     }
    //   },err=>{
		// 			console.log(err);
		// 	})
    // },


      // submitImg(){
      // fetch("/api/attendance/count_sum",{
      //   methods:"post",
      //   headers:{
      //     "Content-Type":"application/json"
      //   },
      //   body:JSON.stringify({
      //     "filename": this.setImage()
      //   })
      // }).then(res=>res.json()).then(res=>alert("上传成功！"));
      // },


      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      margin-bottom: -20px;
    }

    .pagination{
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .form{
      text-align: left;
    }
</style>
