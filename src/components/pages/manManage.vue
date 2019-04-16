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
                style="width: 1000px">
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
            :title="dialogVal.activeIndex==-1?'管理员新增':'修改管理员信息' "
            :visible="dialogVal.dialogVisible"
            :center="true"
            :before-close="clearState"
            >       
            <el-form :model="row" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username" class="eInputBoxs" >
                <el-input v-model="row.username" :disabled="disabled"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" v-if="ok" required="">
                <el-input v-model="row.password" disabled="disabled"></el-input>
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
import md5 from '../../../static/js/md5.min.js';
export default {
    data() {
        return {
            ok:false,
            disabled:false,
            dialogVal:{
                activeIndex:-1,
                dialogVisible: false,  
            },
            row:{
                username:"",
                password:"",
                name:'',
                id:''
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
            pages:{
                pageSize:10,
                pageNums:1,
                total:0,
            },
            tableData: [{
                username: '111',
                name: '王小虎',
            }],
            userId:''
        }
    },
    mounted(){
        this.getData();
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
                id:''
            };
            this.dialogVal.dialogVisible = false;
        },
        edit(){
            this.dialogVal.dialogVisible = false;
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
            let row  = this.row;
            console.log(this.userId);
            let data = {
                userId:this.userId,
                username:row.username,
                name:row.name,//用户名称
            };
            this.$getData('post','/manager/save',data,(res)=>{
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
                password:md5(row.password),
            };
            this.$getData('post','/manager/save',data,(res)=>{
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
        editMan(index,row){
            this.ok =  false;
            console.log(index,row.id)
            this.dialogVal.activeIndex = index;
            this.dialogVal.dialogVisible = true;
            this.row.username = row.username;
            this.row.name = row.name;
            this.disabled = true;
            this.userId = row.id;
            console.log(this.userId);
            // console.log(this.row.id);
            // console.log(row.userId);
            
            // setTimeout(()=>{
            //     this.$refs.ruleForm.clearValidate();
            // },2);
        },
        addMan(){
            this.ok = true;
            this.row.password = "123456";
            this.disabled = false;
            this.dialogVal= {
                activeIndex:-1, 
                dialogVisible: true, 
                row:{
                    id:'',
                    // password:"",
                    username:"",
                    name:'',
                }       
            }
        },
        deleteMan(index,row){
            this.$confirm('删除后删除后此用户将不存在！', `是否删除角色${row.name}`, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$getData('post','/user/delete',{userId:row.id},(res) => {
                console.log(row.id);
                // let data = res.data;
                // let result = data.result;
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
                // let result = data.result;
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
        getData(){
            // var data = {
            //     page:this.pages.pageNums,
            //     size:this.pages.pageSize,
            //     name:this.searchTxt
            // }
            console.log(this.pages.pageSize)
            console.log(this.searchTxt)
            this.$getData('get','/manager/list',{page:this.pages.pageNums,size:this.pages.pageSize,name:this.searchTxt},(res) => {
                let data = res.data;
                if(res.code==200){
                    console.log(data.totalCount)
                    this.pages.total = data.totalCount;
                    let attrs = [];
                    let lists = data.list;
                    lists.map((v,i)=>{
                      let obj = {
                        id: v.userId,
                        name: v.name,     
                        username: v.username,               
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
    }
}
</script>
