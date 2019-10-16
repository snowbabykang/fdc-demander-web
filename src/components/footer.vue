<template>
    <section class="layout-footer">
        <div class="footer-con-box">
            <div class="company-logo"><img src="static/common-img/footerlogo.png" class="test-img" /></div>
            <div class="company-info">
                <div class="alink-list">
                    <a target="_blank" href="https://www.fdcfabric.com/About_us.html">关于我们</a>
                    <a target="_blank" href="https://www.fdcfabric.com/Borrowing_fabric.html">借阅面料</a>
                    <a target="_blank" href="">合作伙伴</a>
                    <a target="_blank" href="https://www.fdcfabric.com/Contact_us.html">联系我们</a>
                    <a target="_blank" href="https://www.fdcfabric.com/Site_map.html">网站地图</a>
                    <a target="_blank" href="https://www.fdcfabric.com/FDC-Notices.html">法律及隐私声明</a>
                </div>
                <div class="copyright-info">版权所有 北京美轮科技有限公司</div>
                <div class="record-info">ICP备案证书号: 京ICP备15057605号 <img src="static/common-img/record.png" class="test-img" />京公网安备 11010802020529号</div>
            </div>
            <div class="clearfix"></div>
        </div>
    </section>
</template>
<script>
export default {
  name: 'Footer',
    data() {
        return {
            
        };
    },
};
</script>
<style type="text/css" scoped>
.layout-footer{
    background: #333;
    padding: 63px 0 61px 0;
}

.footer-con-box{
    margin:0 auto;
    width: 4.8rem;
}
.company-logo{
    text-align: right;
    float: left;
}
.company-logo img{
    width: 1.76rem;
}
.company-info{
    margin-top: 0.15rem;
    line-height: 0.1rem;
    color: #fff;
    text-align: center;
    float: left;
    margin-left: 0.09rem;
}
.company-info img{
    vertical-align: bottom;
    padding: 0.02rem 0.03rem 0.02rem 0.02rem;
}
.alink-list a{
    font-weight: 500;
    color: #fff;
    padding: 0 0.02rem 0 0;
}
.copyright-info{
    font-size: 0.06rem;
    margin: 0.07rem 0;
}
.record-info{
    font-size: 0.06rem;
}
</style>