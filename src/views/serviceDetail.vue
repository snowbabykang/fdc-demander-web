<template>
  <div class="container">
     <div class="action" v-if="commodityDetail">
         <router-link :to="'/shop/'+this.data.storeId" class="router">
           <a-icon type="left" />进入店铺列表
         </router-link>
         <div class="title flexbox">
           <p class="title-name">项目名：{{data.commodityName}}</p>
           <p class="title-price">￥{{data.commodityPrice}}</p>
           <p class="title-size" >
             <span v-if="data.sampleType == 0">
               样布大小：
              <span v-if="data.commodityWidth">{{data.commoditySize}}cm*{{data.commodityWidth}}cm</span>
              <span v-else>{{data.commoditySize}}cm*通幅</span>
             </span>
             <span v-if="data.sampleType == 1">
               样布件数：<span>{{data.commoditySize}}件</span>
             </span>
           </p>
         </div>
         <div class="content" v-html="commodityDetail">

         </div>
     </div>
     <div v-else>
          <loading :visible="true"></loading>
      </div>
  </div>
</template>
<script>
import loading from '../components/loading'  //loading
import {getCommodity,getStoreDetail} from '@/service/getData'
export default {
    name: 'ServiceDetail',
    components: {
     loading
    },
  	data () {
	    return {
        commodityId: this.$route.params.id,
        data: '',
        commodityDetail: '',
	    }
  	},
  	methods: {
      getServiceInfo(){
        getCommodity(this.commodityId).then((res) =>{
           if(res && res.code == 200){
             this.data = res.data;
             if(res.data.commodityDetail){
               this.commodityDetail = decodeURIComponent(res.data.commodityDetail);
             }else{
               this.commodityDetail = "暂无介绍"
             }
           }
        })
      },
  	},
  	mounted(){
      this.getServiceInfo();
  	}
}
</script>
<style scoped>
.container{
  position: relative;
  min-width: 1200px;
}
.action{
  position: relative;
  width: 1200px;
  margin: 0 auto;
  margin-top: 52px;
}
.flexbox{
  display: flex;
  justify-content: space-between;
}
.router{
  font-size:14px;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:20px;
}
.router i{
  margin-right: 10px;
}
.title{
  width: 1200px;
  height: 46px;
  margin-top: 29px;
  padding: 0px 80px;
  font-size:14px;
  font-weight:500;
  line-height:46px;
  border:1px solid rgba(223,223,223,1);
}
.title .title-name{
  color:rgba(51,51,51,1);
}
.title .title-price{
  font-weight:400;
  color:rgba(230,33,43,1);
}
.title .title-price::before{
  content: '价格：';
  color:rgba(51,51,51,1);
}
.content{
  width: 1200px;
  padding: 37px 30px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(230,230,230,1);
  border-top: 0;
}
</style>


