<!--
 * @author userjustdoit
 * @des   粒子计数器
 -->
<template>
    <div class="container">
      <canvas-template class="canvasbg" ref='canvasRef' :canvasLayers="2" @draw="draw"></canvas-template>
    </div>
</template>

<script>
  import CanvasTemplate from '@/components/CanvasTemplate';
  import Constans from '@/base/constans.js';

  let Gravity = 9.8;//重力加速度

  function Particle(x,y,color,state) {
    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;
    this.radius=8;

    this.visible = true;
    this.color = color;
    this.state=state;
  }

  let pp = Particle.prototype;

  pp.randomInitSpeed= function(){
    let vx = Math.random() * 15 + 20
    let vy = -Math.random() * 50 + 10;
    this.vx = Math.random() >= 0.5 ? -vx : vx;
    this.vy = vy;
  }

  pp.update= function(timePast,HMax){//timePast经过了多少时间s
     if(this.visible){
       this.x += this.vx * timePast;
       this.y += this.vy * timePast;

       var vy = this.vy + Gravity * timePast;

       if (this.y >= HMax - this.radius) {
         this.y = HMax - this.radius;
         vy = -vy * 0.8;
       }
       this.vy = vy;

       if (this.x < -this.radius || this.x > 750 + this.radius) {
          this.visible = false;
       }
     }
  }

  export default {
        name: "ParticleClock",
        components: {CanvasTemplate},
        data() {
            return {
              num:3,
              numData:[
                "1111/1001/1001/1001/1001/1001/1111", //0
                "0001/0001/0001/0001/0001/0001/0001", //1
                "1111/0001/0001/1111/1000/1000/1111", //2
                "1111/0001/0001/1111/0001/0001/1111", //3
                "1001/1001/1001/1111/0001/0001/0001", //4
                "1111/1000/1000/1111/0001/0001/1111", //5
                "1111/1000/1000/1111/1001/1001/1111", //6
                "1111/0001/0001/0001/0001/0001/0001", //7
                "1111/1001/1001/1111/1001/1001/1111", //8
                "1111/1001/1001/1111/0001/0001/1111", //9
                "0000/0000/0000/0000/0000/0000/0000" //空白
              ],
              marginH:10,//每个球的横向间距
              marginV:12,//每个球的纵向间距
              radius:8,//每个球的半径
              bgParticles:null,
              dropParticles:[],
              particleDropTimer:null,//小球掉落的timer
              updateNumberTimer:null,//更新数字的timer
              hPctAll:0,//h方向的总pct
              start:{x:0,y:0},//当前效果开始点
              oldStart:null,//旧的效果开始点
              num:0,
            };
        },
        methods: {
          draw(ctxs){
            this.hPctAll=this.getHPct();
            this.initWordInfo();

            this.fixBallLocal(this.bgParticles);

            if(!this.updateNumberTimer){
               this.updateNumber(ctxs[0]);
            }
            this.drawBgBall(ctxs[0]);
            this.fixBallLocal(this.dropParticles);
            if(!this.particleDropTimer){
               //this.dropParticles=this.getParticles(1);
               this.drawDropBallAni(ctxs[1]);
            }
          },
          updateNumber(ctx){
            let bgParticles=this.getParticles(this.num);
            bgParticles.forEach((particle,index)=>{
              if(this.bgParticles){
                if(particle.state=='0'&&this.bgParticles[index].state=='1'){
                  this.dropParticles.push(this.bgParticles[index]);
                }
              }
            });
            this.bgParticles=this.getParticles(this.num);
            this.num=++this.num%10;
            this.drawBgBall(ctx);
            this.updateNumberTimer=setTimeout(() => {
              this.updateNumber(ctx);
            }, 1000)
          },
          clearAll(ctx){
            ctx.save();
            ctx.scale(Constans.definition,Constans.definition);
            ctx.clearRect(0, 0, this.toPx(750), this.toPx( this.hPctAll));
            ctx.restore();
          },
          initWordInfo(){//初始化世界信息
            let numData=this.numData[0];
            let numRows=numData.split("/");
            let singleRowBalls=numRows[0].length;
            let singleColumnBalls=numRows.length;
            let numWidth=singleRowBalls*2*this.radius+(singleRowBalls-1)*this.marginH;
            let numHeight=singleColumnBalls*2*this.radius+(singleColumnBalls-1)*this.marginV;
            let startX=750/2-numWidth/2;//居中
            let startY= this.hPctAll/2-numHeight/2;//居中
            if(!this.oldStart){
              this.oldStart={};
              this.oldStart.x=startX;
              this.oldStart.y=startY;
            }else{
              this.oldStart.x=this.start.x;
              this.oldStart.y=this.start.y;
            }
            this.start.x=startX;
            this.start.y=startY;
          },
          fixBallLocal(particles){//保证窗口变化后小球的形态不变--相对位置
             if(particles){
               let xFix=this.start.x-this.oldStart.x;
               let yFix=this.start.y-this.oldStart.y;
               particles.forEach((particle)=>{
                    particle.x=particle.x+xFix;
                    particle.y=particle.y+yFix;
               });
             }
          },
          getParticles(num){
            let particles=[];
            let numData=this.numData[num];
            let numRows=numData.split("/");

            for(let i=0;i<numRows.length;++i){
               let rowStr=numRows[i];
               for (var j = 0; j < rowStr.length; j++) {
                 let ballState = rowStr.charAt(j);
                 let ballX=this.start.x+j*(this.radius*2+this.marginH)+this.radius;
                 let ballY=this.start.y+i*(this.radius*2+this.marginV)+this.radius;
                 let color=ballState=='1'?'#279548':'#ffffff';
                 let particle=new Particle(ballX,ballY,color,ballState);
                 particle.randomInitSpeed();
                 particles.push(particle);
               }
            }
            return particles;
          },
          drawDropBallAni(ctx){
            this.drawDropBall(ctx);
            this.particleDropTimer=this.RAF(()=>{
              this.drawDropBallAni(ctx)
            });
          },
          drawBgBall(ctx){
            this.clearAll(ctx);
            this.bgParticles.forEach((particle)=>{
              this.drawParticles(ctx,particle);
            });
          },
          drawDropBall(ctx){
            this.clearAll(ctx);
            this.dropParticles.forEach((particle,index)=>{
              particle.update(1 / 10, this.hPctAll);
              if(particle.visible){
                this.drawParticles(ctx,particle);
              }else{
                this.dropParticles.splice(index,1);
              }
            });
          },
          drawParticles(ctx,particle){
            ctx.save();
            ctx.scale(Constans.definition,Constans.definition);
            ctx.beginPath();
            ctx.arc(this.toPx(particle.x), this.toPx(particle.y), this.toPx(particle.radius), 0, 2 * Math.PI);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.restore();
          }
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
