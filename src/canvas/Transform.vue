<!--
 * @author userjustdoit
 * @des  图片拉伸
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
        name: "Transform",
        components: {CanvasTemplate},
        data() {
            return {
                hPctAll:0,//h方向的总pct
            };
        },
        methods: {
            draw(ctx){
                this.hPctAll=this.getHPct()
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