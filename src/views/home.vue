<template>
    <div class="container">
       <div class="module action">
           <div class="title">
             <p>面料检测</p>
             <ul>
               <li v-for="item in 6">栏目{{item}}</li>
             </ul>
           </div>
           <div class="content">
              <div class="content-left">
                 <div class="flexbox">
                    <div class="column">
                      <ul class="column-project">
                        <li v-for="(projects,index) in project" :key="index" @click="onSearch(projects.commodityTypeName)" @mouseover="showProject(projects.commodityTypeName,projects.id)" @mouseout="hideProject()">{{projects.commodityTypeName}}<a-icon type="right" /></li>
                      </ul>
                      <div class="column-list" v-if="isShow" @mouseover="showProjectBySelf()" @mouseout="hideProject()">
                        <p class="column-list-title">{{projectName}}</p>
                        <ul class="column-list-box">
                          <li v-for="(projectItems,index) in projectItems"  :key="index">{{projectItems.commodityTypeName}}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="slide">
                        <div class="slide-swiper">
                            <a-carousel arrows>
                              <div  slot="prevArrow" slot-scope="" class="custom-slick-arrow slide-left">
                                <img src="static/home-img/slide-l.png" alt="">
                              </div>
                              <div slot="nextArrow" slot-scope="" class="custom-slick-arrow slide-right">
                                <img src="static/home-img/slide-r.png" alt="">
                              </div>
                              <div><img src="static/home-img/banner-01.png" alt=""></div>
                              <div><img src="static/home-img/banner-02.png" alt=""></div>
                              <div><img src="static/home-img/banner-03.png" alt=""></div>
                              <div><img src="static/home-img/banner-04.png" alt=""></div>
                            </a-carousel>
                        </div>
                        <div class="slide-news news">
                            <div class="flexbox">
                              <p>机构</p>
                              <!-- <a class="more" href="">查看更多&lt;&lt;</a> -->
                            </div>
                            <ul>
                              <li class="flexbox" v-for="(item,index) in organList" :key="item.id">
                                <router-link :to="'/news/'+item.id" class="textover">{{item.title}}</router-link>
                                <span>{{item.time}}</span>
                              </li>
                            </ul>
                        </div>
                    </div>
                    <div class="news-bd">
                     <div class="news-one news">
                            <div class="flexbox">
                              <p>资讯</p>
                              <!-- <a class="more" href="">查看更多&lt;&lt;</a> -->
                            </div>
                            <ul>
                              <li class="flexbox" v-for="item in messageList1" :key="item.id">
                                <router-link :to="'/news/'+item.id" class="textover">{{item.title}}</router-link>
                              </li>
                            </ul>
                     </div>
                     <div class="news-two news">
                            <div class="flexbox">
                              <p>资讯</p>
                              <!-- <a class="more" href="">查看更多&lt;&lt;</a> -->
                            </div>
                            <ul>
                              <li class="flexbox" v-for="item in messageList2" :key="item.id">
                                <router-link :to="'/news/'+item.id" class="textover">{{item.title}}</router-link>
                              </li>
                            </ul>
                     </div>
                    </div>
                 </div>
                 <router-link to="/news/19">
                   <div class="content-left-pack flexbox">
                        <div class="pack-log">
                            <img src="static/home-img/packlogo.png" alt="">
                            <p>园区</p>
                        </div>
                        <div class="pack-text">
                            <p>面料的检验与检测规程</p>
                            <p class="textover">面料的检验与检测是为了能够采购到合格的产品，为后步的加工服务，是保障</p>
                            <p>2019/07/19</p>
                        </div>
                   </div>
                 </router-link>
              </div>
              <div class="content-right">
                   <div class="line">
                      标准
                   </div>
                   <ul class="graphic">
                    <li v-for="(item,index) in standardList" :key="item.id">
                      <router-link :to="'/news/'+item.id" class="flexbox">
                         <img src="static/home-img/list1 (1).png" alt="">
                         <p>
                           <span>{{item.title}}</span>
                           <span>{{item.time}}</span>
                         </p>
                      </router-link>
                    </li>
                   </ul>
                   <div class="line">
                      院校
                   </div>
                   <div class="news">
                        <ul>
                          <li class="flexbox" v-for="(item,index) in academyList" :key="item.id">
                            <router-link :to="'/news/'+item.id" class="textover">{{item.title}}</router-link>
                          </li>
                        </ul>
                   </div>
                   <div class="line">
                      培训
                   </div>
                   <ul class="graphic">
                    <li v-for="(item,index) in trainList" :key="item.id">
                      <router-link :to="'/news/'+item.id" class="flexbox">
                         <img src="static/home-img/list1 (1).png" alt="">
                         <p>
                           <span>{{item.title}}</span>
                           <span>{{item.time}}</span>
                         </p>
                      </router-link>
                    </li>
                   </ul>
                   <div class="line">
                      会议
                   </div>
                   <div class="news">
                        <ul>
                          <li class="flexbox" v-for="(item,index) in meetingList" :key="item.id">
                            <router-link :to="'/news/'+item.id" class="textover">{{item.title}}</router-link>
                          </li>
                        </ul>
                   </div>
              </div>
           </div>
       </div>
       <div class="module laboratory">
          <div class="room">
             <div class="room-title flexbox">
               <p>服务项</p>
               <!-- <a href="" class="more">查看更多&lt;&lt;</a> -->
             </div>
             <a-row type="flex" justify="space-between" align="top" :gutter="16">
                <a-col :span="8" v-for="(item,index) in 6" :key="index">
                    <router-link :to="'/serviceDetail/'+index" class="flexbox">
                      <img src="static/home-img/produce (4).png" class="room-product-img" alt="">
                    </router-link>
                    <p class="room-product-title">羊绒检测</p>
                    <p class="room-product-price">￥<span>12</span>.00</p>
                </a-col>
             </a-row>
          </div>
          <div class="room station">
             <div class="room-title flexbox">
               <p>检测站</p>
               <!-- <a href="" class="more">查看更多&lt;&lt;</a> -->
             </div>
             <a-row type="flex" justify="space-between" align="top" :gutter="16">
                <a-col :span="8" v-for="(item,index) in 6" :key="index">
                    <router-link :to="'/shop/'+index" class="flexbox">
                      <img src="static/home-img/produce (4).png" class="room-product-img" alt="">
                    </router-link>
                    <p class="room-product-title">羊绒检测</p>
                    <p class="room-product-address">北京</p>
                </a-col>
            </a-row>
          </div>
       </div>
       <div class="module segmentation">
          <div class="segmentation-detail">
             设备新闻内容设备新闻内容设备新闻内容设备。
          </div>
       </div>
       <div class="module fdc">
          <div class="fdc-title">FDC检测平台</div>
          <div class="fdc-desc">汇集全球面料和供应商及众多设计师买家，欢迎各大检测机构入驻。</div>
          <ul class="fdc-list">
            <li>
              <img src="static/home-img/fdc (1).png" alt="">
              <p class="fdc-list-ser">优质服务</p>
              <p class="fdc-list-desc">面向全球用户、详细介绍广泛宣传各检测机构的优质服务</p>
            </li>
            <li>
              <img src="static/home-img/fdc (2).png" alt="">
              <p class="fdc-list-ser">打造网红检测机构</p>
              <p class="fdc-list-desc">为数百万块面料打上检测标志 打造网红检测机构</p>
            </li>
            <li>
              <img src="static/home-img/fdc (3).png" alt="">
              <p class="fdc-list-ser">入驻加盟</p>
              <p class="fdc-list-desc">欢迎各检测机构抢先入驻，挣得第一桶金，赢得市场</p>
            </li>
            <li>
              <img src="static/home-img/fdc (4).png" alt="">
              <p class="fdc-list-ser">限时活动</p>
              <p class="fdc-list-desc">入驻检测平台首页3个月广告位...并获得平台优先推广</p>
            </li>
          </ul>
       </div>
       <div class="module fdc">
          <div class="fdc-title">卖家服务团队宣传</div>
          <div class="fdc-desc">汇集全球面料和供应商及众多设计师买家，欢迎各大检测机构入驻。</div>
          <ul class="propaganda-list">
            <li>
              <img src="static/home-img/fdc2 (1).png" alt="">
              <p class="propaganda-list-desc">大海面料馆宣传</p>
            </li>
            <li>
              <img src="static/home-img/fdc2 (2).png" alt="">
              <p class="propaganda-list-desc">大海面料馆宣传</p>
            </li>
            <li>
              <img src="static/home-img/fdc2 (3).png" alt="">
              <p class="propaganda-list-desc">大海面料馆宣传</p>
            </li>
          </ul>
       </div>
    </div>
</template>

<script>
import {getCommodityList} from '@/service/getData'
import {messageList1, messageList2, organList, standardList, academyList, trainList, meetingList} from '../api/dictionary'
export default {
  	name: 'Home',
  	data () {
	    return {
        project: ['基本项目','色牢度','生态','尺寸稳定性','物理/功能','织物结构','纤维/纱线','羽绒制品'],
        isShow: false,
        projectName: '',
        projectItems: ['基本项目','色牢度','生态','尺寸稳定性','物理/功能','织物结构','纤维/纱线','羽绒制品'],
        pageNum: 0,
        pageSize: 10,
        name: '',
        projectNameId: '',
        messageList1 : messageList1,
        messageList2 : messageList2,
        organList : organList,
        standardList : standardList,
        academyList : academyList,
        trainList : trainList,
        meetingList : meetingList,
      }
  	},
  	methods: {
      showProject(index,id) {
        this.isShow = true;
        this.projectName = index;
        this.projectNameId = id;
        if(id){
          this.getCommodityById(id);
        }
      },
      showProjectBySelf(){
        this.isShow = true;
        this.getCommodityById(this.projectNameId);
      },
      hideProject(){
        this.isShow = false;
      },
      getCommodity(){
        let params = "";
        getCommodityList(params).then((res) =>{
          if(res && res.code == 200){
            this.project = res.data;
          }
        })
      },
      getCommodityById(id){
        getCommodityList(id).then((res) =>{
          if(res && res.code == 200){
            this.projectItems = res.data;
          }
        })
      },
      onSearch(value){
        this.$store.dispatch('saveName',value);
        this.$router.push('/services');
      },
  	},
  	mounted(){
      console.log(this.$store);
      this.getCommodity();
  	}
}
</script>

<style scoped>
/* lunbo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 280px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
.ant-carousel >>> .slick-slide  h3 {
  color: #fff;
}
.ant-carousel >>> .slick-dots li.slick-active button {
    background:rgba(248,231,28,1);
    opacity: 1;
    width: 8px;
}
.ant-carousel >>> .slick-dots {
    position: absolute;
    left: 45%;
    bottom: 18px;
    width: auto;
    list-style: none;
    text-align: center;
    margin: 0;
    display: flex;
    height: 14px;
    background: rgba(255,255,255,0.3);
    border-radius: 7px;
    padding: 3px 4px;
}
.ant-carousel >>> .slick-dots li button {
    border: 0;
    cursor: pointer;
    background: #fff;
    opacity: 1;
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 1px;
    outline: none;
    font-size: 0;
    color: transparent;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    padding: 0;
    border-radius: 100%;
}
ul{
  padding: 0;
}
li {
	list-style: none
}
ol, ul, dl {
    margin-top: 0;
    margin-bottom: 0;
}
.flexbox{
  display: flex;
  flex: 1;
}
.textover{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
a{
  color: rgba(51,51,51,1);
}
/* 查看更多 */
.more{
  width:66px;
  height:12px;
  font-size:12px;
  /* font-family:PingFang-SC-Regular; */
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:12px;
}
.container{
  position: relative;
}
.module{
  position: relative;
  min-width: 1200px;
}
.action{
  position: relative;
  width: 1200px;
  margin: 0 auto;
}
.action .title{
  height: 30px;
  color:rgba(255,255,255,1);
  background:rgba(35,0,168,1);
  font-size:16px;
  /* font-family:PingFang-SC-Bold; */
  font-weight:bold;
  overflow: hidden;
}
.action .title p{
  width:190px;
  line-height: 30px;
  background:rgba(41,66,214,1);
  text-align: center;
  float: left;
}
.action .title ul{
  margin-left: 190px;
}
.action .title ul li{
  width: 90px;
  float: left;
  text-align: right;
  line-height: 30px;
}
.action .content{
  display: flex;
  flex: 1;
  background: #F5F5F5;
}
.action .content .content-left{
  width: 940px;
}
.action .content .content-left .column{
  width:190px;
  background:rgba(189,189,189,1);
  position: relative;
}
.column .column-project{
  height:502px;
  overflow: auto;
}
.column .column-project::-webkit-scrollbar{
  display: none;
}
.column .column-project li{
  width: 190px;
  height: 32px;
  padding: 0px 22px 0px 39px;
  display: flex;
  justify-content: space-between;
  font-size:14px;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height: 32px;
  overflow: hidden;
}
.column .column-project li i{
  line-height: 35px;
  font-size: 12px;
}
.column .column-project li:hover{
  cursor: pointer;
  background:rgba(255,255,255,1);
  color:rgba(41,66,214,1);
  border: 0;
}
.column .column-list{
  position: absolute;
  top: 0;
  left: 190px;
  width:530px;
  height:290px;
  padding: 29px 0px 0px 38px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(35,0,168,1);
  z-index: 999;
}
.column .column-list .column-list-title{
  margin-bottom: 13px;
  font-size:16px;
  font-weight:bold;
  color:rgba(41,66,214,1);
}
.column .column-list .column-list-box{
  width: 100%;
}
.column .column-list .column-list-box li{
  margin-right: 20px;
  margin-bottom: 10px;
  display: inline-block;

}
.action .content .content-left .slide{
  width: 520px;
  margin: 10px 10px 0px 10px;
}
.action .content .content-left .slide .slide-left{
  left: 0px;
  z-index: 1;
}
.action .content .content-left .slide .slide-right{
  right: -6px;
}
.action .content .content-left .slide .slide-swiper{
  width: 520px;
  height: 280px;
}
.action .content .content-left .slide-news{
  width: 520px;
  height: 201px;
  margin-top: 10px;
  padding: 10px 18px 31px 10px;
  background:rgba(255,255,255,1);
  overflow: hidden;
}
/* 资讯 */
.news .flexbox{
  justify-content: space-between;
}
.news div p{
  width: 28px;
  height: 17px;
  border-bottom: 2px solid rgba(35,0,168,1);
  font-size: 14px;
  /* font-family: PingFang-SC-Medium; */
  font-weight: 500;
  color:rgba(51,51,51,1);
  line-height: 12px;
}
.news ul li{
  background: url('../../static/home-img/li.png') no-repeat left center;
  padding-left: 8px;
  margin-bottom: 7px;
  font-size:14px;
  /* font-family:PingFang-SC-Regular; */
  font-weight:400;
}
.news ul li span{
  margin-left: 17;
  color:rgba(153,153,153,1);
}
.action .content .content-left .news-bd{
  padding-top: 10px;
}
.action .content .content-left .news-bd .news-one{
  width:210px;
  height:280px;
  background:rgba(255,255,255,1);
  padding: 8px 10px 26px 5px;
}
.action .content .content-left .news-bd .news-one ul{
  height: 214px;
  overflow: hidden;
}
.action .content .content-left .news-bd .news-two{
  width:210px;
  height:202px;
  margin-top: 10px;
  padding: 8px 10px 26px 5px;
  background:rgba(255,255,255,1);
}
.action .content .content-left .news-bd .news-two ul{
  height: 130px;
  overflow: hidden;
}
.action .content .content-left .content-left-pack{
  width: 940px;
  height: 100px;
  margin-top: 10px;
  padding: 22px 0px 15px 0px;
  background: url('../../static/home-img/pack.png') no-repeat;
}
.action .content .content-left .content-left-pack .pack-log{
  width: 88px;
  height: 63px;
  border-right: 1px dashed;
  text-align: center;
}
.action .content .content-left .content-left-pack .pack-log p{
  margin-top: 9px;
}
.action .content .content-left .content-left-pack .pack-text{
  padding-left: 19px;
  font-size:14px;
  /* font-family:PingFang-SC-Medium; */
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:14px;
}
.action .content .content-left .content-left-pack .pack-text p{
  margin: 0;
}
.action .content .content-left .content-left-pack .pack-text p:nth-child(2){
  width: 434px;
  margin-top: 10px;
  font-weight: 400;
  color:rgba(102,102,102,1);
}
.action .content .content-left .content-left-pack .pack-text p:nth-child(3){
  margin-top: 10px;
  font-size:12px;
  color:rgba(153,153,153,1);
}
.action .content .content-right{
  width:250px;
  height:601px;
  background:rgba(255,255,255,1);
  padding: 13px 7px 0px 5px;
  margin: 10px 0px 0px 10px;
}
.action .content .content-right .line{
  width: 230px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  background: url('../../static/home-img/line.png') no-repeat;
  font-size:14px;
  font-weight:500;
  color:rgba(51,51,51,1);
}
.action .content .content-right .graphic{
  padding-left: 3px;
  margin-bottom: 18px;
  overflow: hidden;
}
.action .content .content-right .graphic li{
  height: 56px;
  margin-top: 17px;
}
.action .content .content-right .graphic li a img{
  width: 84px;
  height: 55px;
}
.action .content .content-right .graphic li a p{
  margin-left: 10px;
}
.action .content .content-right .graphic li a p span:first-child{
  width:141px;
  height:40px;
  font-size:14px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.action .content .content-right .graphic li a p span:nth-child(2){
  font-size:12px;
  font-weight:400;
  color:rgba(153,153,153,1);
}
.action .content .content-right .news{
  margin-top: 16px;
  margin-bottom: 18px;
}
.laboratory{
  position: relative;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.laboratory .room{
  width:590px;
  height:532px;
  margin-top: 21px;
  padding: 20px 14px 25px 14px;
  background:rgba(255,255,255,1);
}
.laboratory .room .flexbox{
  -webkit-box-pack: justify;
  justify-content: space-between;
}
.laboratory .room .room-title p{
  width:54px;
  height:25px;
  font-size:18px;
  font-weight:bold;
  color:rgba(230,33,43,1);
  line-height:25px;
}
.laboratory .room >>> .ant-row-flex .ant-col-8{
  margin-top: 20px;
}
.laboratory .room p{
  margin-bottom: 0;
}
.laboratory .room .room-product-title{
  margin: 10px 0px 8px 0px;
  font-size:14px;
  font-family:MicrosoftYaHei;
  color:rgba(51,51,51,1);
}
.laboratory .room .room-product-price{
  font-size:12px;
  color:rgba(230,33,43,1);
  line-height:16px;
}
.laboratory .room .room-product-price span{
  font-size:24px;
}
.laboratory .room .room-product-address{
  height: 21px;
  font-size:12px;
  color:rgba(153,153,153,1);
  line-height:16px;
}
.laboratory .station .room-title p{
  color:rgba(35,0,168,1);
}
.segmentation{
  position: relative;
  width: 1200px;
  height: 100px;
  margin: 0 auto;
  margin-top: 10px;
  background: url('../../static/home-img/segmentation.png')no-repeat;
  display: flex;
  align-items:center;
  justify-content:center;
}
.segmentation .segmentation-detail{
  width:444px;
  height:44px;
  border:1px solid rgba(255,255,255,1);
  font-size:16px;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:44px;
  text-align: center;
}
.fdc{
  position: relative;
  width: 1200px;
  height: 438px;
  margin: 0 auto;
  margin-top: 10px;
  padding-top: 32px;
  background:rgba(255,255,255,1);
}
.fdc .fdc-title{
  margin-bottom: 20px;
  text-align: center;
  font-size:24px;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:24px;
}
.fdc .fdc-desc{
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:10px;
  text-align: center;
}
.fdc .fdc-list{
  display: flex;
  justify-content:space-between;
  margin-top: 76px;
}
.fdc .fdc-list li{
  width: 296px;
  height: 150px;
  text-align: center;
  border-left: 1px solid rgba(217,217,217,1);
}
.fdc .fdc-list li:first-child{
  border-left: 0;
}
.fdc .fdc-list li img{
  width: 60px;
  height: 60px;
}
.fdc .fdc-list li .fdc-list-ser{
  margin-bottom: 22px;
  margin-top: 19px;
  font-size:16px;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:16px;
}
.fdc .fdc-list li .fdc-list-desc{
  width:183px;
  height:40px;
  margin: auto;
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
  text-align: left;
  line-height:20px;
}
.propaganda-list{
  width: 1022px;
  display: flex;
  justify-content:space-between;
  margin: 0 auto;
  margin-top: 42px;
}
.propaganda-list li{
  width: 316px;
  height: 242px;
}
.propaganda-list li img{
  width: 316px;
  height: 208px;
}
.propaganda-list .propaganda-list-desc{
  margin-top: 20px;
  font-size:14px;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:14px;
}
</style>
