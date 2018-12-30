<!--
 * @author userjustdoit
 * @des  三角化测试
 -->
<template>
    <div class="container">
        <canvas-template ref='canvasRef' @draw="draw"></canvas-template>
    </div>
</template>

<script>
    import CanvasTemplate from '@/components/CanvasTemplate';
    import Constans from '@/base/constans.js';
    import Delaunay from '@/base/util/delaunay.js';
    export default {
        name: "DelaunayTest",
        components: {CanvasTemplate},
        data() {
            return {
                img:null,
                hPctAll:0,//h方向的总pct
            };
        },
        methods: {
            draw(ctx){
                this.hPctAll=this.getHPct()
                if(!this.img){
                    var img = new Image();
                    img.src = this.getImageUrl("pic2.jpg");
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
                    //ctx.drawImage(this.img,0,0,this.toPx(750),this.toPx(this.hPctAll));

                    let vertices = new Array(1024);

                    for(let i=0,x,y;i<vertices.length;++i){
                        do {
                            x = Math.random() - 0.5;
                            y = Math.random() - 0.5;
                        } while(x * x + y * y > 0.25);//分布在半径为1/2的圆内的点集合-0.5是为了优化随机效率
                        x = (x * 0.96875 + 0.5) * 750;
                        y = (y * 0.96875 + 0.5) * this.hPctAll;//这里避免超出屏幕范围没有使用750导致最终画出的不是圆形
                        vertices[i] = [this.toPx(x), this.toPx(y)];
                    }
                    console.time("triangulate");
                    let triangles = Delaunay.triangulate(vertices);
                    console.timeEnd("triangulate");
                    for(let i=0;i<triangles.length;i=i+3){//连续的3个点确定一个Delaunay三角形
                        ctx.beginPath();
                        ctx.moveTo(vertices[triangles[i]][0], vertices[triangles[i]][1]);
                        ctx.lineTo(vertices[triangles[i+1]][0], vertices[triangles[i+1]][1]);
                        ctx.lineTo(vertices[triangles[i+2]][0], vertices[triangles[i+2]][1]);
                        ctx.closePath();
                        ctx.stroke();
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
