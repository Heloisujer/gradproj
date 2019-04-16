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
                {menuI:'/studentIndex/topicManage',menuName:'课题选择',menuImages: "el-icon-edit-outline"},
                {menuI:'/studentIndex/stuDetails',menuName:'个人信息',menuImages: "el-icon-edit"},
                // {menuI:'3',menuName:'论文上传',menuImages: "el-icon-upload"},
            ]
        }
    },
    components:{
        Header
    },
    mounted(){
        let names = sessionStorage.getItem('name');
        if(names == null&&this.$route.name!=='登录'){
            alert('请登陆！');
            this.$router.push('/login');      
            return;
        }
    }
}
</script>