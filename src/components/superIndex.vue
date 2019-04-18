<template>
    <div class="manager-main">
        <Header :menuList="listData"></Header>
        <el-main>
            <div class="main_table">
                <router-view></router-view>
            </div>
        </el-main>
    </div>
</template>

<script>
import Header from '@/components/header'
export default {
    data() {
        return {        
            listData:[
                {menuI:'/superIndex/manManage',menuName:'管理员管理',menuImages: "el-icon-news"},
                {menuI:'/superIndex/teaManage',menuName:'导师管理',menuImages: "el-icon-printer"},
                {menuI:'/superIndex/stuManage',menuName:'学生管理',menuImages: "el-icon-document"},
                {menuI:'/superIndex/departManage',menuName:'院系管理',menuImages: "el-icon-rank"},
                {menuI:'/superIndex/topicManage',menuName:'课题管理',menuImages: "el-icon-edit-outline"},
                {menuI:'/superIndex/systemManage',menuName:'系统设置',menuImages: "el-icon-setting"}
            ]
        }
    },
    components:{
        Header
    },
    mounted(){
        let names = sessionStorage.getItem('name');
        let roles = sessionStorage.getItem('roleCode');
        if(names == null&&this.$route.name!=='登录'&&roles != "role_admin"){
            alert('请登陆！');
            this.$router.push('/login');      
            return;
        }
    }
}
</script>