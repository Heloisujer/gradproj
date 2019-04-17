<template>
    <div class="login-main">
        <div class="login-header">
            <div class="logobg-img" :style="{background:'url(/static/images/login-bg.jpg)',backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
                <img src="/static/images/logo.jpg" alt="" class="login-logo" width="100px" height="100px">
                <span class="login-title">
                    攀枝花学院毕业设计管理系统
                </span>
                <div class="login-content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item prop="username" label="用户名：">
                            <el-input @keyup.enter.native="enterCk($event)" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="密码：">
                            <el-input @keyup.enter.native="enterCk($event)" type="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
                        </el-form-item> 
                        <!-- <el-form-item prop="role" label="用户类型：">
                            <el-select v-model="ruleForm.role" placeholder="请选择用户类型">
                                <el-option label="管理员" value="manager"></el-option>
                                <el-option label="导师" value="teacher"></el-option>
                                <el-option label="学生" value="student"></el-option>
                            </el-select> -->
                            <!-- <el-input @keyup.enter.native="enterCk($event)" v-model="ruleForm.username" placeholder="请选择用户类型"></el-input> -->
                        <!-- </el-form-item> -->
                        <el-form-item prop="code" label="验证码：" required>
                            <el-input @keyup.enter.native="enterCk($event)" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
                            <canvas width="92" height="36" id="code" class="identify-code">验证码</canvas>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="login()">登录</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import md5 from '../../static/js/md5.min.js';
export default {
    data() {
        const CheckCode = (rule, value, callback) =>{
            // console.log(value,this.codes)
            if (value === '') {
                callback(new Error('请输入验证码！'));
            } else if (value.toUpperCase() !== this.codes) {
                callback(new Error('请输入正确的验证码！'));
            } else {
                callback();
            }
        };
        return {
            //   isSubmin: false,
            ruleForm: {
                username: 'admin',
                password: 'pzhutopicsys12!@',
                role:'',
                code:''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名！', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码！', trigger: 'blur' },
                    { min: 6, message: '长度大于 6 个字符', trigger: 'blur' },
                ],
                // role: [
                //     { required: true, message: '请选择用户类型！', trigger: 'change' }
                // ],
                code: [
                    { required: true,validator:CheckCode, trigger: 'blur' }
                ],
                codes:''
            }
        }
  },
  methods:{
        enterCk(e){
            var keyCode = window.event? e.keyCode:e.which;
            if(keyCode == 13 && this.ruleForm.username!='' &&this.ruleForm.password!=''){
                this.login();
            }
        },
        login() {
            if(Number(this.ruleForm.username.length)>12){
                return this.$message.error("用户名字符最大为12位");
            }
            if(Number(this.ruleForm.username.length)<3){
                return  this.$message.error("用户名字符最小为3位");
            }
            if(Number(this.ruleForm.password.length)<6){
                return  this.$message.error("密码最小为6位");
            }
            if(Number(this.ruleForm.code.length)!=4){
                return  this.$message.error("请输入正确的验证码");
            }
            if((this.ruleForm.code).toLowerCase() !=(this.codes).toLowerCase()){
            return console.log(this.ruleForm,this.codes);
           }
        //    console.log(this.ruleForm.code.length)
            var data = {
                username:this.ruleForm.username,
                password:md5(this.ruleForm.password)
            }
            this.$getData('post','/login',data,(res) => {
                console.log(res.code)
                if(res.code == 200){
                    // console.log(res.data)
                    // console.log(res.data.roleCode)
                    // console.log(res.data.name);
                    // console.log(typeof(res.data.name));
                    sessionStorage.setItem('name',res.data.name);
                    sessionStorage.setItem('username',res.data.username);
                    sessionStorage.setItem('jobTitle',res.data.jobTitle);
                    sessionStorage.setItem('phone',res.data.phone);
                    // console.log(sessionStorage.name);
                    sessionStorage.setItem('roleCode',res.data.roleCode);  
                    sessionStorage.setItem('userId',res.data.userId);
                    console.log(res.data.token);     
                    if(res.data.roleCode == "role_admin"){
                        this.$router.replace('/superIndex');
                    }
                    if(res.data.roleCode == "role_m"){
                        // this.$message({
                        //     message: res.msg,
                        //     type: 'success'
                        // });
                        this.$router.replace('/managerIndex');          
                    }
                    if(res.data.roleCode == "role_t"){
                        // this.$message({
                        //     message: res.msg,
                        //     type: 'success'
                        // });
                        this.$router.replace('/teacherIndex');          
                    }
                    if(res.data.roleCode == "role_s"){
                        // this.$message({
                        //     message: res.msg,
                        //     type: 'success'
                        // });
                        this.$router.replace('/studentIndex');          
                    }
                    
                }else{
                    this.$message.error(res.msg);
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 绘制验证码
        //1.新建一个函数产生随机数
        rn(min,max){
            return  parseInt(Math.random()*(max-min)+min);
        },
        //2.新建一个函数产生随机颜色
        rc(min,max){
            var r=this.rn(min,max);
            var g=this.rn(min,max);
            var b=this.rn(min,max);
            return `rgb(${r},${g},${b})`;
        },
        //3.填充背景颜色,颜色要浅一点
        drawCode(){
            var w=92;
            var h=36;
            var ctx=code.getContext("2d");
            ctx.fillStyle=this.rc(240,250);
            ctx.fillRect(0,0,w,h);
            //4.随机产生字符串
            var pool="ABCDEFGHIJKLIMNOPQRSTUVWSYZ";
            for(var i=0;i<4;i++){
                var c=pool[this.rn(0,pool.length)];//随机的字
                this.codes = this.codes + c;
                
                var fs=this.rn(28,36);//字体的大小
                var deg=this.rn(-30,30);//字体的旋转角度
                ctx.font=fs+'px Simhei';
                ctx.textBaseline="top";
                ctx.fillStyle=this.rc(80,150);
                ctx.save();
                ctx.translate(20*i,15);
                ctx.rotate(deg*Math.PI/180);
                ctx.fillText(c,-10+15,-10);
                ctx.restore();
            };
            console.log(this.codes);
	        //5.随机产生5条干扰线,干扰线的颜色要浅一点
	        for(var i=0;i<5;i++){
	            ctx.beginPath();
	            ctx.moveTo(this.rn(0,w),this.rn(0,h));
	            ctx.lineTo(this.rn(0,w),this.rn(0,h));
	            ctx.strokeStyle=this.rc(180,230);
	            ctx.closePath();
	            ctx.stroke();
	        };
	        //6.随机产生40个干扰的小点
	        for(var i=0;i<40;i++){
	            ctx.beginPath();
	            ctx.arc(this.rn(0,w),this.rn(0,h),1,0,2*Math.PI);
	            ctx.closePath();
	            ctx.fillStyle=this.rc(150,200);
	            ctx.fill();
	        };
        }//绘制验证码结束    
    },
    mounted(){
        this.codes='';
   	    this.drawCode();
    }
}
</script>

<style>

</style>