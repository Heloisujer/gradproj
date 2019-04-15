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
                {menuI:'/managerIndex/teaManage',menuName:'导师管理',menuImages: "el-icon-printer"},
                {menuI:'/managerIndex/stuManage',menuName:'学生管理',menuImages: "el-icon-document"},
                {menuI:'/managerIndex/departManage',menuName:'院系管理',menuImages: "el-icon-rank"},
                {menuI:'/managerIndex/topicManage',menuName:'课题管理',menuImages: "el-icon-edit-outline"},
                {menuI:'/managerIndex/systemManage',menuName:'系统设置',menuImages: "el-icon-setting"}
            ]
        }
    },
    components:{
        Header
    }
}
</script>