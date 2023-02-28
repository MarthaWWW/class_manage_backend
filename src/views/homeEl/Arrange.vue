<template>
  <div class="table-generator">
    <div class="breadCrumbZone">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item >首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item><strong>自动排课</strong></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <!-- 需要一个班级下拉框筛选，这里的数据从后端的返回值拿到，还需要一个上传excel的图标 -->
  <div class=ability>
  <el-select placeholder="请选择待查询班级" style="margin-right:30px;" v-model="className">
    <el-option
      v-for="item in classOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-button
          size="mini"
          type="danger"
          @click="changeClassName()" style="margin-right:60px;width:80px;height:38px;font-size:16px;">查看</el-button>
  <el-upload
	:multiple="false"
	:auto-upload="true"
	:http-request="uploadFile"
	accept=".xls,.xlsx">
	<el-button class="btn" style="margin-right:60px;width:200px;height:38px;"><i class="el-icon-paperclip"></i>上传xls/xlsx文件批量导入</el-button>
</el-upload>
  </div>
  <div class="class-table">
    <div class="table-wrapper">
      <div class="tabel-container">
        <table v-loading="loading"
    element-loading-text="正在自动生成课表"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)">
          <thead>
          <tr>
            <th style="width:50px;font-size:20px;">时间</th>
            <!-- 展示所有的时间段 -->
            <th v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex" >{{lesson}}</th>
          </tr>
          </thead>
          <tbody>
            <!-- 展示所有的日期 -->
          <tr v-for="(weekNum, weekIndex) in classTableData.weeks" :key="weekIndex">
            <td>
              <p>{{weekNum}}</p>
            </td>
            <td class="courses" v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">
              <div  v-for="(course) in classTableData.courses[weekIndex][lessonIndex]"  :key="course" class="course" :class="{bgColor2:lessonIndex%2===1}" >
                <p style="font-size: 8px;">{{course}}</p>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
</template>
 
<script>
  export default {
    data() {
      return {
        loading:false,
        weekNumber:1,
        className:'',// 下拉选择框的双向绑定值，用于课表渲染
        rawData:[],// 存储ajax拿到的生数据
        classOptions:[
          {
            value:'计191',
            label:'计191'
          },
          {
            value:'计192',
            label:'计192'
          },
          {
            value:'理试1901',
            label:'理试1901'
          },
          {
            value:'物理191',
            label:'物理191'
          },
          {
            value:'物理192',
            label:'物理192'
          },
          {
            value:'计181',
            label:'计181'
          },
          {
            value:'计182',
            label:'计182'
          },
          {
            value:'理试1801',
            label:'理试1801'
          },

        ],// 存储班级数据，以填充选择下拉框，数据从生数据中获取,因为屡次报错在这里暂时写死
        classTableData: {
          // 标准的lessons和weeks, 不能改动
          lessons: [
            '第一大节',
            '第二大节',
            '第三大节',
            '第四大节',
            '第五大节',
            '第六大节',
          ],
          weeks: [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
          ],
          // 初始化一张空课表，用于页面显示
          courses: [
            // 7*6
            // 以数组格式存储，
            // lessonName   课程名
            // teacher 授课老师
            // room    教室名
            [[], [], [], [], [], []],
            [[], [], [], [], [], []],
            [[], [], [], [], [], []],
            [[], [], [], [], [], []],
            [[], [], [], [], [], []],]
        }
 
      };
    },
    methods: {
     changeClassName(){
       // 进行课表数据渲染
       // 创建一个临时数据储存本班课表
       var temp=[]
       var that=this
       // 需要先清空一波，不然会叠加
      that.classTableData.courses=[
            [[], [], [], [], [], []],
            [[], [], [], [], [], []],
            [[], [], [], [], [], []],
            [[], [], [], [], [], []],
            [[], [], [], [], [], []],]
       that.rawData.forEach(function(it)
        {
          if(it[0][0]===that.className)
          {
             it.forEach(function(it1)
             {
               temp.push(it1)
             })
          }
        })

        // 此时本班课表已经存储在temp中
        // 现在需要提取course信息
        temp.forEach(function(lesson)
        {
          // 通过这步获取课程在course的x,y坐标
          // 并存储所需的课程数据
          var x=0  // x代表星期数
          var y=0  // y代表节数
           
          switch (lesson[4]){
            case '星期一':
                x=0
                break;
            case '星期二':
                x=1
                break;
            case '星期三':
                x=2
                break;
            case '星期四':
                x=3
                break;
            case '星期五':
                x=4
                break;
            case '星期六':
                x=5
                break;
            case '星期天':
                x=6
                break;
            default : 
          }
          switch (lesson[5]){
            case '第一大节':
                y=0
                break;
            case '第二大节':
                y=1
                break;
            case '第三大节':
                y=2
                break;
            case '第四大节':
                y=3
                break;
            case '第五大节':
                y=4
                break;
            case '第六大节':
                y=5
                break;
            default : 
          }
    // 此时已获取了x,y坐标
    // 开始赋值
    that.classTableData.courses[x][y].push(lesson[2])
    that.classTableData.courses[x][y].push(lesson[1])
    that.classTableData.courses[x][y].push(lesson[3])

        }
        )
      console.log(that.classTableData.courses)
     },

     uploadFile(item) {
	    const fileObj = item.file;	
	    let msgForm = new FormData();	// 创建FormData
	    msgForm.append('file', fileObj);	// 向FormData中添加文件对象
      console.log(msgForm)
	    msgForm.get("file");	// 此方法可以查看FormData中插入的对象
      // 这时候要表示自己正在加载
      this.loading=true
	    this.$axios.post('/api/course',msgForm,{headers: { 'Content-Type': 'multipart/form-data' }}).then( res => {
        if(res.data.ret===0){
          this.$message({
          message: "成功生成课表",
          type: 'success'
      })
      // 提交成功，后台处理时间向前端返回生成的八个班的课表
      // 这是可以拿到生数据
      // 存储并调用数据处理函数
      this.rawData=res.data.ret_list
      console.log(this.rawData)
      this.loading=false
      
        }
        else{
          this.$message.error(res.data.msg)
        }
	    })
    },
    }
  };
</script>
 
<style scoped>
.ability{
  display: flex;
  text-align: left;
  margin-left:100px;
  margin-top:30px;
  margin-bottom:40px;
}
  *{
    margin: 0;
    padding: 0;
  }
    .table-wrapper {
      width: calc(100% - 40px);
      overflow: hidden;
      margin-bottom: 60px;
      margin-left:10px;
      margin-right:10px;
    }
      table {
        table-layout: fixed;
        width:100%;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left:2px;
      }
 
        thead {
          background-color: #547c99;
        }
          th {
            color: #fff;
            line-height: 30px;
            font-weight: normal;
            font-size:18px;
            
          }
        tbody {
          background-color: #f9f9f9;
        }
          td {
            color: #677998;
            line-height: 50px;
            box-shadow: 1px 1px 1px #bfbfbf,-2px 5px 4px #bfbfbf;
          }
        th, td {
          padding: 5px 2px;
          text-align: center;
          border-radius: 6px;
        }
        tbody tr:nth-child(2n){
          background-color: #ecf4f4;
        }
 
        tr td:first-child {
          color: #333;
        }
  .course{
    background-color: #ebbbbb;
    color: #fff;
    line-height: 25px;
    width: 100%;
  }
  .bgColor2{
    background-color: #89B2E5;
  }

  .weeknumber{
    text-align:center;
  }

  .breadCrumbZone{
      margin-top:40px;
      margin-left:60px;
      margin-bottom: 50px;
    }

  .class-table{
    background-color: white;
    border-radius: 10px;
    width:calc(100% - 200px);
    margin-left:100px;
    margin-right:100px;
    margin-top:20px;
    margin-bottom: 40px;
    box-shadow: 2px 5px 4px #bfbfbf,-2px 5px 4px #bfbfbf;
  }

</style>