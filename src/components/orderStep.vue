<template>
    <section class="steplist">
        <div class="step-item" v-for="(item,index) in steplist" :key="item.id"
             v-bind:class="{'active' : current == item.id, 'actived' : current > item.id}"
        >
            <div class="step-icon">
                <div class="step-block"><i :class="item.icon"></i></div>
                <div class="step-divider" v-if="index !== 7"></div>
            </div>
            <div class="step-description">
                <div>{{item.title}}</div>
                <div class="time">{{item.time}}</div>
            </div>
        </div>
        <div class="clearfix"></div>
    </section>
</template>
<script>
export default {
    name: 'orderStep',
    props: ['currentStep','orderHistoryList'],
    data() {
        return {
            steplist : [
                {id : 1,icon : 'icon-orderstep1',title : '提交订单',time : ''},
                {id : 2,icon : 'icon-orderstep2',title : '已付款',time : ''},
                {id : 3,icon : 'icon-orderstep3',title : '已寄样',time : ''},
                {id : 4,icon : 'icon-orderstep4',title : '已收样',time : ''},
                {id : 5,icon : 'icon-orderstep5',title : '检测中',time : ''},
                {id : 6,icon : 'icon-orderstep6',title : '检测完成',time : ''},
                {id : 7,icon : 'icon-orderstep7',title : '待收货',time : ''},
                {id : 8,icon : 'icon-orderstep8',title : '已完成',time : ''},
            ],
        };
    },
    computed : {
        current(){
            return this.currentStep;
        },
        history(){
          return this.orderHistoryList;
        }
    },
    watch:{
      history:function(old,newd){
       if(old){
          for(let i=0; i<this.orderHistoryList.length; i++){
            this.steplist[i].time = this.orderHistoryList[i].createTime;
          }
       }
      }
    },
    mounted() {
      for(let i=0; i<this.orderHistoryList.length; i++){
        this.steplist[i].time = this.orderHistoryList[i].createTime;
      }
    },
};
</script>
<style scoped>
.steplist{
    width: 1080px;
    margin: 0 auto;
}
.step-item{
    float: left;
}
.step-item .step-icon{
    padding: 0 10px;
    height: 40px;
}
.step-item .step-block{
    width: 40px;
    height: 40px;
    background: transparent;
    text-align: center;
    display: inline-block;
    border-radius: 100%;
    overflow: hidden;
    line-height: 44px;
    margin-right: 10px;
    font-size: 20px;
    color: #666;
}
.step-item .step-divider{
    width: 70px;
    display: inline-block;
    border-top: 2px dotted #979797;
    vertical-align: top;
    margin-top: 20px;
    position: relative;
    color: #979797;
}
.step-item .step-divider:after{
    content : '>';
    position: absolute;
    top: -13px;
    right: -10px;
}
.step-item .step-description{
    color: #B7B7B7;
    margin-top: 30px;
    width: 74px;
    text-align: center;
    margin-left: -8px;
    font-weight: 500;
    color: #333;
    line-height: 1;
}
.step-item .time{
    display:none;
    font-size: 12px;
    font-weight: normal;
    padding-top: 10px;
    line-height: 16px;
}
.step-item.active .time,.step-item.actived .time{
    display:block;
}
</style>
<style lang="less" scoped>
.step-item.active .step-block{
    background: @primary-color;
    color: #fff;
}
.step-item.active .step-divider,.step-item.actived .step-divider{
    border-color: @primary-color;
    color: @primary-color;
}
.step-item.actived .step-block{
    color: @primary-color;
}
</style>
