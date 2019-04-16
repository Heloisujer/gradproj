
import Qs from 'qs';
export default {
    install(Vue, options) {
        Vue.prototype.$getData = function(method,url,data,callback){
          let urls = '/api'+url;
          if(method == 'get'){
            urls = urls+'?';
            for(let key in data){
              urls+=key+'='+data[key]+'&'
            }
            
            urls = urls.slice(0,-1);
          }
            this.$http({
              method:method,
              url:urls,
              // data:data,
              data:Qs.stringify(data),
              headers:{
                // 'name':sessionStorage.getItem('name'),
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            }).then((res) => {
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