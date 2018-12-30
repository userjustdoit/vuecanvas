<!--
 * @author userjustdoit
 * @des   数字计数器
 -->
<template>
    <div class="container">
       <canvas-template ref='canvasRef' @draw="draw"></canvas-template>
    </div>
</template>

<script>
   import CanvasTemplate from '@/components/CanvasTemplate';
   import Constans from '@/base/constans.js';

   function Line(pos1, pos2,increase) {
     this.pos1 = pos1;//起点
     this.pos2 = pos2;//终点
     this.times = 20;
     this.ppos = [//每次变化的步长
       (pos2[0] - pos1[0]) / this.times,
       (pos2[1] - pos1[1]) / this.times,
     ];
     this.increase = increase?1:-1;//是否为增长的线+1,否则为缩减-1
     this.addPos=[(this.increase)*this.ppos[0],(this.increase)*this.ppos[1]];//实际每步的坐标变化量
     this.movingPos = increase?pos1:pos2;//当前的移动点位置··根据增大缩小配置移动点的初始点
     this.endPoint=this.increase>0?this.pos2:this.pos1;//线段绘制的最终点；
   }

   let lp = Line.prototype;

   lp.update = function() {
       let movingPosX=this.movingPos[0]+this.addPos[0];
       if(this.addPos[0]>0){//x实际增大时不能比最终点x大
         movingPosX=movingPosX>this.endPoint[0]?this.endPoint[0]:movingPosX;
       }else{//x实际减小时不能比最终点x小
         movingPosX=movingPosX<this.endPoint[0]?this.endPoint[0]:movingPosX;
       }
       let movingPosY=this.movingPos[1]+this.addPos[1];
       if(this.addPos[1]>0){//y变大
         movingPosY=movingPosY>this.endPoint[1]?this.endPoint[1]:movingPosY;
       }else{//y变小
         movingPosY=movingPosY<this.endPoint[1]?this.endPoint[1]:movingPosY;
       }
       this.movingPos=[movingPosX,movingPosY];
   };

   export default {
        name: "CoolClock",
        components: {CanvasTemplate},
        data() {
            return {
              num:3,
              numMap:{
                0: '1110111',
                1: '1000100',
                2: '0111110',
                3: '0111011',
                4: '1011001',
                5: '1101011',
                6: '1101111',
                7: '0110001',
                8: '1111111',
                9: '1111011',
              },
              updateNumberTimer:null,//数字切换timer
              drawNumberRaf:null,//动画显示timer
              lines:[],
              hPctAll:0,//h方向的总pct
            };
        },
        methods: {
          draw(ctx){
            this.hPctAll=this.getHPct()
            if(!this.updateNumberTimer){
                this.updateNumber();
            }
            this.lines=[];//优化窗口缩放的变化
            if(!this.drawNumberRaf){
                this.drawNumberAni(ctx);
            }
          },
          drawNumberAni(ctx){
              this.drawNumber(ctx);
              this.drawNumberRaf=this.RAF(()=>{
                this.drawNumberAni(ctx)
              });
          },
          updateNumber(){
            this.updateNumberTimer=setTimeout(() => {
              this.lines=this.getNumberLines(this.num);
              this.num=++this.num%10;
              this.updateNumber();
            }, 1000)
          },
          clearAll(ctx){
            ctx.save();
            ctx.scale(Constans.definition,Constans.definition);
            ctx.clearRect(0, 0, this.toPx(750), this.toPx(this.hPctAll));
            ctx.restore();
          },
          drawNumber(ctx){
            this.clearAll(ctx);
            this.lines.forEach((line)=>{
                this.drawLine(ctx,line);
            });
          },
          getNumberLines(number){//获取数字的线条表示
            let lines=[];

            let lineWidthX=70;
            let startX=750/2-lineWidthX/2;//居中

            let lineWidthY=lineWidthX;
            let startY=this.hPctAll/2-lineWidthY;//居中

            let coors = [
              [startX , startY+lineWidthY],
              [startX , startY],
              [startX + lineWidthX, startY],
              [startX + lineWidthX, startY+lineWidthY],
              [startX , startY+lineWidthY],
              [startX , startY+lineWidthY*2],
              [startX + lineWidthX, startY+lineWidthY*2],
              [startX + lineWidthX, startY+lineWidthY],
            ];

            let map = this.numMap[number];
            for (let z = 0; z < map.length; z++) {
              let coor = coors[z+1];
              if (map[z] === '1') {
                lines.push(new Line(coors[z], coors[z+1],true));
              }else{
                lines.push(new Line(coors[z],coors[z+1],false));
              }
            }
            return lines;
          },
          drawLine(ctx,line){//绘制线条
            ctx.save();
            ctx.scale(Constans.definition,Constans.definition);
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(this.toPx(line.pos1[0]), this.toPx(line.pos1[1]));
            ctx.lineTo(this.toPx(line.movingPos[0]), this.toPx(line.movingPos[1]));
            ctx.stroke();
            ctx.restore();
            line.update();
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
