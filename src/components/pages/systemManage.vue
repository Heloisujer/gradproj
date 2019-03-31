<template>
    <div class="systemManage-main">
        <div class="topic-date">
            <p class="demonstration">学生选题开放时间：</p>
            <el-date-picker
            v-model="dataValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" class="date-preserve" @click="datePreserve">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            dataValue:''
        }
    },
    methods:{
        datePreserve() {
            console.log("保存！");
        }
    }
}
</script>

<style lang="less">
.systemManage-main {
    .topic-date {
        margin: 50px 0 0 100px;
        .demonstration {
            color: #007dbf;
            font-size: 28px;
            margin-bottom: 20px;
        }
        .el-range-separator {
            padding: 0;
        }
        .el-range__close-icon {
            line-height: 40px;
            margin-top: -8px;
        }
        .date-preserve {
            width: 84px;
            height: 40px;
            margin-left: 20px;
            line-height: 2px;
            font-size: 18px;
        }
    }
}
</style>

