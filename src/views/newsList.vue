<template>
  <div class="container">
    <div class="line"></div>
    <div class="content">
        <div class="bread">
          <span>当前位置：</span>
          <a-breadcrumb separator=">">
            <a-breadcrumb-item href="">首页</a-breadcrumb-item>
            <a-breadcrumb-item href="">资讯列表</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <ul class="list">
          <li v-for="item in 8">
            <b class="list-title">国家品牌，让生活更美好</b>
            <p class="list-desc">由北京市产品质量监督检验院（国家纺织及皮革产品质量监督检验中心）承办的"北京市纺织服装产品质量工作会暨产品质量管控培训会"，于3月7日下午3点在北京阳光丽城温泉度假酒店正式召开，FDC面料图书馆作为特邀媒体参加此次会议并持续报道。</p>
            <span class="list-date">
              <span>发布日期：2019/5/13 14:47:13</span>
              <span>阅读量：132</span>
              <button type="button">查看详情</button>
            </span>
          </li>
        </ul>
        <a-pagination showQuickJumper :defaultCurrent="1" :total="200" @change="onChange"/>
    </div>
  </div>
</template>
<script>
export default {
    name: 'NewsList',
  	data () {
	    return {

	    }
  	},
  	methods: {
      onChange(pageNumber) {
        console.log('Page: ', pageNumber);
      },
  	},
  	mounted(){
     // console.log(this.$route.params.id);
  	}
}
</script>
<style scoped>
ul{
  padding: 0;
  margin: 0;
}
li{
  list-style: none;
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
.bread >>>.ant-breadcrumb-separator {
  margin: 0 2px;
  color: rgba(0, 0, 0, 0.45);
}
.bread >>>.ant-breadcrumb a {
  color:rgba(51,51,51,1);
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
}
.content .list{
  margin-top: 56px;
}
.content .list li{
  padding: 43px 0;
  border-bottom:1px solid rgba(217,217,217,1);
}
.content .list-title{
  font-size:20px;
  color:rgba(51,51,51,1);
  line-height:20px;
}
.content .list-desc{
  margin: 19px 0px 10px 0px;
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:24px;
}
.content .list-date{
  width: 100%;
  display: inline-block;
  position: relative;
}
.content .list-date span{
  font-size:14px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:14px;
}
.content .list-date span:first-child{
  margin-right: 16px;
}
.content .list-date button{
  position: absolute;
  top: -16px;
  right: 18px;
  width:88px;
  height:32px;
  background:rgba(35,0,168,1);
  font-size:14px;
  color:rgba(255,255,255,1);
  border: 0;
}
.content .ant-pagination{
  margin-top: 120px;
  text-align: center;
}
.content >>> .ant-pagination .ant-pagination-item-active {
  background: rgba(35,0,168,1);
  border-color: rgba(35,0,168,1);
}
.content >>> .ant-pagination .ant-pagination-item-active a{
  color: #fff;
}
</style>

