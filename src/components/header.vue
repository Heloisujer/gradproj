<template>
    <div class="header_main">
        <el-container>
            <el-header>
                <div class="header_logo">
                    <!-- <img src="/static/images/logo.jpg" alt="" class="icon_logo"> -->
                </div>
                <div class="header_head">
                    <!-- <span class="login-title">攀枝花学院毕业设计管理系统</span> -->
                    <div class="header_username">
                        欢迎您：
                        <span style="color:red">{{Name}}</span>
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
                    <el-menu class="el-menu-vertical-demo" @select="gopath">
                        <template v-for="(item,index) in menuList">
                            <template>
                            <el-menu-item :index="item.menuI">
                                <i :class="item.menuImages"></i>
                                <span class="sidemenu-text">{{ item.menuName }}</span>
                            </el-menu-item>
                            </template>
                        </template>
                    </el-menu>
                </el-aside>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    props:['menuList'],
    data(){
        return {
            Name:sessionStorage.getItem("name"),
        }
    },
    methods: {
    gopath(url) {
      //路由跳转
        this.$router.push(url)
    },
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
