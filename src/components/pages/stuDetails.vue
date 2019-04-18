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
            <el-form :model="editform" class="details-form" :rules="rules" ref="ruleForm">
                <el-form-item label="学号" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="editform.username" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="院系" :label-width="formLabelWidth" prop="department">
                    <el-input v-model="editform.department" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name" >
                    <el-input v-model="editform.name" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
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
        let validatePhone = (rule,value,callback)=>{
            if (!this.$CheckPhone(value)) {
                callback(new Error('请输入正确手机号'));
            } else {
                callback();
            }
        }

        return {
            userId:sessionStorage.getItem("userId"),
            stuInfos:{
                username:sessionStorage.getItem("username"),
                name:sessionStorage.getItem("name"),
                department:sessionStorage.getItem("department"),
                phone:sessionStorage.getItem("phone"),
            },
            dialogEdit: false,
            formLabelWidth: '120px',
            editform: {
                username:"111",
                name:"张学生",
                department:"计算机",
                phone:"12566784536"
            },
            rules:{
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { max:13, message: ' 13 个字符以内', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator:validatePhone, trigger: 'blur' }
                ]
            },
        }
    },
    methods:{
        editStud() {
            this.dialogEdit = true;
            this.editform.username = this.stuInfos.username;
            this.editform.phone = this.stuInfos.phone;
            this.editform.name = this.stuInfos.name;
            // this.editform.department_id = row.department_id;
            this.editform.department = this.stuInfos.department;
            // console.log(row.department)
            this.userId = sessionStorage.getItem("userId");
        },
        stuSub() {
            this.dialogEdit = false;
            let editform  = this.editform;
            let data = {
                userId:this.userId,
                // username:editform.username,
                name:editform.name,
                // departmentId:editform.department_id,
                phone:editform.phone
            };
            this.$getData('post','/student/save',data,(res)=>{
                if(res.code == 200){
                    sessionStorage.setItem('phone',editform.phone);
                    this.stuInfos.phone = editform.phone;
                    this.$message({
                        message: '修改成功!',
                        type: 'success'
                    }); 
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        editPwd() {
            this.$router.push('/studentIndex/modifyPsw')
        },
    }
}
</script>

<style>

</style>
