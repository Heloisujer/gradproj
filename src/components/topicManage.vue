<template>
    <div class="topicManage-main" style="width:1200px;margin:0 auto;">
        <div class="inputBox">
			<label>请输入院系名称进行查询：</label>
			<el-input v-model="searchTxt" prefix-icon="el-icon-search"></el-input>
            <el-button size="mini" type="primary" @click="search()">查询</el-button>
            <el-button size="mini" type="success" @click="addTopic()">+ 新增</el-button>
            <el-button size="mini" type="info" plain @click="print()">打印</el-button>
	    </div>
        <div class="tableBox">
            <el-table
                border
                stripe
                :data="topicData"      
                :highlight-current-row='true'
                style="width: 1200px">
                <el-table-column
                prop="department"
                label="院系"
                >
                </el-table-column>
                <el-table-column
                prop="topic"
                label="课题名称"
                >
                </el-table-column>
                <el-table-column
                prop="tname"
                label="导师姓名"
                >
                </el-table-column>
                <el-table-column
                prop="sname"
                label="学生姓名">
                </el-table-column>
                <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <span class="stateSpan" :style="{'color':scope.row.state=='d'?'#0380FF':'#FF5F58'}">
                    <span v-text="stateTxt(scope.row.state)"></span>
                    <i v-show="scope.row.state==0" style="color:gray">——</i>
                    </span>     
                </template>
                </el-table-column>
                <el-table-column
                label="操作"
                width="450">
                <template slot-scope="scope">
                    <el-button
                    v-show="(scope.row.state=='a')"
                    size="mini"
                    type="warning"
                    @click="editTopic(scope.$index, scope.row)">修改</el-button>
                    <el-button
                    v-show="(scope.row.state=='a')"
                    size="mini"
                    type="danger"
                    @click="deleteTopic(scope.$index, scope.row)">删除</el-button>
                    <el-button
                    v-show="(scope.row.state=='a')"
                    size="mini"
                    type="primary"
                    @click="chooseTopic(scope.$index, scope.row)">选报</el-button>
                    <el-button
                    v-show="(scope.row.state=='c')"
                    size="mini"
                    type="warning"
                    @click.stop="ckClick(scope.row)">审核</el-button>
                    <el-button
                    v-show="(scope.row.state=='c')"
                    size="mini"
                    type="primary"
                    @click="download(scope.$index, scope.row)">论文下载</el-button>
                    <el-button
                    v-show="(scope.row.state=='b')"
                    size="mini"
                    type="primary"
                    @click="upload(scope.$index, scope.row)">论文上传</el-button>
                    <el-button
                    size="mini"
                    @click="seeMore(scope.row)">查看详情</el-button>
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
            :title="dialogVal.activeIndex==-1?'课题新增':'修改课题详情' "
            :visible="dialogVal.dialogVisible"
            :center="true"
            :before-close="clearState"
            >       
            <el-form :model="row" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="课题名称" prop="topic">
                <el-input v-model="row.topic"></el-input>
                </el-form-item>

                <el-form-item label="课题详情" prop="topicDetail">
                <el-input 
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入课题详情内容"
                    v-model="row.topicDetail">
                </el-input>
                </el-form-item>
               
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clearState">取 消</el-button>
                <el-button type="primary" @click="edit()">提 交</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="论文审核"
            :visible.sync="dialog.show"
            size="tiny"
            width="20%"
            :before-close="handleClose">
                <el-row class="demo-autocomplete">
                    <el-col>
                        <div>
                            <el-radio class="radio" v-model="dialog.radio" label="1">通过</el-radio>
                            <el-radio class="radio" v-model="dialog.radio" label="0">不通过</el-radio>
                        </div>
                        <!-- <el-input v-model="dialog.val" type="textarea" :autosize="{ minRows: 3, maxRows: 8}" auto-complete="off" :placeholder="dialog.placeholder" style="margin-top:10px"> -->
                        <!-- </el-input> -->
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogSub">确 定</el-button>
                <el-button @click="handleClose">取 消</el-button>
                </span>
        </el-dialog>
        <el-dialog
            title="论文上传"
            :visible.sync="upDialog.show"
            size="tiny"
            width="40%"
            :before-close="upClose">
                <el-upload
                    class="upload-demo"
                    action=""
                    :on-change="handleChange"
                    :file-list="fileList3">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary" @click="dialogSub">确 定</el-button> -->
                <el-button @click="upClose">取 消</el-button>
                </span>
        </el-dialog>
        <el-dialog
            title="查看详情"
            :visible.sync="seeDialog.show">
            <div class="see_more">
                <p>院系名称：<span v-text="allInfos.department"></span></p>
                <p>课题名称：<span v-text="allInfos.topic"></span></p>
                <p>课题详情：<span v-text="allInfos.topicDetail"></span></p>
                <p>导师姓名：<span v-text="allInfos.tname"></span></p>
                <p>导师电话：<span v-text="allInfos.tphone"></span></p>
                <p>学生姓名：<span v-text="allInfos.sname"></span></p>
                <p>学生学号：<span v-text="allInfos.username"></span></p>
                <p>学生电话：<span v-text="allInfos.sphone"></span></p>
            </div>
        </el-dialog>
        <el-dialog 
            title=""
            :visible.sync="printInfo.show">
            <el-table
                border
                stripe
                :data="topicData"      
                :highlight-current-row='true'>
                <el-table-column
                prop="department"
                label="院系"
                >
                </el-table-column>
                <el-table-column
                prop="topic"
                label="课题名称"
                >
                </el-table-column>
                <el-table-column
                prop="tname"
                label="导师姓名"
                >
                </el-table-column>
                <el-table-column
                prop="sname"
                label="学生姓名">
                </el-table-column>
                <el-table-column
                label="状态">
                <template slot-scope="scope">
                    <span v-text="stateTxt(scope.row.state)"></span>  
                </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogPrint()">确 定</el-button>
                <el-button @click="printInfo.show = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {//查看详情 论文下载 论文上传 删除 修改 选报 审核 新增 打印
    data () {
        return {
            pages:{
                pageSize:10,
                pageNums:1,
                total:0,
            },
            seeDialog:{
                show:false,
            },
            printInfo:{
                show:false,
            },
            allInfos:{
                department:"",
                topic:"",
                topicDetail:"",
                tname:"",
                tphone:"",
                sname:"",
                username:"",
                sphone:"",
            },
            fileList3: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            dialogVal:{
                activeIndex:-1,
                dialogVisible: false,  
            },
            row:{
                topic:"",
                topicDetail:'', 
            },
            upDialog:{
                show:false,
            },
            dialog:{
                show:false,
                radio:'1',
            },
            topicData: [{
                department: '数学系',
                topic: '学生成绩管理系统',
                tname:'王小虎',
                sname: '李学生',
                state:'a'
            },
            {
                department: '数学系',
                topic: '学生成绩管理系统',
                tname:'王小虎',
                sname: '李学生',
                state:'b'
            },
            {
                department: '数学系',
                topic: '学生成绩管理系统',
                tname:'王小虎',
                sname: '李学生',
                state:'c'
            },
            {
                department: '数学系',
                topic: '学生成绩管理系统',
                tname:'王小虎',
                sname: '李学生',
                state:'d'
            },
            {
                department: '数学系',
                topic: '学生成绩管理系统',
                tname:'王小虎',
                sname: '李学生',
                state:'e'
            }],
            states:[
                {txt:'可选',val:'a'},   //选报 修改 删除 添加 查看详情
                {txt:'通过',val:'d'},   //论文下载 查看详情
                {txt:'未提交',val:'b'},   //论文上传 查看详情
                {txt:'待审核',val:'c'},   //审核 论文下载 查看详情
                {txt:'不通过',val:'e'},   ////论文上传 论文下载 查看详情
            ],
            searchTxt:'',
        }
    },
    methods:{
        handleCurrentChange(val) {
            this.pages.pageNums = val;
            // this.getData();
        },
        handleSizeChange(val) {
            this.pages.pageSize = val;
            // this.getData();
        },
        print(){
            this.printInfo.show = true;
        },
        dialogPrint(){},
        handleChange(file, fileList) {
            this.fileList3 = fileList.slice(-3);
        },
        upClose(){
            this.upDialog.show = false;
        },
        upload(index,row){
            this.upDialog.show = true;
        },
        handleClose(){
            this.dialog.show = false;
        },
        dialogSub(){},
        ckClick(row){
            this.dialog={
                show:true,
                radio:'1',
            }
        },
        clearState(){
            this.$refs.ruleForm.clearValidate();
            this.$refs.ruleForm.resetFields(); 
            this.row = {
                topic:"",
                topicDetail:'',
            };
            this.dialogVal.dialogVisible = false;
        },
        seeMore(row){
            this.seeDialog.show = true;
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
        editTopic(index,row){
            this.dialogVal.activeIndex = index;
            this.dialogVal.dialogVisible = true;
            this.row.topic = row.topic;
            this.row.topicDetail = row.topicDetail;
            // setTimeout(()=>{
            //     this.$refs.ruleForm.clearValidate();
            // },2);
        },
        addTopic(){
            this.disabled = false;
            this.dialogVal= {
                activeIndex:-1, 
                dialogVisible: true, 
                row:{
                id:'',
                topic:"",
                topicDetail:'',
                }       
            }
        },
        deleteTopic(index,row){},
        stateTxt(val){
        let res = '';        
        this.states.map((v,i)=>{
          if(v.val==val){
            res = v.txt;
          }
        });
        return res;
      },
    }
}
</script>

<style>

</style>
