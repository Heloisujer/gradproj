<template>
    <div class="teacher-main">
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
                {menuName:'课题管理',menuImages: "el-icon-edit-outline",menuI:'/teacherIndex/topicManage'},
                {menuName:'个人信息',menuImages: "el-icon-edit",menuI:'/teacherIndex/teaDetails'},
            ]
        }
    },
    components:{
        Header
    },
    mounted(){
        let names = sessionStorage.getItem('name');
        let roles = sessionStorage.getItem('roleCode');
        if(names == null&&this.$route.name!=='登录'&&roles != "role_t"){
            alert('请登陆！');
            this.$router.push('/login');      
            return;
        }
    }
}
</script>