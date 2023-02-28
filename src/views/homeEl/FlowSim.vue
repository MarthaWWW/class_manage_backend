<template>
    <div>
      <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>教室管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>流量统计摄像模拟</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="upload">
        <!-- 模拟逸夫楼101摄像头 -->
        <div class="y101">
      <el-upload accept="image/*" style="display: inline-block;"
        ref="upload"
        action='/api/mgr/student/other'
	    multiple 
	    :file-list="fileList"
        :http-request="handleUpload"
        :on-change="fileChange" 
        :on-remove="fileRemove" 
        :auto-upload="false" 
        :limit="20">
        <el-button type="primary" plain  style="margin-left:2px;margin-right:20px;margin-bottom:30px;">
            <i class="el-icon-upload el-icon--right"></i>逸夫楼101摄像头
        </el-button>
       </el-upload>
       <el-button type="primary" @click="handlePush()">上传照片模拟间隔照相</el-button>
       </div>
    </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      fileList:[],
    }
  },
  created(){
    this.$store.state.iter=0
  },
  methods:{
    handleUpload(raw)
    {
      this.fileList.push(raw.file);
    },
    
    async handlePush() {
        this.$refs.upload.submit()
        console.log("this.fileList", this.fileList)
        let formData = new FormData();  //  将文件封装进FormData
        this.$store.state.iter=this.fileList.length
        var that=this
        this.fileList.forEach(function(item,index)
        {
            
        setTimeout(()=>{
            console.log("I put a picture!")
            formData.append('img', item,item.name)
            formData.append('classroom_name',"逸夫楼101")
            formData.append('action',"count")  
            that.$axios.post('/api/attendance/flow_statistics',formData,{headers: { 'Content-Type': 'multipart/form-data' }})
            .then(res => {
			      if (res.data.ret === 0) 
            { 
              that.$message({ message:res.data.msg+" 当前人流量为"+res.data.sum , type: 'success' }) 
              that.$store.state.iter--
            } 
            else 
            { 
              that.$message.error(res.data.msg) 
              }
		        })}, 30000*index)
        })
        
      },
      
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

    .y101{
        text-align: center;
        margin-top: 50px;
    }

    .y102{
        text-align: center;
        margin-top: 30px;
    }

    .y103{
        text-align: center;
        margin-top: 30px;
    }

    .y104{
        text-align: center;
        margin-top: 30px;
    }

</style>
