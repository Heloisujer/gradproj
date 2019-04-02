<template>
    <div class="teaDetails-main" style="width:1000px;margin:0 auto;">
        <div class="basic-content">
            <p>工号：<span v-text="infos.username"></span></p>
            <p>姓名：<span v-text="infos.name"></span></p>
            <p>院系：<span v-text="infos.department"></span></p>
            <p>职称：<span v-text="infos.job_title"></span></p>
            <p style="margin-left:-48px">联系方式：<span  v-text="infos.phone"></span></p>
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
    data() {
        return {
            infos:{
                username:"111",
                name:"张晓梅",
                department:"数学",
                job_title:"教授",
                phone:"12566784536"
            },
             dialogEdit: false
        }
    },
    methods:{
        editPwd() {
            this.$router.push('/teacherIndex/modifyPsw')
        }
    }
}
</script>

<style>

</style>
