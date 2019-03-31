<template>
    <div class="header_main">
        <el-container>
            <el-header>
                <div class="header_logo">
                    <img src="/static/images/logo.jpg" alt="" class="icon_logo">
                </div>
                <div class="header_head">
                    <span class="login-title">攀枝花学院毕业设计管理系统</span>
                    <div class="header_username">
                        欢迎您：
                        <span style="color:red"><!-- {{userName}} -->bbb</span>
                        <el-dropdown  @command="handleCommand" style="color:#fff">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command="logOut">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="120px">
                    <!-- <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-tickets" style="padding-left: 9px;"></i>
                        <span class="span1">业务运营</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="1-1" class="child-li">
                            <router-link to="/index/roadlist">出行周边</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2" class="child-li">
                            <router-link to="/index/protolist">协议管理</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2" style="padding-left: 6px;">
                        <i class="el-icon-setting" style="margin-top: 4px;"></i>
                        <span slot="title" class="span2">
                            <router-link to="/index/systemlist">系统管理</router-link>
                        </span>
                    </el-menu-item>
                    </el-menu> -->
                </el-aside>
                <el-main>
                    <div class="main_table">
                        <router-view></router-view>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
  export default {
    methods: {
    //   handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
     handleCommand(command) {
        if(command == 'logOut'){
           this.$confirm('此操作将退出登录, 是否继续?', '退出提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {    
              localStorage.clear();       
              sessionStorage.clear();

              this.$router.push('/');
              
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '操作已取消！'
              });          
            });
        }
      }
    }
  }
</script>
