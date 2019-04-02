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
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchTxt:'',
            tableData: [{
                username: '111',
                name: '王小虎',
            }]
        }
    },
    methods:{
        search(){},
        editMan(index,row){},
        addMan(){},
        deleteMan(index,row){},
        resetPwd(row){}
    }
}
</script>
