<template>
  <div>
    <div class="Micro_top">
      <div class="searchs">
        <span>时间 :</span>
        <ul>
          <li
            v-for="item in periodList"
            :key="item.id"
            class="type"
            :class="item.id === activeIndex ? 'active' : ''"
            @click="studyingchangeTab(item.id, 1)"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>

      <div class="searchd">
        <span>状态 :</span>
        <ul style="flex-wrap: wrap">
          <li
            v-for="(item, index) in phaselist"
            :key="index"
            :class="item.id === i ? 'active' : ''"
            @click="phasetab(item.id, 1)"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
    </div>
    
    <div classs="content">
      <div></div>
      <div class="class-table">
        <div class="table-wrapper">
          <div class="tabel-container">
            <table align="center">
              <thead>
                <tr>
                  <th colspan="2" width="48" class="fw">课时</th>
                  <th class="fw" v-for="(item, index) in datelist" :key="index">
                    <p>{{ item.week }}</p>
                    <p class="fonts">{{ item.date }}</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="4" class="wd amtdstyle">
                    <div class="fw">上</div>
                    <div class="amstle">午</div>
                  </td>
                  <td class="wd fw">1</td>
                  <td>
                    <img src="@/assets/images/wk/添加.png" alt="" class="dis" />
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="wd fw">2</td>
                  <td></td>
                  <td></td>
                  <td>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="wd fw">3</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="wd fw">4</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td rowspan="4" class="wd pmtdstyle">
                    <div class="fw">上</div>
                    <div class="amstle">午</div>
                  </td>
                  <td class="wd fw">5</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="wd fw">6</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="wd fw">7</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="wd fw">8</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      defaultOpen: require("@/assets/images/wk/reduce.png"),
      defaultClose: require("@/assets/images/wk/expend.png"),
      total: 0,
      currentPage: 1,
      act: "0",
      activeIndex: "",
      i: "",
      gradeIndex: "",
      periodList: [
        {
          id: "",
          value: "全部",
        },
        {
          id: "1",
 
          value: "本周",
        },
        {
          id: "2",
 
          value: "上周",
        },
        {
          id: "3",
 
          value: "近一月",
        },
        {
          id: "4",
          value: "更早",
        },
      ],
 
      phaselist: [
        {
          id: "",
          value: "全部",
        },
        {
          id: "1",
 
          value: "待确认",
        },
        {
          id: "2",
 
          value: "即将开始",
        },
        {
          id: "3",
          value: "正在直播",
        },
        {
          id: "4",
          value: "已经结束",
        },
        {
          id: "5",
          value: "历史",
        },
        {
          id: "6",
          value: "地理",
        },
      ],
 
      stateList: [
        {
          id: "",
          value: "全部",
        },
        {
          id: "1",
          value: "正在直播",
        },
        {
          id: "2",
          value: "即将开始版",
        },
        {
          id: "3",
          value: "已经结束",
        },
      ],
 
      tableData: [],
      datelist: [
        {
          id: "1",
          date: "2022-03-21",
          week: "星期一",
        },
        {
          id: "2",
          date: "2022-03-22",
          week: "星期二",
        },
        {
          id: "3",
          date: "2022-03-23",
          week: "星期三",
        },
        {
          id: "4",
          date: "2022-03-24",
          week: "星期四",
        },
        {
          id: "5",
          date: "2022-03-25",
          week: "星期五",
        },
        {
          id: "6",
          date: "2022-03-26",
          week: "星期六",
        },
        {
          id: "7",
          date: "2022-03-27",
          week: "星期日",
        },
      ],
      courses: [
        ["", "", "", "", "", "", "", ""],
        ["生物", "物理", "化学", "政治", "历史", "英语", "", "语文"],
        ["语文", "数学", "英语", "历史", "", "化学", "物理", "生物"],
        ["生物", "", "化学", "政治", "历史", "英语", "数学", "语文"],
        ["语文", "数学", "英语", "历史", "政治", "", "物理", "生物"],
        ["生物", "物理", "化学", "", "历史", "英语", "数学", "语文"],
        ["语文", "数学", "英语", "", "", "", "", ""],
      ],
      text: {
        label: "方程式的方成解析第程式的方成三方",
        content:
          "方程式的方成解析第程式的方成三方方程式的方成解析第程式的方成三方",
      },
    };
  },
 
  created() {},
 
  methods: {
    studyingall(i) {
      this.activeIndex = i;
    },
    studyingchangeTab(i) {
      this.activeIndex = i;
    },
    phaseall(i) {
      this.i = i;
    },
    phasetab(i) {
      this.i = i;
    },
  },
};
</script>
 
 <style lang="less" scoped>
.Micro_top {
  background-color: #fff;
  width: 1200px;
  margin: 0 auto;
  border-radius: 4px;
 
  padding-top: 24px;
  height: 120px;
  margin-bottom: 25px;
  .searchs,
  .searchd,
  .title {
    padding: 0 24px;
  }
  .searchs,
  .searchd,
  .versionbox {
    display: flex;
    font-size: 14px;
    color: #333333;
    margin-bottom: 24px;
    height: 24px;
 
    span {
      display: inline-block;
      font-weight: 600;
 
      font-size: 16px;
      color: #282d30;
      line-height: 24px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
 
      // padding-top: 14px;
      padding-left: 26px;
      li {
        cursor: pointer;
        padding: 0 12px;
        font-size: 16px;
        color: #36363a;
        line-height: 24px;
        margin-right: 36px;
        min-width: 56px;
        height: 24px;
        line-height: 24px;
      }
      .active {
        background-color: #00c15d;
        border-radius: 5px;
        color: rgba(255, 255, 255, 1);
      }
    }
    em {
      line-height: 54px;
      font-style: normal;
      color: #00c15d;
      cursor: pointer;
      img {
        margin-left: 8px;
      }
    }
  }
}
 
+ .content {
  width: 1200px;
  margin: 0 auto;
 
  background-color: #fff;
}
</style>
 
<style lang="less" scoped>
.class-table {
  padding: 24px;
  background: #fff;
  .table-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
.wd {
  width: 48px !important;
}
table {
  border: 1px solid #f3f3f3;
  border-collapse: collapse;
  text-align: center;
}
tr,
th,
td {
  width: 150px;
  height: 104px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #f3f3f3;
}
td:hover {
  background: #e7f7f4;
  .dis {
    display: block;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
  }
}
.wd:hover {
  background-color: #fff;
}
.amtdstyle:hover {
  background-color: #e7f7f4;
}
.pmtdstyle:hover {
  background-color: #fce6bc;
}
.fw {
  font-size: 16px;
  font-weight: 600;
}
.dis {
  display: none;
}
.fonts {
  font-weight: 400;
  font-size: 14px;
  color: #9899a1;
}
.amstle {
  padding-top: 200px;
  font-size: 16px;
  font-weight: 600;
}
.amtdstyle {
  background: #e7f7f4;
  color: #2e8759;
  border-right: 0;
}
.pmtdstyle {
  background: #fce6bc;
  color: #ff7844;
  border-right: 0;
}
/deep/ .el-button {
  width: 128px;
  height: 38px;
  background: #00c15d;
  border-radius: 8px;
}
</style>