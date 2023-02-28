<template>
    <div class="camera_outer">
      <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
      <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>

      <div v-if="imgSrc" class="img_bg_camera">
                <img :src="imgSrc" alt="" class="tx_img" @click="sendfile">
      </div>

      <div>
      <el-button size="mini" @click="getCompetence()">打开摄像头</el-button>
      <el-button size="mini" @click="stopNavigator()">关闭摄像头</el-button>
　    <el-button size="mini" @click="setImage()">拍照</el-button> 
      <el-button size="mini" type="danger" @click="sendfile">上传</el-button>

      </div>
          
          <el-upload class="avatar-uploader"
                     action=""
                     :on-change="(val)=>changeFile(val)"
                     :auto-upload="false"
                     accept=".jpeg,.png,.jpg,.bmp"
                     :show-file-list="false">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>


   </div>
</template>

  <script>
  export default {
    data () {
      return {
        videoWidth: 3000,
        videoHeight: 450,
        imgSrc: '',
        thisCancas: null,
        thisContext: null,
        thisVideo: null,
      }
    },
    methods: {
// 调用权限（打开摄像头功能）
      getCompetence () {
        
        var _this = this
        this.thisCancas = document.getElementById('canvasCamera')
        this.thisContext = this.thisCancas.getContext('2d')
        this.thisVideo = document.getElementById('videoCamera')
        // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {}
        }
        // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
        // 使用getUserMedia，因为它会覆盖现有的属性。
        // 这里，如果缺少getUserMedia属性，就添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        var constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' } }
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play()
          }
        }).catch(err => {
          console.log(err)
        })
        console.log("打开了")
      },

//  绘制图片（拍照功能） 将图片转base64的格式
      setImage () {
        
        var _this = this
        // 点击，canvas画图
        _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth-10, _this.videoHeight-10)
        _this.imgSrc = _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
        _this.imgSrc = this.thisCancas.toDataURL("image/png");
        //alert("拍照成功");
        console.log( _this.imgSrc);
        return this.imgSrc
      },

// base64转文件
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

// 文件上传给数据库
      sendfile(){
        var f = this.dataURLtoFile(this.setImage(),"img");
        let formdata = new FormData()
        formdata.append('img',f);
        // formdata.append('token',storage.get('loginToken'));
        // formdata.append('op',"uploadChannelPic");   
        // formdata.append('data',JSON.stringify({}));
      //这里是请求接口进行传递formdata 
        this.$axios.post("/api/attendance/count_sum",
        formdata, {headers: { 'Content-Type': 'multipart/form-data' }}
        ).then(res => {
          if(res.data.ret==0)
          alert(
            "现在教室里的人数是"+res.data.sum
          )
           alert("上传成功")
      //请求成功后赋值给要展示的图片
        this.fileImg = JSON.parse(res.data).picUrl})


      //   alert("准备上传")
      //   var file=this.dataURLtoFile(this.setImage(),"image/png");
      //   //this.$store.state.file=this.tdataURLtoFile(setImage(),"image/png");
      //   this.$axios.post('/api/attendance/count_sum',
      // {  
      //   file:this.file
      // }).then(res=>{
      //   if(res.data.total!=0){
      //      this.$message({
      //       message: '上传成功',
      //       type:'success'
      //       })
      // }
      //   else{
      //     this.$message({
      //       message: '上传失败'
      //       })
      //   }
      // },err=>{
			// 		console.log(err);
			// })
     
    },

    //  绘制图片（拍照功能）
    // setImage() {
    //   var _this = this;
    //   // canvas画图
    //   _this.thisContext.drawImage(
    //     _this.thisVideo,
    //     0,
    //     0,
    //     _this.videoWidth,
    //     _this.videoHeight
    //   );
    //   // 获取图片base64链接
    //   var image = this.thisCancas.toDataURL("image/png");
    //   _this.imgSrc = image; //赋值并预览图片
    //   console.log("  _this.imgSrc:"+ _this.imgSrc);
    //   this.$store.state.imgSrc=_this.imgSrc

    //   alert("拍照");
    // },

    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
      alert("关闭摄像头");
    },

    //////////////////////////////////////////将文件转化为formdata
    // changeFile (val) {
    //   let formData = new FormData();
    //   //file是键，val.raw是要传的文件，val.name是要传的文件名
    //   formData.append('file', val.raw, val.name);
    // },


    },




  }
   
  </script>
  <style lang="scss" scoped>
  .camera_outer{
    position: relative;
    overflow: hidden;
    background: url("../../../../public/img/camera.jpg") no-repeat center;
    background-size: 60%;
    video,canvas,.tx_img{
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    .btn_camera{
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 50px;
      background-color: rgba(0,0,0,0.3);
      line-height: 50px;
      text-align: center;
      color: #ffffff;
    }
    .bg_r_img{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .img_bg_camera{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      img{
        width: 100%;
        height: 90%;
      }
      
      .img_btn_camera{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: rgba(0,0,0,0.3);
        color: #ffffff;
        .loding_img{
          width: 50px;
          height: 50px;
        }
      }
    }
  }
  </style>