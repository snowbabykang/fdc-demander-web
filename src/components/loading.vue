<template>
  <div class="loadingbox">
    <a-spin size="large" />
  </div>
</template>
<script>
export default {
  name: 'loading',
    props: {
        visible: { type: Boolean, default: true },
    },
    data() {
        return {
           testurl : '',
           c:6,
        };
    },
    computed:{
        isvisible:{
          get:function(){
            return this.visible;
          }
        }
    },
    methods: {

    },
}
</script>
<style scoped>
.loadingbox{
  position : absolute;
  background: #fff;
  height: 500px; 
  left: 0; 
  right: 0; 
  z-index: 100;
}
.ant-spin{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 101;
}
</style>
