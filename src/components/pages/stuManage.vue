<template>
    <div class="stuManage-main" style="width:1000px;margin:0 auto;">
        <div class="inputBox">
			<label>请输入学生姓名：</label>
			<el-input v-model="searchTxt" prefix-icon="el-icon-search"></el-input>
            <el-button size="mini" type="primary" @click="search()">查询</el-button>
            <el-button size="mini" type="success" @click="addStu()">+ 新增</el-button>
	    </div>
        <div class="tableBox">
            <el-table
                border
                stripe
                :data="tableData"      
                :highlight-current-row='true'
                style="width: 1200px">
                <el-table-column
                prop="username"
                label="学号"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                >
                </el-table-column>
                <el-table-column
                prop="department"
                label="院系"
                >
                </el-table-column>
                <el-table-column
                prop="phone"
                label="联系方式">
                </el-table-column>
                <el-table-column
                label="操作"
                width="300">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="warning"
                    @click="editStu(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteStu(scope.$index, scope.row)">删除</el-button>
                    <el-button
                    size="mini"
                    type="info"
                    @click="resetPwd(scope.row)">重置密码</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :title="dialogVal.activeIndex==-1?'导师新增':'修改导师信息' "
            :visible="dialogVal.dialogVisible"
            :center="true"
            :before-close="clearState"
            >       
            <el-form :model="row" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="学号" prop="username" class="eInputBoxs">
                <el-input v-model="row.username" :disabled="disabled"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="name" class="eInputBoxs">
                <el-input v-model="row.name"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" prop="phone" class="eInputBoxs">
                <el-input v-model="row.phone"></el-input>
                </el-form-item>

                <el-form-item label="所属院系" prop="department" class="eInputBoxs" :disabled="disabled">
                <el-select v-model="row.department" placeholder="请选择所属院系">
                    <el-option :key="i+v+'department'" v-for="(v,i) in departments " :label="v.txt" :value="v.val"></el-option>
                </el-select>
                </el-form-item>
               
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clearState">取 消</el-button>
                <el-button type="primary" @click="edit()">提 交</el-button>
            </span>
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
            disabled:false,
            departments:[],
            dialogVal:{
                activeIndex:-1,
                dialogVisible: false,  
            },
            searchTxt:'',
            row:{
                username:"",
                name:'',
                phone: '',
                department:'',
            },
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max:21, message: ' 21 个字符以内', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { max:13, message: ' 13 个字符以内', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator:validatePhone, trigger: 'blur' }
                ],
                department: [
                    {  required: true, message: '请选择所属院系', trigger: 'change'},
                ],
            },
            tableData: [{
                username: '111',
                name: '王小虎',
                department:'aaa',
                phone: '15985672342'
            }]
        }
    },
    methods:{
        clearState(){
            this.$refs.ruleForm.clearValidate();
            this.$refs.ruleForm.resetFields(); 
            this.row = {
                username:"",
                name:'',
                phone: '',
                department:'',
            };
            this.dialogVal.dialogVisible = false;
        },
        edit(){
            let res = false;
            this.$refs.ruleForm.validate((valid) => {
            if (valid) {
                res =  true;
            } else {
                res = false;
            }
            }); 
            if(!res){
            return;
            }
            if( this.dialogVal.activeIndex!==-1){
            this.editData();
            }else{
            // 新增
            this.addData();       
            }         
        },
        search(){},
        editStu(index,row){
            this.disabled = true;
            this.dialogVal.activeIndex = index;
            this.dialogVal.dialogVisible = true;
            this.row.username = row.username;
            this.row.phone = row.phone;
            this.row.name = row.name;
            this.row.department = row.department;
            setTimeout(()=>{
                this.$refs.ruleForm.clearValidate(); //清空判断状态
            },2);
        },
        deleteStu(index,row){},
        resetPwd(row){},
        addStu(){
            this.disabled = false;
            this.dialogVal= {
                activeIndex:-1, 
                dialogVisible: true, 
                row:{
                id:'',
                username:"",
                name:'',
                phone: '',
                department:'',
                }       
            } 
        }
    }
}
</script>
