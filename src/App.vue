<template>
  <a-locale-provider :locale="zh_CN">
    <div id="app">
      <transition name="fade" mode="out-in">
        	<router-view v-if="isRouterAlive"></router-view>
      </transition>
    </div>
  </a-locale-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';
  moment.locale('zh-cn');
	export default {
  		name: 'App',
  		provide(){
  			return{
  				reload : this.reload
  			}
  		},
  		data() {
  			return {
          zh_CN,
  	      isRouterAlive : true,
  			}
  		},
  		methods : {
  			reload(){
  				this.isRouterAlive = false;
          		this.$nextTick(function(){
          			this.isRouterAlive = true;
          		})
  			}
      },
      mounted(){
        if (sessionStorage.getItem("store")) {
          this.$store.replaceState(
            Object.assign(
              {},
              this.$store.state,
              JSON.parse(sessionStorage.getItem("store"))
            )
          );
          sessionStorage.removeItem("store");
        }
        window.addEventListener("beforeunload", () => {
          sessionStorage.setItem("store", JSON.stringify(this.$store.state));
        });
      }
	}
</script>


<style>
#app {
  font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif,"Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
}
</style>

