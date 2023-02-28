<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>
<script>
export default {

  mounted () {
    window.addEventListener('unload', this.saveState)
  },

  methods: {
    saveState () {
      localStorage.setItem('state', JSON.stringify(this.$store.state))
    }
  }

}
</script>
<style lang="scss">
*{
    padding:0;
    margin:0;
  }

html,body{
  height:100%;/*添加这一句后，窗口实现高度自适应*/
}

.marthaactive{
    color:#006064;
  }

.el-submenu.is-active .el-submenu__title {
  border-bottom-color:transparent;
}

.el-table .warning-row {
  background: rgb(252, 228, 223);
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .waiting-row {
  background: #dde6f8;
}

.importer{
  text-align: center;
  margin-bottom: 30px;
}

</style>
