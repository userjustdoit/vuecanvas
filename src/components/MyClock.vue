<!--
 * @author userjustdoit
 * @des   canvas时钟
 -->
<template>
  <div class="root" :style="{width:width+'px',height:height+'px'}">
    <div class="canvPanel" :style="{zoom:1/definition}">
      <canvas
        id="dial"
        class="canvas"
        :width="width*definition"
        :height="height*definition"
      >
        你的浏览器不支持canvas,请升级你的浏览器
      </canvas>
    </div>
    <div class="canvPanel" :style="{zoom:1/definition}">
      <canvas
        id="time"
        class="canvas"
        :width="width*definition"
        :height="height*definition"
      >
      </canvas>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MyClock",
        components: {

        },
        data() {
            return {
              context2d:{
                'dial':null,
                'time':null,
              },
              definition:2,//清晰度
              width:document.body.clientWidth,
              height:400,
              clockWidth:0,
              startX:0,
              startY:0,
              setting:{//设置项
                clockWidthMax:300,//最大的表盘宽度
              },
            };
        },
        mounted(){

            this.startHandel();
            this.onResize();
        },
        methods: {
          onResize(){
            window.onresize = () => {
              window.screenWidth = document.body.clientWidth;
              this.width = window.screenWidth;
              setTimeout(()=>{// 等待 canvas 变换好，再延时绘制，不然可能会没有内容
                this.draw();
              }, 50)

            }
          },
          startHandel(){
            this.init();
            if(this.context2d.dial){
              this.draw();
            }
          },
          init(){
            let dial = document.querySelector('#dial')
            let time = document.querySelector('#time')
            if (dial.getContext){
              this.context2d.dial =dial.getContext('2d');
              this.context2d.time=time.getContext('2d');
            }
          },
          getParam(){//计算基本的参数
            //表盘在clockWidthMax的限制内选择最大的一条边;
            let maxSide=this.width>this.height?this.height:this.width;
            this.clockWidth=maxSide>this.setting.clockWidthMax?this.setting.clockWidthMax:maxSide;

            //计算起始作画区域的位置偏移
            let startX=(this.width-this.clockWidth)/2;
            let startY=(this.height-this.clockWidth)/2;
            this.startX=startX;
            this.startY=startY;
          },
          draw(){
            this.getParam();
            this.drawDial(this.context2d.dial);
            this.drawTime();
          },
          drawDial(ctx){
            ctx.save();
            ctx.scale(this.definition,this.definition);

            let pi = Math.PI;

            //ctx.clearRect(this.startX, this.startY, this.clockWidth, this.clockWidth); //清除所有内容

            ctx.translate(this.startX+this.clockWidth/2, this.startY+this.clockWidth/2); //一定坐标原点到原来的中心
            ctx.beginPath();
            ctx.arc(0, 0, this.clockWidth/2-2, 0, 2 * pi); //绘制圆周
            ctx.stroke();
            ctx.closePath();

            for (let i = 0; i < 60; i++){//绘制刻度。
              ctx.save();
              ctx.rotate(-pi / 2 + i * pi / 30);  //旋转坐标轴。坐标轴x的正方形从 向上开始算起
              ctx.beginPath();
              ctx.moveTo(this.clockWidth/2-40, 0);
              ctx.lineTo(this.clockWidth/2-10, 0);
              ctx.lineWidth = i % 5 ? 2 : 4;
              ctx.strokeStyle = i % 5 ? "blue" : "red";
              ctx.stroke();
              ctx.closePath();
              ctx.restore();
            }
            ctx.restore();
          },
          drawTime(){
            let ctx=this.context2d.time;

            ctx.save();
            ctx.scale(this.definition,this.definition);
            ctx.clearRect(this.startX, this.startY, this.clockWidth, this.clockWidth); //清除所有内容
            let time = new Date();
            let s = time.getSeconds();
            let m = time.getMinutes();
            let h = time.getHours();

            let pi = Math.PI;
            let secondAngle = pi / 30 * s;  //计算出来s针的弧度
            let minuteAngle = pi / 30 * m + secondAngle / 60;  //计算出来分针的弧度
            let hourAngle = pi / 6 * h + minuteAngle / 12;  //计算出来时针的弧度
            this.drawHand(hourAngle, this.clockWidth/2-90, 6, "red", ctx);  //绘制时针
            this.drawHand(minuteAngle, this.clockWidth/2-44, 4, "green", ctx);  //绘制分针
            this.drawHand(secondAngle, this.clockWidth/2-21, 2, "blue", ctx);  //绘制秒针

            ctx.restore();
            requestAnimationFrame(this.drawTime);
          },
          drawHand(angle, len, width, color,ctx){
            ctx.save();
            ctx.translate(this.startX+this.clockWidth/2, this.startY+this.clockWidth/2); //一定坐标原点到原来的中心
            ctx.rotate(-Math.PI / 2 + angle);  //旋转坐标轴。 x轴就是针的角度
            ctx.beginPath();
            ctx.moveTo(-4, 0);
            ctx.lineTo(len, 0);  // 沿着x轴绘制针
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.lineCap = "round";
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
          },
        },
        computed: {

        },
    }
</script>

<style scoped>
  .root{
    border: 1px solid #585858;
    overflow: hidden;
    position: relative;
  }
  .canvas{
    display: block;
  }
  .canvPanel{
    position:absolute;
    top:0px;
    left:0px;
  }
</style>
