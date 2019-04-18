<template>
  <div class="modifyPsw-main">
	  <!-- 内容部分 -->
	  <div class="content">
	  	<div class="form-content">
	  		<p>修改密码</p>
	  		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item prop="oldPassword" label="旧密码：">
                    <el-input type="password" v-model="ruleForm.oldPassword" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="新密码：">
                    <el-input type="password" v-model="ruleForm.password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item prop="confrimPassword" label="确认密码：">
                    <el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.confrimPassword"></el-input>
                </el-form-item>
                
                <div class="login-btn">
                    <el-button type="primary" style="margin-right: 50px;" @click="editPwd()">确认</el-button>
                    <el-button type="info" @click="backTo">返回</el-button>
                </div>
            </el-form>
	  	</div>
	  </div>
  </div>
</template>
<script>
import md5 from '../../static/js/md5.min.js';
export default {
  data() {
  	const CheckPsd = (rule, value, callback) =>{
      if (value === '') {
        callback(new Error('请再次输入新密码!'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 表单基本数据
      ruleForm: {
          oldPassword: '',
          password: '',
          confrimPassword: '',
      },
      rules: {
          oldPassword: [
              { required: true, message: '请输入旧密码', trigger: 'blur' },
               { min: 6, message: '长度大于 6 个字符', trigger: 'blur' },
          ],
          password: [
              { required: true, message: '请输入新密码', trigger: 'blur' },
               { min: 6, message: '长度大于 6 个字符', trigger: 'blur' },
          ],
          confrimPassword: [
              { required: true, validator: CheckPsd, trigger: 'blur' }
          ]
      },
      user_id:sessionStorage.getItem('userId'),
    }
  },
  methods:{
        backTo() {
            this.$router.go(-1)
        },
        editPwd(){
          
          if((this.ruleForm.password).length<6 ||(this.ruleForm.password).length>16 || this.ruleForm.password !=this.ruleForm.confrimPassword || (this.ruleForm.oldPassword).length<6 || (this.ruleForm.oldPassword).length>16){
            return console.log(this.ruleForm);
          }
          var data = {
            userId:this.user_id,
            oldPassword:md5(this.ruleForm.oldPassword),
            newPassword:md5(this.ruleForm.password)
          }
          this.$getData("post",'/user/pwd/update',data,(res) => {
            let data = res.data;
            // let result = data.result;
            if(res.code ==200){
              this.$message({
                message: res.msg,
                type: 'success'
              });
               this.$router.push('/login');
            }else{
               this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          });
        }    
    }
}

</script>
<style lang="less" scoped>
 
</style>

