<template>
    <div class="teaManage-main" style="width:1000px;margin:0 auto;">
        <div class="inputBox">
			<label>请输入导师姓名：</label>
			<el-input v-model="searchTxt" prefix-icon="el-icon-search"></el-input>
            <el-button size="mini" type="primary" @click="search()">查询</el-button>
            <el-button size="mini" type="success" @click="addTea()">+ 新增</el-button>
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
                label="工号"
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
                prop="job_title"
                label="职位"
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
                    @click="editTea(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteTea(scope.$index, scope.row)">删除</el-button>
                    <el-button
                    size="mini"
                    type="info"
                    @click="resetPwd(scope.row)">重置密码</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages">
            <div class="pageBox">
                <div class="total">
                    <span>共<span v-text="pages.total"></span>条</span>  
                    <span class="span2">显示条数</span>     
                    </div> 
                    <div class="pageBoxsIn">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pages.pageNums"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pages.pageSize"
                        layout="sizes, prev, pager, next, jumper"
                        :total="pages.total">
                    </el-pagination>  
                </div>        
            </div>
        </div>
        <el-dialog
            :title="dialogVal.activeIndex==-1?'导师新增':'导师信息修改' "
            :visible="dialogVal.dialogVisible"
            :center="true"
            :before-close="clearState"
            >       
            <el-form :model="row" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="工号" prop="username" class="eInputBoxs">
                <el-input v-model="row.username" :disabled="disabled"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" v-if="ok" required="">
                <el-input v-model="row.password" disabled="disabled"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="name" class="eInputBoxs">
                <el-input v-model="row.name"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" prop="phone" class="eInputBoxs">
                <el-input v-model="row.phone"></el-input>
                </el-form-item>

                <el-form-item label="所属院系" prop="department_id" class="eInputBoxs">
                    <el-select v-model="row.department_id" placeholder="请选择所属院系" >
                        <el-option :key="i+v+'department_id'" v-for="(v,i) in departments " :label="v.txt" :value="v.val" v-show="v.enable"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="职位" prop="job_title_code" class="eInputBoxs">
                    <el-select v-model="row.job_title_code" placeholder="请选择职位">
                        <el-option :key="i+v+'job_title_code'" v-for="(v,i) in job_titles " :label="v.txt" :value="v.val"></el-option>
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
import md5 from '../../../static/js/md5.min.js';
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
            userId:'',
            ok:false,
            disabled:false,
            departments:[],
            job_titles:[],
            dialogVal:{
                activeIndex:-1,
                dialogVisible: false,  
            },
            searchTxt:'',
            row:{
                username:"",
                password:"",
                name:'',
                phone: '',
                department_id:'',
                department:'',
                job_title_code:'',
                job_title:''
            },
            rules:{
                username: [
                    { required: true, message: '请输入用户名！', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { max:13, message: ' 13 个字符以内', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator:validatePhone, trigger: 'blur' }
                ],
                department_id: [
                    {  required: true, message: '请选择所属院系', trigger: 'change'},
                ],
                job_title_code: [
                    {  required: true, message: '请选择导师职称', trigger: 'change'},
                ],
            },
            pages:{
                pageSize:10,
                pageNums:1,
                total:0,
            },
            searchTxt:'',
            tableData: [{
                username: '111',
                name: '王小虎',
                department:'aaa',
                job_title:'教授',
                phone: '15985672342'
            }]
        }
    },
    methods:{
        handleCurrentChange(val) {
            this.pages.pageNums = val;
            this.getData();
        },
        handleSizeChange(val) {
            this.pages.pageSize = val;
            this.getData();
        },
        clearState(){
            this.$refs.ruleForm.clearValidate();
            this.$refs.ruleForm.resetFields(); 
            this.row = {
                username:"",
                password:"",
                name:'',
                phone: '',
                department_id:'',
                department:'',
                job_title_code:'',
                job_title:''
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
        editData(){
            // console.log(this.part, "submit");
            let row  = this.row;
            let data = {
                userId:this.userId,
                username:row.username,
                name:row.name,//用户名称
                departmentId:row.department_id,
                jobTitleCode:row.job_title_code,
                phone:row.phone
            };
            this.$getData('post','/teacher/save',data,(res)=>{
                if(res.code == 200){
                    this.getData();
                    this.clearState();
                    this.$message({
                        message: '修改成功!',
                        type: 'success'
                    }); 
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        addData(){
            let row  = this.row;
            if(Number(row.username.length)<3){
                return  this.$message.error("用户账号符最小为3位！");
            }
            let data = {
                username:row.username,
                name:row.name,//用户名称
                departmentId:row.department_id,
                jobTitleCode:row.job_title_code,
                phone:row.phone,
                password:md5(row.password),
            };
            this.$getData('post','/teacher/save',data,(res)=>{
            if(res.code == 200){
                this.getData();
                this.clearState();
                this.$message({
                    message: '新增成功!',
                    type: 'success'
                }); 
            }else{
                this.$message.error(res.msg);
            }
            })
        },
        search(){
            this.pages={
                pageSize:10,
                pageNums:1,
                total:0,
            };
            this.getData();
            if(this.searchTxt=""){
                this.$router.go(-1)
            }
        },
        editTea(index,row){
            this.ok =  false;
            this.disabled = true;
            this.dialogVal.activeIndex = index;
            this.dialogVal.dialogVisible = true;
            this.row.username = row.username;
            this.row.phone = row.phone;
            this.row.name = row.name;
            this.row.department_id = row.department_id;
            this.row.department = row.department;
            this.row.job_title_code = row.job_title_code;
            this.row.job_title = row.job_title;
            this.userId = row.id;
        },
        addTea(){
            this.ok = true;
            this.disabled = false;
            this.row.password = "123456";
            this.dialogVal= {
                activeIndex:-1, 
                dialogVisible: true, 
                row:{
                    id:'',
                    username:"",
                    // password:"",
                    name:'',
                    phone: '',
                    department:'',
                    job_title:'',
                }       
            } 
        },
        deleteTea(index,row){
            this.$confirm('删除后删除后此用户将不存在！', `是否删除角色${row.name}`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$getData('post','/user/delete',{userId:row.id},(res) => {
                // console.log(row.id);
                if(res.code==200){             
                this.tableData.splice(index,1);
                this.pages.total--;
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });   
                }else{
                this.$message.error(res.msg); 
                }
            
            });
            
            }).catch(() => {
                    
            });
        },
        resetPwd(row){
            this.$confirm('重置后密码还原为初始密码',`是否进行${row.name}的密码重置？`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let data ={
                userId:row.id,            
                };
                this.$getData('post','/user/pwd/reset',data,(res)=>{
                let data = res.data;
                if(res.code == 200){
                    console.log(data.notice)
                    this.$message({
                    type: 'success',
                    message: data.notice
                    });     
                }else{
                    this.$message.error(res.msg);
                    
                }
                })         
            }).catch(() => {
                    
            });
        },
        getJobTitleList(){
            this.$getData('get','/sys/dict',{type:'job_title'},(res) => {
                let data = res.data;
                if(res.code==200){
                    let attrs = [];
                    let lists = data;
                    lists.map((v,i)=>{
                      let obj = {
                        txt: v.value,  
                        val:v.code,   
                      };
                      attrs.push(obj);
                    }); 
                    this.job_titles = [];
                    this.job_titles = attrs; 
                    console.log(this.job_titles)
                }else{
                    this.$message.error(res.msg);
                }
            });
        },
        getDepartmentList(){
            this.$getData('get','/department/list',{departmentName:'',departmentId:''},(res) => {
                let data = res.data;
                if(res.code==200){
                    let attrs = [];
                    let lists = data.list;
                    lists.map((v,i)=>{
                      let obj = {
                        txt: v.departmentName,
                        val: v.departmentId,  
                        enable:v.enable,   
                      };
                      attrs.push(obj);
                    }); 
                    this.departments = [];
                    this.departments = attrs; 
                    console.log(this.departments)
                }else{
                    this.$message.error(res.msg);
                }
            });
        },
        getData(){
            this.$getData('get','/teacher/list',{page:this.pages.pageNums,size:this.pages.pageSize,name:this.searchTxt},(res) => {
                let data = res.data;
                if(res.code==200){
                    this.pages.total = data.totalCount;
                    let attrs = [];
                    let lists = data.list;
                    lists.map((v,i)=>{
                      let obj = {
                        id: v.userId,
                        name: v.name,     
                        username: v.username, 
                        department_id: v.departmentId,
                        department: v.department,
                        job_title_code: v.jobTitleCode,
                        job_title: v.jobTitle,
                        phone: v.phone
                      };
                      attrs.push(obj);
                    }); 
                    this.tableData = [];
                    this.tableData = attrs; 
                }else{
                    this.$message.error(res.msg);
                }
            });
        }
    },
    mounted(){
        this.getData();
        this.getJobTitleList();
        this.getDepartmentList();
    },
}
</script>
