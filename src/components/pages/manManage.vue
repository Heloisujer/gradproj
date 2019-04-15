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

                <el-form-item label="密码" prop="password" v-show="false">
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
            }]
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
            let data = {
                id:row.id,
                name:row.name,//用户名称
            };
            this.$getData('post','/manager/save',data,(res)=>{
                let data = res.data;
                let result = data.result;
                if(data.code == 200){
                    this.getData();
                    this.clearState();
                    this.$message({
                        message: '修改成功!',
                        type: 'success'
                    }); 
                }else{
                    this.$message(data.msg);
                }
            })
        },
        search(){},
        editMan(index,row){
            this.dialogVal.activeIndex = index;
            this.dialogVal.dialogVisible = true;
            this.row.username = row.username;
            this.disabled = true;
            this.row.id = row.userId;
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
        resetPwd(row){},
        getData(){
            var data = {
                page:this.pages.pageNums,
                size:this.pages.pageSize
            }
            this.$getData('get','/manager/list',data,(res) => {
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
                    this.$message(res.msg);
                }
            });
        }
    }
}
</script>
