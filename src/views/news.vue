<template>
  <div class="container">
    <div class="line"></div>
    <div class="content">
      <div class="bread">
        <span>当前位置：</span>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item href="">首页</a-breadcrumb-item>
          <a-breadcrumb-item href="">资讯</a-breadcrumb-item>
          <a-breadcrumb-item>热点新闻</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <img :src="'../../static/home-img/news/'+$route.params.id+'@2x.png?v=1'">
      <!-- <div class="introduction">
        <p class="introduction-title">国家品牌，让生活更美好</p>
        <div class="introduction-box">
          <div class="mask">
            <p class="date">发布日期：2019/5/13 14:47:13</p>
            <p class="read">阅读量：132</p>
          </div>
          <div class="text">
                   简介： 由北京市产品质量监督检验院（国家纺织及皮革产品质量监督检验中心）承办的"北京市纺织服装产品质量工作会暨产品质量管控培训会"，于3月7日下午3点在北京阳光丽城温泉度假酒店正式召开，FDC面料图书馆作为特邀媒体参加此次会议并持续报道。
          </div>
        </div>
      </div> -->
    </div>

  </div>
</template>
<script>
export default {
    name: 'News',
  	data () {
	    return {

	    }
  	},
  	methods: {

  	},
  	mounted(){
  	}
}
</script>
<style scoped>
.bread >>>.ant-breadcrumb-separator {
    margin: 0 2px;
    color: rgba(0, 0, 0, 0.45);
}
.bread >>>.ant-breadcrumb a {
    color:rgba(51,51,51,1);
    -webkit-transition: color 0.3s;
    transition: color 0.3s;
}
.container{
  width: 100% !important;
}
.line{
  width: 100%;
  height: 1px;
  background:rgba(217,217,217,1);
  position: relative;
}
.content{
  position: relative;
  width: 1200px;
  margin: 0 auto;
}
.content .bread{
  margin-top: 20px;
  display: flex;
}
.content .introduction{
  margin-top: 64px;
}
.content .introduction .introduction-title{
  margin-bottom: 20px;
  font-size:20px;
  font-weight:500;
  color:rgba(51,51,51,1);
  text-align: center;
}
.content .introduction .introduction-box{
  width: 1200px;
  height: 158px;
  border-top: 1px dashed rgba(217,217,217,1);
  border-bottom: 1px dashed rgba(217,217,217,1);
}
.content .introduction .introduction-box .mask{
  display: flex;
  height: 18px;
  margin-top: 35px;
  justify-content: center;
}
.content .introduction .introduction-box .mask .read{
  margin-left: 16px;
}
.content .introduction .introduction-box .text{
  margin-top: 39px;
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:24px;
}
</style>

