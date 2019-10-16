<template>
  <div id="demand-layout" :class="nobg ? 'nowhitebg' : ''">
    <a-layout>
      <a-layout-header> <Header></Header> </a-layout-header>
      <a-layout-content><router-view class="contentbox"/></a-layout-content>
      <a-layout-footer> <Footer></Footer> </a-layout-footer> 
    </a-layout>
  </div>
</template>
<script>
import Header from '../components/header'
import Footer from '../components/footer'
export default {
  name: 'Main',
  data() {
    return {
        nobg : false,
    }
  },
  components: {
    Header,Footer,
  },
  watch: {
      $route(){
          console.log(this.$route.meta.nobg);
          this.nobg = this.$route.meta.nobg;
      },
      // courseid() {
      //     let that = this;
      //     this.getweekrules();
      // },
  },
  mounted(){
    this.nobg = this.$route.meta.nobg;
  }
}

</script>
<style scoped>
#demand-layout .ant-layout-header {
  padding: 0;
  height: auto;
  line-height: normal;
}
#demand-layout .ant-layout-content{
  background: #fff;
}
#demand-layout .ant-layout-content .contentbox{
  max-width: 1200px; 
  margin: 0 auto;
  padding-bottom: 113px;
}
#demand-layout .ant-layout-footer {
  padding: 0;
}
#demand-layout.nowhitebg .ant-layout-content{
  background: #F5F5F5;
}
</style>
