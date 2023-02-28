<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>教师管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>自动签到</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

    <el-form class="photo">
    <el-row>
 	   <el-col :span="12">
        <el-form-item label="请上传单个同学签到照片：" style="text-align: center;" prop="Identity_photo" required>
              <el-upload style="margin-top: 20%; left:50%;text-align: center;" action="#" list-type="picture-card" :on-preview="handlePictureCardPreview"
                  :class="{hasChs:form.Identity_photo!= ''}" accept="image/jpeg,image/png,image/jpg"
                  :on-remove="handleRemove" :on-change="handleChange" 
                  ref="refUpload" :file-list="filelist"
                  :auto-upload="true"
                  :http-request="uploadFile"
                  >
                  <div style="text-align: center;" slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且单个不超过10M</div>
                  
                  <i class="el-icon-plus"></i>
              </el-upload>
           
            <el-dialog title="图片预览" :visible.sync="dialogVisible" :append-to-body="true" width="50%"
              :modal="false">
                      <div style="padding: 15px;">
                          <el-image style="display: flex;" :src="dialogImageUrl">
                          </el-image>
                      </div>
            </el-dialog>
            <!-- <div>
                   <el-button size="mini" type="danger" @click="uploadFile(this.item)">上传</el-button>  
            </div> -->
      </el-form-item>
           </el-col>
             </el-row>
      </el-form>

    <div class="input" style="text-align: center;">
       <div style="text-align:inherit;font-size: small;" slot="tip font-size: small;" >请输入上课班级：</div>
        <el-input  v-model="name" placeholder="请输入上课班级:" style="width:250px;" ></el-input>
    </div>
    
    <div style="align-items: left;">出勤情况：
    {{present_list}}
      <!-- 内容 -->
    </div>

       <div style="">缺勤情况：
    {{absent_list}}
      <!-- 内容 -->
    </div>
    
  <div class="form">
    <router-view></router-view>
  </div>

</div>
</template>

<script>
  export default {
    data() {
      return{
        pageSize:10,
        total:4,
        name:'',
        url: '',
        file:null,
        fileList:[],
        filesData: [
            [],               
        ],
        present_list:[],
        absent_list:[],
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
        // chunk(array, size) {//将1维数组转成2维数组
        //     //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
        //     const length = array.length
        //     //判断不是数组，或者size没有设置，size小于1，就返回空数组
        //     if (!length || !size || size < 1) {
        //       return []
        //     }
        //     //核心部分
        //     let index = 0 //用来表示切割元素的范围start
        //     let resIndex = 0 //用来递增表示输出数组的下标
          
        //     //根据length和size算出输出数组的长度，并且创建它。
        //     let result = new Array(Math.ceil(length / size))
        //     //进行循环
        //     while (index < length) {
        //       //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        //       result[resIndex++] = array.slice(index, (index += size))
        //     }
        //     //输出新数组
        //     return result
        //   },

        dataURLtoFile (dataurl, filename) {
        console.log("dataurl:"+dataurl)
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
        msgForm.append('name', this.name);
        console.log(msgForm)
	    msgForm.get("img");	// 此方法可以查看FormData中插入的对象
        console.log("准备上传图片"+" this.name="+this.name)

      this.$axios.post("/api/face",
        msgForm, {headers: { 'Content-Type': 'multipart/form-data' }}
        ).then(res => {
          if(res.data.ret===0)
           { 
            
            this.$message({
            message: res.data.name+"已签到",
            type: 'success'})
            this.name=res.data.name
            this.present_list=res.data.present_list//将测试数据覆盖
            this.absent_list = res.data.absent_list
            console.log("name,present_list和absent_list：")
              console.log(name)
              console.log(this.present_list)
              console.log(this.absent_list)
           }else{
               this.$message.error(res.data.msg)
           }
      //请求成功后赋值给要展示的图片
               })},

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
            if (fileList.length > 50) {
                this.$message.error(`上传文件最大数量为50`);
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

   //上传文件
   importRow(file) {
       console.log("准备上传");
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
