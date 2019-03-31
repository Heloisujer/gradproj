<template>
  <div class="menu-list">
    <el-menu class="el-menu-vertical-demo">
        <template v-for="(item,index) in menuList">
            <template>
            <el-menu-item :index="item.menuI">
                <span class="sidemenu-text">{{ item.menuName }}111</span>
            </el-menu-item>
            </template>
        </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  props:['menuList'],
  data() {
    return {
    //   openNames: [],
    }
  },
}
</script>