<!--
 * @author userjustdoit
 * @des   图片三角化（图片需为JPG或者PNG格式）
 -->
<template>
    <div class="container">
      <canvas-template ref='canvasRef' @draw="draw"></canvas-template>
    </div>
</template>

<script>
  import CanvasTemplate from '@/components/CanvasTemplate';
  import Constans from '@/base/constans.js';
  import Sobel from '@/base/util/sobel.js';
  import Delaunay from '@/base/util/delaunay.js';
    export default {
        name: "LowPoly",
        components: {CanvasTemplate},
        data() {
            return {
              hPctAll:0,//h方向的总pct
              img:null,
            };
        },
        methods: {
          draw(ctx){
            this.hPctAll=this.getHPct()
            if(!this.img){
              var img = new Image();
              img.src = this.getImageUrl("pic1.jpg");
              img.onload = ()=>{
                this.img=img;
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
              //注意:ctx.getImageData 不包含缩放关系
              var imgData = ctx.getImageData(0, 0, this.toPx(750)*Constans.definition, this.toPx(this.hPctAll)*Constans.definition);
              var collectors = [];
              Sobel.Sobel(imgData, (value, x, y)=>{
                 //collectors.push(value,value,value,255);
                 if (value > 240) {
                   //collectors.push(value,value,value,255);
                   collectors.push([x, y]);//绝对定位的x,y
                 }else{
                   //collectors.push(0,0,0,255);
                 }
               });

               let particles = [];

               let length = Math.floor(collectors.length / 50);
               //let length2 = ~~(collectors.length / 50);
               for (let l = 0,random; l < length; l++) {
                 random = (Math.random() * collectors.length) << 0;
                 particles.push(collectors[random]);
                 collectors.splice(random, 1);
               }

              for (var i = 0; i < 300; i++) {
                particles.push([Math.random() * this.toPx(750)*Constans.definition, Math.random() * this.toPx(this.hPctAll)*Constans.definition]);
              }

              particles.push([0, 0], [0, this.toPx(this.hPctAll)*Constans.definition], [this.toPx(750)*Constans.definition, 0], [this.toPx(750)*Constans.definition, this.toPx(this.hPctAll)*Constans.definition]);
              let vertices = particles;

               console.time("triangulate");
               let triangles = Delaunay.triangulate(vertices);
               console.timeEnd("triangulate");
               for(let i=0;i<triangles.length;i=i+3){//连续的3个点确定一个Delaunay三角形

                 let x1 = vertices[triangles[i]][0];
                 let x2 = vertices[triangles[i + 1]][0];
                 let x3 = vertices[triangles[i + 2]][0];
                 let y1 = vertices[triangles[i]][1];
                 let y2 = vertices[triangles[i + 1]][1];
                 let y3 = vertices[triangles[i + 2]][1];


                 //              获取三角形中心点坐标
                 let cx = ~~((x1 + x2 + x3) / 3);
                 let cy = ~~((y1 + y2 + y3) / 3);
 //              获取中心点坐标的颜色值
                 let index = (cy * imgData.width + cx) * 4;
                 let color_r = imgData.data[index];
                 let color_g = imgData.data[index + 1];
                 let color_b = imgData.data[index + 2];

                 ctx.save();
                 ctx.scale(1/Constans.definition,1/Constans.definition);
                 ctx.beginPath();
                 ctx.moveTo(x1, y1);
                 ctx.lineTo(x2, y2);
                 ctx.lineTo(x3, y3);
                 ctx.closePath();
                 //ctx.stroke();
                 ctx.fillStyle = "rgba(" + color_r + "," + color_g + "," + color_b + ",1)";
                 ctx.fill();
                 ctx.restore();
               }
              ctx.restore();
            }
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
