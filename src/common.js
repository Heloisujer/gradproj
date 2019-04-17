
import Qs from 'qs';
export default {
    install(Vue, options) {
      Vue.prototype.CheckPhone = function(rule, value, callback){
        var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback();
        }
      };
      Vue.prototype.$CheckPhone = function(value){
        var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
        if (!reg.test(value)) {
          return false;
        } else {
          return true;
        }
      };
      Vue.prototype.$CheckTel = function(value){
        var reg =/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
        if (!reg.test(value)) {
          return false;
        } else {
          return true;
        }
      };
      Vue.prototype.$getTxt = function(attr,val,cb='/'){
        let res = cb;        
        attr.map((v,i)=>{
        if(v.val==val){
            res = v.txt;
        }
        });
        return res;
      };
      Vue.prototype.$getVal = function(attr,txt){
        let res = '/';        
        attr.map((v,i)=>{
        if(v.txt==txt){
            res = v.val;
        }
        });
        return res;
      };
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