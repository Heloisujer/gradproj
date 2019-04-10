<template>
    <div class="manManage-main" style="width:1000px;margin:0 auto;">
        <div class="inputBox">
			<label>请输入管理员姓名：</label>
			<el-input v-model="searchTxt" prefix-icon="el-icon-search"></el-input>
            <el-button size="mini" type="primary" @click="search()">查询</el-button>
            <el-button size="mini" type="success" @click="addMan()">+ 新增</el-button>
	    </div>
        <div class="tableBox">
            <el-table
                border
                stripe
                :data="tableData"      
                :highlight-current-row='true'
                style="width: 700px">
                <el-table-column
                prop="username"
                label="账号"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                >
                </el-table-column>
                <el-table-column
                label="操作"
                width="300">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="warning"
                    @click="editMan(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteMan(scope.$index, scope.row)">删除</el-button>
                    <el-button
                    size="mini"
                    type="info"
                    @click="resetPwd(scope.row)">重置密码</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            :title="dialogVal.activeIndex==-1?'管理员新增':'修改管理员信息' "
            :visible="dialogVal.dialogVisible"
            :center="true"
            :before-close="clearState"
            >       
            <el-form :model="row" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username" class="eInputBoxs" >
                <el-input v-model="row.username" :disabled="disabled"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" v-show="false" required>
                <el-input v-model="row.password" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="name" class="eInputBoxs">
                <el-input v-model="row.name"></el-input>
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
        return {
            disabled:false,
            dialogVal:{
                activeIndex:-1,
                dialogVisible: false,  
            },
            row:{
                username:"",
                password:"",
                name:'',
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
            },
            searchTxt:'',
            tableData: [{
                username: '111',
                name: '王小虎',
            }]
        }
    },
    methods:{
        clearState(){
            this.$refs.ruleForm.clearValidate();
            this.$refs.ruleForm.resetFields(); 
            this.row = {
                username:"",
                password:"",
                name:'',
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
        editMan(index,row){
            this.dialogVal.activeIndex = index;
            this.dialogVal.dialogVisible = true;
            this.row.username = row.username;
            this.disabled = true;
            // console.log(row.username);
            this.row.name = row.name;
            // setTimeout(()=>{
            //     this.$refs.ruleForm.clearValidate();
            // },2);
        },
        addMan(){
            this.disabled = false;
            this.dialogVal= {
                activeIndex:-1, 
                dialogVisible: true, 
                row:{
                id:'',
                password:"",
                username:"",
                name:'',
                }       
            }
        },
        deleteMan(index,row){},
        resetPwd(row){}
    }
}
</script>
