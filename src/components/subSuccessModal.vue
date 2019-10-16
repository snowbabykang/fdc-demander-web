<template>
  <a-modal
            centered
            :footer="null"
            :closable="false"
            v-model="isvisible"
            :width="width"
            :maskClosable="false"
     >
          <div class="modal-content">
            <img src="static/register-img/success.png" alt="">
            <p>{{message}}</p>
            <router-link to="/" v-if="messageByEnter">返回前台首页</router-link>
            <a v-if="messageByEnter" :href="testurl" style="margin-left: 60px;">进入后台管理</a>
            <router-link to="/" v-else> <span class="go">{{c}}</span> <span>秒后</span> 进入首页 </router-link>
        </div>
     </a-modal>
</template>
<script>
export default {
  name: 'subSuccessModal',
    props: {
        visible: { type: Boolean, default: false },
        message: {type: String, default: ""},
        messageByEnter: {type: Boolean, default: ""},           //注册提示信息
        width: ''
    },
    data() {
        return {
           testurl : '',
           c:6,
        };
    },
    computed:{
        isvisible:{
          get:function(){
            if(this.visible){
              this.testurl = process.env.testerUrl+'?token='+this.$store.getters.getToken+'&orgid='+this.$store.getters.getOrgId+'&storeid='+this.$store.getters.getStoreId+'&phone='+this.$store.getters.getLoginPhone;
            }
            return this.visible;
          }
        }
    },
    methods: {
        walkCode(){
            if(this.c > 0) {
                setTimeout(this.walkCode, 1000); // 1 秒后再次调用自己
                this.c--;
            } else {
                this.c = 5;
            }
        },
    },
}
</script>
<style scoped>
.modal-content{
  padding-bottom: 6px;
  text-align: center;
}
.modal-content img{
  margin-top: 20px;
}
.modal-content p{
  margin-top: 14px;
  margin-bottom: 20px;
  font-size:14px;
  font-weight:500;
  color:rgba(51,51,51,1);
}
.modal-content a{
  margin-top: 33px;
  font-size:14px;
  font-weight:500;
  color: #333333;
}
.modal-content a span{
  color: #333333;
}
.modal-content a:hover{
  color:rgba(40,0,177,1);
}
.go{
 color:rgba(40,0,177,1) !important;
}
</style>
