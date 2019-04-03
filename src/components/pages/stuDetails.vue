<template>
    <div style="width:1000px;margin:0 auto;" class="stuDetails-main">
        <div class="basic-content">
            <p>学号：<span v-text="stuInfos.username"></span></p>
            <p>姓名：<span v-text="stuInfos.name"></span></p>
            <p>院系：<span v-text="stuInfos.department"></span></p>
            <p style="margin-left:-48px">联系方式：<span  v-text="stuInfos.phone"></span></p>
            <el-button
            style="margin-right: 30px;"
            type="warning"
            @click="editStud()">修改</el-button>
            <el-button
            type="danger"
            @click="editPwd()">修改密码</el-button>
        </div>
        <el-dialog title="学生个人信息修改" :visible.sync="dialogEdit" class="details-edit">
            <el-form :model="editform" class="details-form">
                <el-form-item label="学号" :label-width="formLabelWidth">
                    <el-input v-model="editform.username" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="院系" :label-width="formLabelWidth">
                    <el-input v-model="editform.department" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="editform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="editform.phone" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdit = false">取 消</el-button>
                <el-button type="primary" @click="stuSub()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stuInfos:{
                username:"111",
                name:"张学生",
                department:"计算机",
                phone:"12566784536"
            },
            dialogEdit: false,
            formLabelWidth: '120px',
            editform: {
                username:"111",
                name:"张学生",
                department:"计算机",
                phone:"12566784536"
            },
        }
    },
    methods:{
        editStud() {
            this.dialogEdit = true;
        },
        stuSub() {
            this.dialogEdit = false;
        },
        editPwd() {
            this.$router.push('/studentIndex/modifyPsw')
        }
    }
}
</script>

<style>

</style>
