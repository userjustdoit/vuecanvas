<!--
 * @author userjustdoit
 * @des   封装的1.支持自适应宽高2.多层的canvas支持 3.清晰度支持的canvas模板
 -->
<template>
  <div :class="showDebugBorder?['root','border']:['root']" :style="{width:width+'px',height:height+'px'}">
    <div class="canvPanel" :style="{zoom:1/definition}" v-for="i in canvasLayers">
      <canvas
        :id="`canvas${i}`"
        class="canvas"
        :width="width*definition"
        :height="height*definition"
      >
        你的浏览器不支持canvas,请升级你的浏览器
      </canvas>
    </div>
  </div>
</template>

<script>
  import Constans from '@/base/constans.js'

  export default {
    name: "ScrapeCard",
    props: {
      height2: {//自定义的canvas高度
        type: Function,
        default: Constans.defaultHeight,
      },
      width2: {//自定义的canvas宽度
        type: Function,
        default: Constans.defaultWidth,
      },
      showDebugBorder: {//是否显示顶层面板的边框(方便调试)
        type: Boolean,
        default: true,
      },
      canvasLayers: {//cnavas的层数,应用于canvas分层的应用,注意:为方便使用1层时直接以对象返回了画笔
        type: Number,
        default: 1,
      },
      autoResize: {//是否支持浏览器resize操作,默认支持
        type: Boolean,
        default: true,
      }
    },
    components: {},
    data() {
      return {
        context2d: null,
        canvasElements:null,
        definition: Constans.definition,//清晰度
        width: 0,
        height: 0,
      };
    },
    mounted() {
      this.canvasSizeDel();
      this.startHandel();
      if (this.autoResize) {
        this.onResize();
      }
    },
    methods: {
      onResize() {
        window.onresize = () => {
          window.screenWidth = document.body.clientWidth;
          this.canvasSizeDel();
          setTimeout(() => {// 等待 canvas 变换好，再延时绘制，不然可能会没有内容
            this.draw();
          }, 50)
        }
      },
      canvasSizeDel() {
        this.width = this.width2();
        this.height = this.height2();
      },
      init() {
        let context2ds = [];
        let canvasElements=[];
        for (let i = 0; i < this.canvasLayers; ++i) {
          let canvas = document.querySelector(`#canvas${i + 1}`)
          let element=document.getElementById(`canvas${i + 1}`);
          if (canvas.getContext) {
            context2ds.push(canvas.getContext('2d'))
            canvasElements.push(element);
          }
        }
        this.context2d = context2ds;
        this.canvasElements = canvasElements;
      },
      startHandel() {
        this.init();
        if (this.context2d) {
          setTimeout(() => {
            this.draw();
          }, 50)
        }
      },
      draw() {
        let context2d = this.context2d.length == 1 ? this.context2d[0] : this.context2d;
        let canvasElements = this.canvasElements.length == 1 ? this.canvasElements[0] : this.canvasElements;
        this.$emit('draw', context2d,canvasElements);
      },
    },
    computed: {},
  }
</script>

<style scoped>
  .root {
    overflow: hidden;
    position: relative;
  }

  .border {
    border: 1px solid #585858;
  }

  .canvas {
    display: block;
  }

  .canvPanel {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
