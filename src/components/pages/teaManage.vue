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
                department:'aaa',
                phone: '15985672342'
            }]
        }
    },
    methods:{
        search(){},
        editTea(index,row){},
        deleteTea(index,row){},
        resetPwd(row){},
        addTea(){}
    }
}
</script>
