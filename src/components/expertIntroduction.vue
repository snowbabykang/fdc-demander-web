<template>
  <ul class="expert">
    <li class="expert-item" v-for="(item,index) in data" :key="index">
      <img :src="item.url" alt="">
      <div class="expert-box">
        <span><b>{{item.professorName}}</b></span>
        <a-divider dashed />
        <p>{{item.description}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
import {getProfessor} from '@/service/getData'
export default {
  name: 'expertIntroduction',
  data(){
    return{
       data: ''
    }
  },
  methods:{
    getProfessorInfo(orgId){
      getProfessor(orgId).then((res) =>{
        if(res && res.code == 200){
          if(res.data){
            this.data = res.data;
          }
        }
      })
    }
  },
  mounted(){
    this.getProfessorInfo(this.$store.getters.getOrgId);
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
.expert{
  width: 1151px;
}
.expert-item{
  width: 100%;
  height: 250px;
  margin-bottom: 21px;
  background:rgba(243,243,243,1);
  display: flex;
}
.expert-item:last-child{
  margin-bottom: 0;
}
.expert-item img{
  width:200px;
  height:250px;
}
.expert-box{
  flex: 1;
}
.expert-box{
  padding: 14px 27px;
}
.expert-box p{
  height: 172px;
  overflow: hidden;
}
.expert-box span{
  font-size:22px;
  color:rgba(51,51,51,1);
}
.expert-box >>> .ant-divider{
  margin: 12px 0;
}
.ant-divider-dashed{
  border-top: 1px dashed rgba(0,0,0,0.15);
}
</style>
