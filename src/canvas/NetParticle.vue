<!--
 * @author userjustdoit
 * @des  网络粒子
 -->
<template>
  <div class="container">
    <canvas-template ref='canvasRef' @draw="draw"></canvas-template>
  </div>
</template>

<script>
  import CanvasTemplate from '@/components/CanvasTemplate';
  import Constans from '@/base/constans.js';
  export default {
    name: "NetParticle",
    components: {CanvasTemplate},
    data() {
      return {
        hPctAll:0,//h方向的总pct
        dots:null,
        warea:{x: null, y: null, max: 20000},
        width:0,
        height:0,
      };
    },
    methods: {
      draw(ctx){
        this.hPctAll=this.getHPct();
        this.width=this.getCanvasRef().width*Constans.definition;
        this.height=this.getCanvasRef().height*Constans.definition;
        if(!this.dots){
          this.initDots();
          this.drawNetParticleAni(ctx);
        }else{
          this.clearAll(ctx);
          this.initDots();
        }
      },
      initDots(){
        let dots=[];
        for (let i = 0; i < 300; i++) {
          let x = Math.random() * this.width;
          let y = Math.random() * this.height;
          let xa = Math.random() * 8 - 5;
          let ya = Math.random() * 8 - 5;
          dots.push({
            x: x,
            y: y,
            xa: xa,
            ya: ya,
            max: 12000
          })
        }
        this.dots=dots;
      },
      drawNetParticleAni(ctx){
        this.drawNetParticle(ctx)
        this.RAF(()=>{
          this.drawNetParticleAni(ctx)
        });
      },
      drawNetParticle(ctx){
        this.clearAll(ctx);

        console.time("triangulate");
        let ndots = [this.warea].concat(this.dots);

        this.dots.forEach((dot,index)=>{
          // 粒子位移
          dot.x += dot.xa;
          dot.y += dot.ya;

          // 遇到边界将加速度反向
          dot.xa *= (dot.x > this.width|| dot.x < 0) ? -1 : 1;
          dot.ya *= (dot.y > this.height || dot.y < 0) ? -1 : 1;

          this.drawDot(dot,ctx);

          // 循环比对粒子间的距离
          for (let i = 0; i < ndots.length; i++) {
            let d2 = ndots[i];
            if (dot === d2 || d2.x === null || d2.y === null) continue;

            let xc = dot.x - d2.x;
            let yc = dot.y - d2.y;

            // 两个粒子之间的距离
            let dis = xc * xc + yc * yc;

            // 距离比
            var ratio;

            // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
            if (dis < d2.max) {

              // 计算距离比
              ratio = (d2.max - dis) / d2.max;
              this.drawRelation(dot,d2,ratio,ctx);
            }

          }
          ndots.splice(index, 1);
        });
        //console.timeEnd("triangulate");
      },
      drawRelation(dot1,dot2,ratio,ctx){
        ctx.save();
        // 画线
        ctx.beginPath();
        ctx.lineWidth = ratio / 2;
        ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
        ctx.moveTo(dot1.x, dot1.y);
        ctx.lineTo(dot2.x, dot2.y);
        ctx.stroke();

        ctx.restore();
      },
      drawDot(dot,ctx){
        ctx.save();
        // 绘制点
        ctx.fillRect(dot.x - 1, dot.y - 1, 2, 2);
        ctx.restore();
      },
      clearAll(ctx){
        ctx.save();
        ctx.scale(Constans.definition,Constans.definition);
        ctx.clearRect(0, 0, this.toPx(750), this.toPx(this.hPctAll));
        ctx.restore();
      },
      getCanvasRef(){
        return this.$refs.canvasRef;
      }
    },
    computed: {},
  }
</script>

<style scoped>
  .container{
    margin-top: 60px;
  }
</style>
