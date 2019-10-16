<template>
  <section>
    <div class="content">
      <div v-if="storeInfo.storeIntroduce">
        <div class="title">企业简介</div>
        <p class="paragraph">{{storeInfo.storeIntroduce}}</p>
      </div>
      <div v-if="storeInfo.storeDetectionScope">
        <div class="detection">检测范围：</div>
        <p class="paragraph">{{storeInfo.storeDetectionScope}}</p>
      </div>
      <div class="richText" v-html="storeDetail">

      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'agencyPresentation',
  props: {
        storeInfo: '',
  },
  data() {
      return {
         store: this.storeInfo,
         storeDetail: ''
      };
  },
  computed : {

  },
  methods: {

  },
  mounted(){
    if(this.storeInfo.storeDetail){
      this.storeDetail = decodeURIComponent(this.storeInfo.storeDetail);
    }
  }

}
</script>
<style scoped>
.title{
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
}
.detection{
  margin-bottom: 10px;
  font-size: 14px;
}
.paragraph{
  line-height: 35px;
}
</style>
