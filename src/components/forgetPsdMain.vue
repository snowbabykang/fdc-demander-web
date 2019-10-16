<template>
  <div id="demand-layout">
    <a-layout>
      <a-layout-header> <psd-header></psd-header> </a-layout-header>
      <a-layout-content><router-view/></a-layout-content>
      <a-layout-footer> <Footer></Footer> </a-layout-footer> 
    </a-layout>
  </div>
</template>
<script>
import psdHeader from '../components/forgetPsdHeader'
import Footer from '../components/footer'
export default {
  name: 'forgetPadMain',
  data() {
    return {

    }
  },
  components: {
    psdHeader,Footer,
  }
}

</script>
<style scoped>
#demand-layout .ant-layout{
  background: #fff;
}
#demand-layout .ant-layout-header {
  padding: 0;
  background:#F0EFF0;
  height: 0.42rem;
  line-height: 0.42rem;
}
#demand-layout .ant-layout-content{
    padding-top: 0.59rem;
    padding-bottom: 1.94rem;
    width: 4rem;
    margin: 0 auto;
}
#demand-layout .ant-layout-footer {
  padding: 0;
}
</style>
