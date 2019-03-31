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
                {menuI:'1',menuName:'课题管理',menuImages: "el-icon-edit-outline"},
                {menuI:'2',menuName:'个人信息',menuImages: "el-icon-edit"},
            ]
        }
    },
    components:{
        Header
    }
}
</script>