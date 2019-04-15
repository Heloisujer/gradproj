
import Qs from 'qs';
export default {
    install(Vue, options) {
        Vue.prototype.$getData = function(method,url,data,callback){
          let urls = '/api'+url;
            this.$http({
              method:method,
              url:urls,
              // data:data,
              data:Qs.stringify(data),
              headers:{
                // 'token':sessionStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            }).then((res) => {
                // if(res.data == 'loginError'){
                //   alert('登陆过期，请重新登陆！');
                //   this.$router.push('/login');      
                //   return;
                // }
                let names = sessionStorage.getItem('name');
                if(names === undefined){
                  this.$router.push('/login');    
                  return;
                }
                let ress = res.data;
                callback(ress);
            }).catch((error)=>{   
              let cb = {    
                code:100,
                msg:'请求错误',      
                data:''
              };
              callback(cb);       
            })
        };
    }
}