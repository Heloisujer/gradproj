<template>
  <div class="wrap-main">
    <div class="wrap-main-header">
        <div class="header-all">
          <div :style="{background:'url(/static/images/logo.png)',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}" class="logo-img"></div>
          <ul>
            <li>首页</li>
            <li>产品和服务</li>
            <li>技术支持</li>
            <li>关于我们</li>
            <li>APP下载</li>
          </ul>
        </div>
    </div>
    <router-view></router-view>
    <div class="wrap-main-footer" :style="{background:'url(/static/images/foot-bg.png)',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
      <div class="footer-all">
        <div class="left-area">
          <p class="title">海康交通大数据有限公司</p>
          <div class="content">
            <p>电话：028-67696976</p>
            <p>地址：成都市天府新区湖畔路西段99号B6栋4楼</p>
            <p>邮箱：hikcare@hikcreate.com</p>
          </div>
        </div>
        <div class="right-area">
          <p>地图</p>
          <div class="code">
            <div :style="{background:'url(/static/images/code.png)',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}" class="code-img"></div>
            <p>关于我们</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
