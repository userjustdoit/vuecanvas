<!--
 * @author userjustdoit
 * @des   橡皮檫效果
 -->
<template>
    <div class="container">
      <canvas-template class="canvasbg" ref='canvasRef' @draw="draw"></canvas-template>
    </div>
</template>

<script>
  import CanvasTemplate from '@/components/CanvasTemplate';
  import Constans from '@/base/constans.js';

    export default {
        name: "Clip",
        components: {CanvasTemplate},
        data() {
            return {
              hPctAll:0,//h方向的总pct
              img:null,
              isMoving:false,
            };
        },

        methods: {
          draw(ctx,canvasElements){
            this.hPctAll=this.getHPct();
            if(!this.img){
              var img = new Image();
              img.src = this.getImageUrl("pic2.jpg");
              img.onload = ()=>{
                this.img=img;
                this.startListen(ctx,canvasElements);
                this.drawCoverImage(ctx);
              }
            }else{
               this.drawCoverImage(ctx);
            }
          },
          drawCoverImage(ctx){
             if(this.img){
                 this.clearAll(ctx);
                 ctx.save();
                 ctx.scale(Constans.definition,Constans.definition);
                 ctx.drawImage(this.img,0,0,this.toPx(750),this.toPx(this.hPctAll));
                 ctx.restore();
             }
          },
          getEventPoint(e,hastouch){
            let point={
              x:hastouch?e.targetTouches[0].pageX:e.clientX,
              y: hastouch?e.targetTouches[0].pageY:e.clientY-60
            }
            return point;
          },
          startListen(ctx,canvasElements){
            let hastouch = "ontouchstart" in window?true:false,
              tapstart = hastouch?"touchstart":"mousedown",
              tapmove = hastouch?"touchmove":"mousemove",
              tapend = hastouch?"touchend":"mouseup";

              canvasElements.addEventListener(tapstart, (e)=>{
                e.preventDefault();
                this.isMoving=true;
                let point=this.getEventPoint(e,hastouch);
                this.clip(ctx,point);
              });
              canvasElements.addEventListener(tapmove , (e)=>{
                e.preventDefault();
                if(this.isMoving){
                   let point=this.getEventPoint(e,hastouch);
                   this.clip(ctx,point);
                }
              });
              canvasElements.addEventListener(tapend,(e)=>{
                e.preventDefault();
                let point=this.getEventPoint(e,hastouch);
                this.clip(ctx,point);
                this.isMoving=false;
              });
          },
          clip(ctx,point){
            //console.log(x1+'  ----  '+y1);
            ctx.save();
            ctx.scale(Constans.definition,Constans.definition);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = 60;
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath()
            ctx.arc(point.x,point.y,10,0,2*Math.PI);
            ctx.fill();
            ctx.restore();
          },
          clearAll(ctx){
            ctx.save();
            ctx.scale(Constans.definition,Constans.definition);
            ctx.clearRect(0, 0, this.toPx(750), this.toPx( this.hPctAll));
            ctx.restore();
          },
        },
        computed: {},
    }
</script>

<style scoped>
  .container{
    margin-top: 60px;
  }
  .canvasbg{
    background-color: #cccccc;
  }
</style>
