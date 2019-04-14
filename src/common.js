export default {
    install(Vue, options) {
        Vue.prototype.$getData = function(methods,url,data,callback){
            this.$http({
              method:methods,
              url:url,
              data:data,
              headers:{
                'token':sessionStorage.getItem('token'),
              },
            }).then((res) => {
                if(res.data == 'loginError'){
                  alert('登陆过期，请重新登陆！');
                  this.$router.push('/login');      
                  return;
                }
                callback(res);
            }).catch((err)=>{
              let status = -100;
              if(err.response){
                if(err.response.status){
                  status = err.response.status;
                }
              }
             
              let cb = {    
                status:status,
                statusText:err.message,      
                data:{           
                  code:status,
                  msg:err.message, 
                  data:{}
                }
              };
              callback(cb);       
            })
        };
    }
}