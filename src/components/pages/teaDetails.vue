<template>
    <div class="teaDetails-main" style="width:1000px;margin:0 auto;">
        <div class="basic-content">
            <p>工号：<span v-text="teaInfos.username"></span></p>
            <p>姓名：<span v-text="teaInfos.name"></span></p>
            <p>院系：<span v-text="teaInfos.department"></span></p>
            <p>职称：<span v-text="teaInfos.job_title"></span></p>
            <p style="margin-left:-48px">联系方式：<span  v-text="teaInfos.phone"></span></p>
            <el-button
            style="margin-right: 30px;"
            type="warning"
            @click="editTea()">修改</el-button>
            <el-button
            type="danger"
            @click="editPwd()">修改密码</el-button>
        </div>
        <el-dialog title="导师个人信息修改" :visible.sync="dialogEdit" class="details-edit">
            <el-form :model="editform" class="details-form">
                <el-form-item label="工号" :label-width="formLabelWidth">
                    <el-input v-model="editform.username" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="院系" :label-width="formLabelWidth">
                    <el-input v-model="editform.department" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="职称" :label-width="formLabelWidth">
                    <el-input v-model="editform.job_title" autocomplete="off" disabled></el-input>
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
                <el-button type="primary" @click="teaSub()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            teaInfos:{
                username:"111",
                name:"张晓梅",
                department:"数学",
                job_title:"教授",
                phone:"12566784536"
            },
            dialogEdit: false,
            formLabelWidth: '120px',
            editform: {
                username:"111",
                name:"张晓梅",
                department:"数学",
                job_title:"教授",
                phone:"12566784536"
            },
        }
    },
    methods:{
        editTea() {
            this.dialogEdit = true;
        },
        teaSub() {
            this.dialogEdit = false;
        },
        editPwd() {
            this.$router.push('/teacherIndex/modifyPsw')
        }
    }
}
</script>
