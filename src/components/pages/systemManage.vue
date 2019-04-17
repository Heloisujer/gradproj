<template>
    <div class="systemManage-main">
        <div class="topic-date">
            <p class="demonstration">系统选题开放时间：</p>
            <!-- <el-date-picker
                v-model="dataValue"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker> -->
            <el-date-picker
                v-model="paper_time_start"
                type="datetime"
                placeholder="选择选题开始日期时间">
            </el-date-picker>
            <span>—</span>
            <el-date-picker
                v-model="paper_time_end"
                type="datetime"
                placeholder="选择选题结束日期时间">
            </el-date-picker>
            <el-button type="primary" class="date-preserve" @click="datePreserve">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            // dataValue:'',
            paper_time_start:new Date(2000, 10, 10, 10, 10),
            paper_time_end:new Date(2000, 10, 11, 10, 10),
        }
    },
    methods:{
        dateFormat(time,format){
            var t = new Date(time);
            var tf = function(i){return (i < 10 ? '0' :'') + i};
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g,function(a){
                switch(a){
                case 'yyyy':
                return tf(t.getFullYear());
                break;
                case 'MM':
                return tf(t.getMonth() + 1);
                break;
                case 'mm':
                return tf(t.getMinutes());
                break;
                case 'dd':
                return tf(t.getDate());
                break;
                case 'HH':
                return tf(t.getHours());
                break;
                case 'ss':
                return tf(t.getSeconds());
                break;
                }
            })
        },
        datePreserve() {
            // console.log(this.paper_time_start)
            // console.log(this.dateFormat(this.paper_time_end,'yyyy-MM-dd HH:mm:ss'))
            // console.log(this.dateFormat(this.paper_time_start,'yyyy-MM-dd HH:mm:ss'))
            let data = {
                paperTimeStart:this.dateFormat(this.paper_time_start,'yyyy-MM-dd HH:mm:ss'),
                paperTimeEnd:this.dateFormat(this.paper_time_end,'yyyy-MM-dd HH:mm:ss'),
            };
            this.$getData('post','/sys/paperTime/update',data,(res)=>{
                // console.log(res.code,'hu')
                if(res.code == 200){
                    this.getData();
                    this.$message({
                        message: '系统选题开放时间设置成功!',
                        type: 'success'
                    }); 
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        getData(){
            this.$getData('get','/sys/dict',{type:'paper_time'},(res) => {
                let data = res.data;
                if(res.code==200){
                    let attrs = [];
                    let lists = data;
                    lists.map((v,i)=>{
                      let obj = {
                        code: v.code,  
                        value:v.value,   
                      };
                      attrs.push(obj);
                    }); 
                    for (let index in attrs){
                        if (attrs[index].code=='paper_time_start') {
                            this.paper_time_start = attrs[index].value;
                        }
                        if (attrs[index].code=='paper_time_end') {
                            this.paper_time_end = attrs[index].value;
                        }
                    }
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

