<template>
<div id="center">
  <div  class="tel-number1">
    <div class="tel-number">
      <router-link to="/personalcertificate">
      <img src="../assets/juxing.png" id="icon-img"/>
      <span class="tel-phone">{{loginPhone}}</span>
      </router-link>
    </div>
    <ul>
      <li   :class="$route.path == '/personalcertificate'? 'check_active':''" >
        <router-link to="/personalcertificate">
        <a-icon type="user" />
        个人认证
        </router-link>
      </li>
      <li>
        <router-link to="/verifyIdentity">
        <a-icon type="lock" />
        密码修改
        </router-link>
      </li>
      <li>
        <router-link to="/orderList">
        <a-icon type="file-text" />
        所有订单
        </router-link>
      </li>
      <li  :class="$route.path == '/address'? 'check_active':''">
        <router-link to="/address">
        <i class="icon-orderstep7"></i>
        <a href="">收货地址</a>
        </router-link>
      </li>
    </ul>
  </div>
  
  <router-view></router-view>
</div>
</template>
<script>
export default {
  data() {
    return {
        shows : 0,
        loginPhone: this.$store.getters.getLoginPhone,
    }
  },
  methods: {
    handclick(e){
      console.log('click',e);
    },
    check1(){
      this.shows=1;
    },
    check2(){
      this.shows=2;
    },
    check3(){
      this.shows=3;
    },
    check4(){
      this.shows=4;
    },
  },
}
</script>

<style scoped>
ul,li{
  margin: 0;
  padding:0;
  /* display: inline-block; */
}
ul{
  display:inline-block;
}
a{
  text-decoration: none;
}
li{
  display: inline-block;
  height:51px;
  width:174px;
  line-height: 51px;
  border-bottom:1px solid rgba(0, 0, 0, 0.15);
  color: black;
}
li a{
  color: black;
}
li a:hover{
  color: rgba(35, 0, 168, 1);
}
.check_active a{
  color: rgba(35, 0, 168, 1);
}
.anticon{
  margin-left: 19px;
}
.icon-orderstep7{
  margin-left: 19px;
}
  .ant-menu{
    border-right:none;
    width:174px;
    background-color: none;
  }
  .ant-menu-item{
    border-bottom:1px solid rgba(0, 0, 0, 0.15);
    padding:0px;
    text-align: initial;
    margin-bottom:0px;
    margin: 0;
    padding:0;
    height:50px;
    line-height: 50px;
  }
 .ant-menu-item img{
   width:14px;
   height:14px;
 }
  .ant-menu-root{
    height:620px;
  }
  #center{
    margin-top: 52px;
    height:620px;
  }
  .tel-number{
    box-sizing: border-box;
    height: 90px;
    width:174px;
    padding-top:20px;
    padding-left:0px;
    padding-right:0px;
    margin:0px;
    margin-bottom:0px;
    display: inline-block;
    border-bottom:1px solid rgba(0, 0, 0, 0.15);
    
  }
  .tel-number1{
    box-sizing: border-box;
    width:174px;
    padding-left:0px;
    padding-right:0px;
    margin:0px;
    margin-bottom:0px;
    display: inline-block;
    float: left;
    height: 620px;
    background: white;
    
  }
  #icon-img{
    border-radius: 50%;
    height: 50px;
    width:50px;
    margin-left:13px;
  }
  .tel-phone{
    margin-left:10px;
    font-size:14px;
    color: black;
  }
  .icon-img-geren,.icon-img-mima,.icon-img-dingdan,.icon-img-dizhi{
    margin-left:19px;
  }
</style>