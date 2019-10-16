<template>
  <div>
      <canvas id="canvas"></canvas>
  </div>
</template>
<script>
  import QRCode from 'qrcode'

	export default {
		data() {
			return {
				deafult : {
					size : 200,
					bgcolor : '#fff',   //color必须必bgcolor颜色重
					color : '#000',
					url : '',
					margin : 4,
					level : 'H',
				}
			}
		},
	 	props: ['size', 'bgcolor', 'color', 'url', 'margin', 'level'],
		methods: {
		    useqrcode(){
		    	let that = this;
		        var canvas = document.getElementById('canvas')
		        QRCode.toCanvas(canvas, that.url,{
		        	errorCorrectionLevel: that.level ? that.level : that.deafult.level,  //L, M, Q, H
		        	width: that.size ? that.size : that.deafult.size,
		        	height: that.size ? that.size : that.deafult.size,
		        	margin : that.margin ? that.margin : that.deafult.margin,  //默认4  计算在width中，值越大，空编越大，码越小
		        	scale :1,
		        	//dark color should always be darker than color.light
		        	color: {
					    dark: that.color ? that.color : that.deafult.color,  // code color
					    light: that.bgcolor ? that.bgcolor : that.deafult.bgcolor, // background
					  }
	        	 }, function (error) {
		          if (error) console.error(error);
		        })
		    }
		},
		mounted() {
		},
		watch: {
        size: function(){
          this.useqrcode()
        },
        bgcolor: function(){
          this.useqrcode()
        },
        color: function(){
          this.useqrcode()
        },
        url: function(){
          this.useqrcode()
        },
        margin: function(){
          this.useqrcode()
        },
        level: function(){
          this.useqrcode()
        },
    }
	}
</script>
