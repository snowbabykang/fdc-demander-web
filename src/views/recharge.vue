<template>
  <div>

  </div>
</template>
<script>

const div = document.createElement('div');

export default {
  data() {
        return {

        }
  },
  methods:{
     go(){
        div.innerHTML = this.$route.query.htmls;
        document.body.appendChild(div);
        document.forms[0].submit();
     }
  },
  mounted(){
    this.go();
  }
}
</script>
