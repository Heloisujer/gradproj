<template>
    <div style="width:1000px;margin:0 auto;">
        <div class="basic-content">
            <p>学号：<span>201510803054</span></p>
            <p>姓名：<span>张大梅</span></p>
            <p>院系：<span></span></p>
            <p style="margin-left:-48px">联系方式：<span></span></p>
            <el-button
            type="warning"
            @click="editStud(scope.$index, scope.row)">修改</el-button>
            <el-button
            type="danger"
            @click="editPwd()">修改密码</el-button>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        editPwd() {
            this.$router.push('/studentIndex/modifyPsw')
        }
    }
}
</script>

<style>

</style>
