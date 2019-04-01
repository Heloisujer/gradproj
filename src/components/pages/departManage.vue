<template>
    <div class="departManage-main" style="width:1000px;margin:0 auto;">
        <el-table
            :data="tableData.filter(data => !search || data.department.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column
            label="院系名称"
            prop="department"
            width="500px">
            </el-table-column>
            <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                placeholder="输入院系名称搜索"/>
            </template>
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="warning"
                @click="modifyDepart(scope.$index, scope.row)">修改</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="deleteDepart(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-button class="addDepart" size="mini" type="success" @click="addDepart">+ 新增</el-button>
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
    </div>
</template>

<script>
export default {
    data() {
      return {
            tableData: [{
            department:'aaa',
            }, {
            department:'bbb',
            }],
            search: '',
            currentPage: 1,
        }
    },
    methods: {
        modifyDepart(index, row) {
            console.log(index, row);
        },
        deleteDepart(index, row) {
            console.log(index, row);
        },
        addDepart(){}
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
