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
                {menuI:'/managerIndex/manManage',menuName:'管理员管理',menuImages: "el-icon-news"},
                {menuI:'/managerIndex/teaManage',menuName:'导师管理',menuImages: "el-icon-date"},
                {menuI:'/managerIndex/stuManage',menuName:'学生管理',menuImages: "el-icon-document"},
                {menuI:'4',menuName:'院系管理',menuImages: "el-icon-rank"},
                {menuI:'5',menuName:'课题管理',menuImages: "el-icon-edit-outline"},
                {menuI:'6',menuName:'系统设置',menuImages: "el-icon-setting"}
            ]
        }
    },
    components:{
        Header
    }
}
</script>