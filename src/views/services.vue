<template>
  <div class="container">
     <div class="action" >
        <div class="identification">
          <div class="address flexbox">
            <span>地区:</span>
            <ul class="flexbox">
              <li v-for="(item,index) in address" :key="index" :class="isActiveByAddress == item.id ? 'active' : ''"  @click="showStoreList(3,item.id,index)">{{item.addressName}}</li>
            </ul>
          </div>
          <div class="service flexbox">
            <span>服务:</span>
            <ul class="flexbox">
              <li v-for="(item,index) in services" :key="index" :class="isActiveByService == item.id ? 'active' : ''"  @click="showStoreList(2,item.id,index)">{{item.commodityTypeName}}</li>
            </ul>
          </div>
        </div>
        <div class="content flexbox" >
          <div class="shop">
              <loading v-if="loadingData" :visible="true"></loading>
              <div v-else>
                <div v-if="store.length > 0">
                  <div class="shops flexbox" v-for="(item,index) in store" :key="index" @click="goShop(item.storeInfo.id)">
                      <img :src="item.storeInfo.picUrl" alt="" class="shops-img">
                      <div class="shops-info">
                        <p class="shops-info-name">企业名：<span>{{item.storeInfo.storeName}}</span></p>
                        <div class="flexbox">
                          <span>企业简介：</span>
                          <p class="shops-info-desc">{{item.storeInfo.storeIntroduce}}</p>
                        </div>
                        <div class="flexbox">
                          <span>检测范围：</span>
                          <p class="shops-info-range">{{item.storeInfo.storeDetectionScope}}</p>
                        </div>
                      </div>
                      <div class="shops-service">
                        <ul>
                          <li class="flexbox" v-for="(items,indexs) in store[index].list" :key="indexs">
                            <p>{{items.commodityName}}</p>
                            <p>￥<span>{{items.commodityPrice}}</span></p>
                          </li>
                        </ul>
                        <span class="more">查看更多 》</span>
                      </div>
                  </div>
                  <a-pagination showQuickJumper :defaultCurrent="0" v-if="dataLength>0" :total="dataLength" :defaultPageSize="pageSize" :current="current" @change="onChange" />
                </div>
                <noData v-else />
              </div>
          </div>
          <div class="ad">
            <img src="static/home-img/ad.png" alt="">
          </div>
        </div>
     </div>
  </div>
</template>
<script>
import loading from '../components/loading'  //loading
import noData from '../components/noData'
import {showStore,getCommodityList,getProvince,getOrgExistAddress} from '@/service/getData'
export default {
    name: 'Home',
  	data () {
	    return {
         name: this.$store.getters.getName,
         address: [],
         services: [],
         store: [],
         pageNum: 0,
         pageSize: 5,
         dataLength: 0,
         current: 1,
         typeId: '',
         parameter: '',
         isActiveByAddress: '',
         isActiveByService: '',
         loadingData : true,
	    }
    },
    components: {
      loading,noData
    },
    methods: {
      // 后端0页代表第一页开始计数
      onChange(pageNumber) {
        this.pageNum = pageNumber-1;
        this.current = pageNumber;
        this.getData(this.typeId,this.parameter);
      },
      goShop(index){
        this.$router.push({
          path: '/shop/'+index,
        })
      },
      showStoreList(typeId,name,index){
        this.typeId = typeId;
        this.parameter = name;
        if(typeId==3){
          this.isActiveByAddress = name;
          this.isActiveByService = '';
        }else if(typeId==2){
          this.isActiveByService = name;
          this.isActiveByAddress = '';
        }
        this.pageNum = 0;
        this.current = 1;
        this.getData(typeId,name);
      },
      getData(typeId,name){
        this.loadingData = true;
        showStore(typeId,name,this.pageNum,this.pageSize).then(res => {
          if(res && res.code == 200){
            if(res.data){
              if(res.data.length){
                this.dataLength = res.data[0].total;
              }
              this.store = res.data;
            }else{
              this.store = [];
              this.dataLength = 0;
            }
            this.loadingData = false;
          }
        })
      },
      showProvince(){
        getOrgExistAddress().then((res) =>{
          if(res && res.code == 200){
            this.address = res.data;
          }
        })
      },
      getCommodity(){
        getCommodityList('').then((res) =>{
          if(res && res.code == 200){
            this.services = res.data;
          }
        })
      },
    },
    computed: {
      listenshowpage1() {
        return this.$store.getters.getName;
      }
    },
    watch:{
      listenshowpage1:function(old,newd){
        this.showStoreList(1,old);
      }
    },
    mounted() {
      this.showStoreList(1,this.$store.getters.getName);
      this.showProvince();
      this.getCommodity();
    },
}
</script>
<style scoped>
li{
  list-style: none;
}
ul{
  margin: 0;
  padding: 0;
}
.flexbox{
  display: flex;
}
.container{
  position: relative;
  min-width: 1200px;
}
.action{
  position: relative;
  width: 1200px;
  margin: 0 auto;
}
.identification{
  width: 1200px;
  padding: 20px 20px 0px 20px;
  border:1px solid rgba(217,217,217,1);
  margin-top: 30px;
}
.identification .address ul,.identification .service ul{
  flex-wrap: wrap;
}
.identification .address span,.identification .service span{
  display: block;
  width: 42px;
  height: 18px;
}
.identification .address ul li,.identification .service ul li{
  margin-left: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
.content{
  justify-content: space-between;
  margin-top: 30px;
}
.content .shop{
  width: 940px;
  position: relative;
}
.content .ad{
  width: 222px;
  height: 658px;
}
.content .shop .shops{
  width: 940px;
  height: 234px;
  border:1px solid rgba(217,217,217,1);
  margin-bottom: 20px;
  cursor: pointer;
}
.content .shop .shops .shops-img{
  width: 234px;
  height: 234px;
}
.content .shop .shops .shops-info{
  width: 387px;
  height: 234px;
  padding: 21px 27px 15px 20px;
  font-size:14px;
  font-weight:500;
  color:rgba(102,102,102,1);
}
.content .shop .shops .shops-info p{
  margin-bottom: 20px;
}
.content .shop .shops .shops-info .shops-info-name span{
  color: #2300A8;
}
.content .shop .shops .shops-info .shops-info-desc,.content .shop .shops .shops-info .shops-info-range{
  width: 266px;
  height: 67px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color:rgba(102,102,102,1);
}
.content .shop .shops .shops-service{
  position: relative;
  width: 318px;
  height: 193px;
  padding-left: 26px;
  padding-right: 51px;
  margin-top: 20px;
  border-left: 1px dashed  rgba(226,226,226,1);
}
.content .shop .shops .shops-service ul{
  height: 150px;
  overflow: hidden;
}
.content .shop .shops .shops-service ul li{
  height: 20px;
  margin-bottom: 13px;
  font-size:14px;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.content .shop .shops .shops-service ul li p:first-child{
  width: 174px;
}
.content .shop .shops .shops-service ul li p:nth-child(2){
  color:rgba(230,33,43,1);
  margin-top: -2px;
}
.content .shop .shops .shops-service ul li p:nth-child(2) span{
  font-size:18px;
}
.content .shop .shops .shops-service ul li p{
  margin-bottom: 20px;
}
.more{
  position: absolute;
  right: 47px;
  bottom: 0;
  font-size:14px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:12px;
}
.more:hover{
  color:rgba(41,66,214,1);
}
.shop >>> .ant-pagination{
  margin-top: 80px;
  text-align: right;
}
.shop >>> .ant-pagination .ant-pagination-item-active{
  background:rgba(35,0,168,1);
  border-color: rgba(35,0,168,1);
}
.shop >>> .ant-pagination .ant-pagination-item-active a{
  color: #fff;
}
.active{
  color: blue;
}

</style>
