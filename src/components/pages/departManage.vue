<template>
    <div class="departManage-main" style="width:1000px;margin:0 auto;">
        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column
            label="院系名称"
            prop="name"
            width="500px">
            </el-table-column>
            <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                placeholder="输入院系名称搜索"/>
                <el-button size="mini" type="primary" @click="ckDepart">查询</el-button>
            </template>
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="warning"
                @click="modifyDepart(scope.$index, scope.row)">修改</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="stopDepart(scope.$index, scope.row)">停用</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-button class="addDepart" size="mini" type="success" @click="addDepart()">+ 新增</el-button>
        <!-- <div class="footer_right">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
            </el-pagination>
        </div> -->
        <el-dialog
            :title="dialogVal.activeIndex==-1?'院系新增':'修改院系信息' "
            :visible="dialogVal.dialogVisible"
            :center="true"
            :before-close="clearState"
            >       
            <el-form :model="row" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

                <el-form-item label="院系名称" prop="name" class="eInputBoxs">
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
            dialogVal:{
                activeIndex:-1,
                dialogVisible: false,  
            },
            row:{
                username:"",
                name:'',
            },
            rules:{
                name: [
                    { required: true, message: '请输入院系名称', trigger: 'blur' },
                    { max:13, message: ' 13 个字符以内', trigger: 'blur' }
                ],
            },
            tableData: [{
                name:'aaa',
                }, {
                name:'bbb',
            }],
            search: '',
            currentPage: 1,
        }
    },
    methods: {
       clearState(){
            this.$refs.ruleForm.clearValidate();
            this.$refs.ruleForm.resetFields(); 
            this.row = {
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
        modifyDepart(index, row) {
            this.dialogVal.activeIndex = index;
            this.dialogVal.dialogVisible = true;
            this.row.name = row.name;
            console.log(index, row);
        },
        stopDepart(index, row) {
            this.dialogVal.name = '';
            console.log(index, row);
        },
        addDepart(){
            this.dialogVal= {
                activeIndex:-1,
                dialogVisible: true, 
                name:this.dialogVal.name,
            } 
        },
        ckDepart(){}
        // handleSizeChange(val) {
        //     console.log(`每页 ${val} 条`);
        // },
        // handleCurrentChange(val) {
        //     console.log(`当前页: ${val}`);
        // }
    }
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
.addDepart {
    float: right;
    margin-top: 10px;
}
/* .footer_right {
    float: right;
    margin-top: 50px;
    margin-right: 21px;
}

.footer_right .pagination_item {
    position: relative;
    top: 5px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(77,77,77,1);
    line-height:20px;
}

.el-pagination {
    float: right;
}

.el-pagination .el-pagination__total,.el-pagination  .el-pagination__sizes {
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(77,77,77,1);
}

.el-pagination .el-select--mini,.el-pagination__sizes {
    width: 80px;
    margin-right: 40px;
}

.el-pagination  .el-pagination__sizes .el-input {
    margin-top: -5px;
} */
</style>
