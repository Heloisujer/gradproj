<template>
    <div class="topicManage-main" style="width:1200px;margin:0 auto;">
        <div class="inputBox">
			<label>请输入院系名称进行查询：</label>
			<el-input v-model="searchTxt" prefix-icon="el-icon-search"></el-input>
            <el-button size="mini" type="primary" @click="search()">查询</el-button>
            <el-button size="mini" type="success" @click="addTopic()">+ 新增</el-button>
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
                <!-- <template slot-scope="scope">
                    <span class="stateSpan" :style="{'color':scope.row.state=='d'?'#0380FF':'#FF5F58'}">
                    <span v-text="stateTxt(scope.row.state)"></span>
                    <i v-show="scope.row.state==0" class="el-icon-warning"></i>
                    </span>     
                </template> -->
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
                    @click="seeMore(scope.row)">查看详情</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {//查看详情 论文下载 论文上传 删除 修改 选报 审核
    data () {
        return {
            states:[
                {txt:'可选',val:'a'},   //选报 修改 删除 添加 查看详情
                {txt:'通过',val:'d'},   //论文下载 查看详情
                {txt:'未提交',val:'b'},   //论文上传 查看详情
                {txt:'待审核',val:'c'},   //审核 论文下载 查看详情
                {txt:'不通过',val:'e'},   ////论文上传 论文下载 查看详情
            ],
        }
    }
}
</script>

<style>

</style>
