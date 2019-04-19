<template>
    <div class="departManage-main" style="width:1000px;margin:0 auto;">
        <!-- <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"> -->
        <el-table
            :data="tableData"  
            style="width: 100%">
            <el-table-column
            label="院系名称"
            prop="departmentName"
            width="500px">
            </el-table-column>
            <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                placeholder="输入院系名称搜索"/>
                <el-button size="mini" type="primary" @click="ckDepart()">查询</el-button>
                <el-button size="mini" type="success" @click="addDepart()">+ 新增</el-button>
            </template>
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="warning"
                @click="modifyDepart(scope.$index, scope.row)">修改</el-button>
                <el-button
                v-show="scope.row.enable"
                size="mini"
                type="danger"
                @click="stopDepart(scope.$index, scope.row)">停用</el-button>
                <el-button
                v-show="!scope.row.enable"
                size="mini"
                type="primary"
                @click="stopDepart(scope.$index, scope.row)">启用</el-button>
            </template>
            </el-table-column>
        </el-table>

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
            :title="dialogVal.activeIndex==-1?'院系新增':'修改院系信息' "
            :visible="dialogVal.dialogVisible"
            :center="true"
            :before-close="clearState"
            >       
            <el-form :model="row" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

                <el-form-item label="院系名称" prop="departmentName" class="eInputBoxs">
                <el-input v-model="row.departmentName"></el-input>
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
            enable:'',
            departmentId:'',
            dialogVal:{
                activeIndex:-1,
                dialogVisible: false,  
            },
            row:{
                id:"",
                departmentName:'',
            },
            rules:{
                departmentName: [
                    { required: true, message: '请输入院系名称', trigger: 'blur' },
                    { max:13, message: ' 13 个字符以内', trigger: 'blur' }
                ],
            },
            tableData: [{
                departmentName:'aaa',
                enable:''
                }],
            search: '',
            pages:{
                pageSize:10,
                pageNums:1,
                total:0,
            },
        }
    },
    methods: {
       clearState(){
            this.$refs.ruleForm.clearValidate();
            this.$refs.ruleForm.resetFields(); 
            this.row = {
                departmentName:'',
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
            let row  = this.row;
            console.log(this.departmentId)
            console.log(this.departmentId)
            console.log(this.departmentId)
            let data = {
                departmentId:this.departmentId,
                name:row.departmentName,
            };
            this.$getData('post','/departmen/save',data,(res)=>{
                if(res.code == 200){
                    this.getData();
                    this.clearState();
                    this.$message({
                        message: '院系修改成功!',
                        type: 'success'
                    }); 
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        ckDepart(){
            this.pages={
                pageSize:10,
                pageNums:1,
                total:0,
            };
            this.getData();
            if(this.search=""){
                this.$router.go(-1)
            }
        },
        addData(){
            let row  = this.row;
            console.log(row)
            let data = {
                name:row.departmentName,
            };
            this.$getData('post','/departmen/save',data,(res)=>{
            if(res.code == 200){
                this.getData();
                this.clearState();
                this.$message({
                    message: '院系新增成功!',
                    type: 'success'
                }); 
            }else{
                this.$message.error(res.msg);
            }
            })
        },
        modifyDepart(index, row) {
            this.dialogVal.activeIndex = index;
            this.dialogVal.dialogVisible = true;
            this.row.departmentName = row.departmentName;
            console.log(row.departmentName)
            this.departmentId = row.id;
            console.log(index, this.departmentId);
        },
        stopDepart(index, row) {
            console.log(row.enable)
            this.$getData('post','/departmen/enable',{departmentId:row.id,enable:!row.enable},(res) => {
                if(res.code==200){           
                    this.getData();  
                // this.tableData.splice(index,1);
                // this.pages.total--;
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });   
                }else{
                this.$message.error(res.msg); 
                }
            
            });
        },
        addDepart(){
            this.dialogVal= {
                activeIndex:-1,
                dialogVisible: true, 
                row:{
                    departmentName:""
                } 
            } 
        },
        handleCurrentChange(val) {
            this.pages.pageNums = val;
            this.getData();

        },
        handleSizeChange(val) {
            this.pages.pageSize = val;
            this.getData();
        },
        getData(){
            console.log(this.pages.pageSize)
            console.log(this.search)
            this.$getData('get','/department/list',{page:this.pages.pageNums,size:this.pages.pageSize,name:this.search},(res) => {
                let data = res.data;
                if(res.code==200){
                    console.log(data.totalCount)
                    this.pages.total = data.totalCount;
                    let attrs = [];
                    console.log(data.list)
                    let lists = data.list;
                    lists.map((v,i)=>{
                      let obj = {
                        id: v.departmentId,
                        departmentName: v.departmentName,  
                        enable:v.enable,   
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
    },
}
</script>

<style>
.el-table {
    margin-top: 50px;
    border: 1px solid #EBEEF5;
}
.el-table .cell {
    text-align: center;
}
.el-table th div {
    overflow: visible;
}
.el-table .el-input {
    width: 300px;
    /* margin-right: -36px; */
}
</style>
