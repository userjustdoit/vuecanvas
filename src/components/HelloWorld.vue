<template>
  <div class="hello" :style="{width:width+'px',height:height+'px'}">
    <div class="canvPanel" :style="{zoom:1/definition}">
      <canvas
        id="canvas"
        class="fl"
        :width="width*definition"
        :height="height*definition"
      >
        你的浏览器不支持canvas,请升级你的浏览器
      </canvas>
    </div>
    <div class="canvPanel" :style="{zoom:1/definition}">
      <canvas
        id="canvas2"
        class="fl"
        :width="width*definition"
        :height="height*definition"
      >
      </canvas>
    </div>
  </div>
</template>

<script>

import Util from '@/base/util/util'

export default {
  name: 'HelloWorld',
  data () {
    return {
      context2d: null,
      context2d_2: null,
      definition:2,//清晰度
      width:document.body.clientWidth,
      height:400,
      animRes1:{},
      valueObj:{},
    }
  },
  mounted(){
    this.hello('111111111111');
    this.drawHandel();
    this.onResize();
  },
  methods:{
    drawHandel(){
      this.init();
      if(this.context2d){
        this.runTest();
      }
    },
    init(){
      let canvas = document.querySelector('#canvas')
      let canvas2 = document.querySelector('#canvas2')
      if (canvas.getContext){
        this.context2d =  canvas.getContext('2d');
        this.context2d_2= canvas2.getContext('2d');
      }else {

      }
    },
    runTest(){
      /*this.drawRect();//矩形测试
      this.drawPath();//路径测试
      this.drawTriangle();//三角形测试
      //this.drawTriangle(true);//填充三角形测试
      this.drawRec(false,true);//圆弧测试
      this.drawCurve();//曲线
      this.drawQuadraticCurve();//QuadraticCurve曲线
      this.drawBezierCurve();//BezierCurve曲线
      //this.drawFillStyle();//FillStyle
      this.drawStrokeStyle();//StrokeStyle
      //this.drawImage();//drawImage
      this.drawText();//drawText*/
      /*this.saveRestore();//saveRestore*/
      //this.translate();//translate
      //this.rotate();//rotate
      //this.transform();//transform
      //this.globalCompositeOperation();
      //this.clip();
      //this.animation();
      this.animationClock();
      //this.drawBezierCurve();
    },
    onResize(){
      window.onresize = () => {
        window.screenWidth = document.body.clientWidth;
        this.width = window.screenWidth;
        setTimeout(()=>{// 等待 canvas 变换好，再延时绘制，不然可能会没有内容
          this.runTest();
        }, 50)

      }
    },
    drawRect() {
      this.context2d.fillStyle = "rgb(200,0,0)";
      this.context2d.fillRect (0, 0, 55, 50);
      this.context2d.strokeRect(10, 70, 100, 50);  //绘制矩形边框
      this.context2d.clearRect(15, 15, 5, 5);
    },
    drawPath(){
      this.context2d.beginPath(); //新建一条path
      this.context2d.moveTo(150, 150); //把画笔移动到指定的坐标
      this.context2d.lineTo(200, 250);  //绘制一条从当前位置到指定坐标(200, 50)的直线.
      //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
      this.context2d.closePath();
      this.context2d.stroke(); //绘制路径。
    },
    drawTriangle(isFill){
      this.context2d.beginPath(); //新建一条path
      this.context2d.moveTo(50, 50);
      this.context2d.lineTo(200, 50);
      this.context2d.lineTo(200, 200);
      if(isFill){
        this.context2d.fill();
      }else{
        this.context2d.closePath();
        this.context2d.stroke(); //绘制路径。
      }
    },
    drawRec(isFill,isClosePath){
      this.context2d.beginPath();
      this.context2d.arc(50, 50, 40,Util.degreesToRadians(0), Util.degreesToRadians(90), true);
      if(isFill){
        this.context2d.fill();
      }else{
        if(isClosePath){
          this.context2d.closePath();
        }
        this.context2d.stroke(); //绘制路径。
      }
    },
    drawCurve(){
      this.context2d.beginPath();
      this.context2d.moveTo(200, 50);
      //参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
      this.context2d.arcTo(300, 50, 300, 200, 100);
      this.context2d.lineTo(300, 300)
      this.context2d.stroke();
      /*这个方法可以这样理解。绘制的弧形是由两条切线所决定。
    ​	  第 1 条切线：起始点和控制点1决定的直线。
    ​	  第 2 条切线：控制点1 和控制点2决定的直线。*/
    },
    drawQuadraticCurve(){
      this.context2d.beginPath();
      this.context2d.moveTo(10, 200); //起始点
      var cp1x = 40, cp1y = 100;  //控制点
      var x = 200, y = 200; // 结束点
      //绘制二次贝塞尔曲线
      this.context2d.quadraticCurveTo(cp1x, cp1y, x, y);
      this.context2d.stroke();

      this.context2d.beginPath();
      this.context2d.rect(10, 200, 10, 10);
      this.context2d.rect(cp1x, cp1y, 10, 10);
      this.context2d.rect(x, y, 10, 10);
      this.context2d.fill();

    },
    drawBezierCurve(){
      let ctx=this.context2d;
      ctx.beginPath();
      ctx.moveTo(40, 200); //起始点
      var cp1x = 20, cp1y = 100;  //控制点1
      var cp2x = 100, cp2y = 120;  //控制点2
      var x = 200, y = 200; // 结束点
      //绘制二次贝塞尔曲线
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.rect(40, 200, 10, 10);
      ctx.rect(cp1x, cp1y, 10, 10);
      ctx.rect(cp2x, cp2y, 10, 10);
      ctx.rect(x, y, 10, 10);
      ctx.fill();
    },
    drawFillStyle(){
      let ctx=this.context2d;
      for (var i = 0; i < 6; i++){
        for (var j = 0; j < 6; j++){
          ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
            Math.floor(255 - 42.5 * j) + ',0)';
          ctx.fillRect(j * 50, i * 50, 50, 50);
        }
      }
    },
    drawStrokeStyle(){
      let ctx=this.context2d;
      ctx.lineWidth = 10;
      ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
      ctx.lineDashOffset = -0;
      for (var i = 0; i < 6; i++){
        for (var j = 0; j < 6; j++){
          ctx.strokeStyle = `rgb(${Util.randomInt(0, 255)},${Util.randomInt(0, 255)},${Util.randomInt(0, 255)})`;
          ctx.strokeRect(j * 50, i * 50, 40, 40);
          ctx.lineWidth = 1;
        }
      }

    },
    drawText(){
      let ctx=this.context2d;
      ctx.font = "100px sans-serif"
      ctx.textBaseline="top";
      ctx.fillText("天若有情", 0, 0);
      ctx.strokeText("天若有情", 10, 200)
    },
    drawImage(){
      let ctx=this.context2d;
      var img = new Image();   // 创建img元素
      img.onload = ()=>{
        ctx.drawImage(img, 0, 0, 400, 200)
        //ctx.drawImage(img, 0, 0, 400, 200, 0, 0, 400, 200)
      }
      img.src = 'https://www.baidu.com/img/xinshouye_77c426fce3f7fd448db185a7975efae5.png'; // 设置图片源地址
    },
    saveRestore(){
      //strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit,
      // shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation 的值
      let ctx=this.context2d;
      ctx.fillRect(0, 0, 150, 150);   // 使用默认设置绘制一个矩形
      ctx.save();                  // 保存默认状态

      ctx.fillStyle = 'red'       // 在原有配置基础上对颜色做改变
      ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形

      ctx.save();                  // 保存当前状态
      ctx.fillStyle = '#FFF'       // 再次改变颜色配置
      ctx.fillRect(30, 30, 90, 90);   // 使用新的配置绘制一个矩形

      ctx.restore();               // 重新加载之前的颜色状态
      ctx.fillRect(45, 45, 60, 60);   // 使用上一次的配置绘制一个矩形

      ctx.restore();               // 加载默认颜色配置
      ctx.fillRect(60, 60, 30, 30);   // 使用加载的配置绘制一个矩形

    },
    translate(){
      let ctx=this.context2d;
      ctx.save(); //保存坐原点平移之前的状态
      ctx.translate(100, 100);
      ctx.strokeRect(0, 0, 100, 100)
      ctx.restore(); //恢复到最初状态
      ctx.translate(220, 220);
      ctx.fillRect(0, 0, 100, 100)
    },
    rotate(){
      let ctx=this.context2d;

      ctx.fillStyle = "red";
      ctx.save();

      ctx.translate(100, 100);
      ctx.rotate(Util.degreesToRadians(45));//它是顺时针方向的
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, 100, 100);
      ctx.restore();

      ctx.save();
      ctx.translate(0, 0);
      ctx.fillRect(0, 0, 50, 50)
      ctx.restore();
    },
    transform(){//变形矩阵
      let ctx=this.context2d;
      ctx.transform(1, 1, 0, 1, 0, 0);
      ctx.fillRect(0, 0, 100, 100);
    },
    globalCompositeOperation(){
      let ctx=this.context2d;
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, 200, 200);

      ctx.globalCompositeOperation = "source-over"; //全局合成操作
      ctx.globalCompositeOperation = "source-in"; //仅仅会出现新图像与原来图像重叠的部分，其他区域都变成透明的
      ctx.globalCompositeOperation = "source-out";//仅仅显示新图像与老图像没有重叠的部分，其余部分全部透明
      ctx.globalCompositeOperation = "source-atop";//新图像仅仅显示与老图像重叠区域。老图像仍然可以显示
      ctx.globalCompositeOperation = "destination-over";//新图像会在老图像的下面
      ctx.globalCompositeOperation = "destination-in";//.....
      ctx.globalCompositeOperation = "lighter";//新老图像都显示，但是重叠区域的颜色做加处理
      ctx.globalCompositeOperation = "darken";//保留重叠部分最黑的像素。(每个颜色位进行比较，得到最小的)
      ctx.globalCompositeOperation = "lighten";//保证重叠部分最量的像素。(每个颜色位进行比较，得到最大的)
      ctx.globalCompositeOperation = "xor";//重叠部分会变成透明
      ctx.globalCompositeOperation = "copy";//只有新图像会被保留，其余的全部被清除(边透明)

      ctx.fillStyle = "red";
      ctx.fillRect(100, 100, 200, 200);
    },
    clip(){
      let ctx=this.context2d;
      ctx.beginPath();
      ctx.arc(20,20, 100, 0, Util.degreesToRadians(360));
      ctx.save();
      ctx.clip();

      /*把已经创建的路径转换成裁剪路径。
    ​	裁剪路径的作用是遮罩。只显示裁剪路径内的区域，裁剪路径外的区域会被隐藏。
    ​	注意：clip()只能遮罩在这个方法调用之后绘制的图像，如果是clip()方法调用之前绘制的图像，则无法实现遮罩。*/

      ctx.fillStyle = "pink";
      ctx.fillRect(20, 20, 100,100);
      ctx.restore();
    },
    animation(){
      let sun = new Image();
      let earth = new Image();
      let moon = new Image();

      let srcs=[];
      sun.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544534914&di=04150f5e62de0f23c20b27e3a9350c65&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa08b87d6277f9e2f0910d6341430e924b899f3e1.jpg";
      earth.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543940218187&di=99eb1df67823dac89e1bf86306a94e1d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F35a85edf8db1cb13ae89a428d654564e92584b2d.jpg";
      moon.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543940240319&di=2f885912951f5b6a186c2d41a718224a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a1c5554ba877000001bf7260dc37.jpg%401280w_1l_2o_100sh.png";

      srcs[0]=sun;
      srcs[1]=earth;
      srcs[2]=moon;

      this.animRes1.srcs=srcs;
      this.animRes1.index=0;

      sun.onload = ()=>{
        this.animationFame();
      }

    },
    animationFame(){
      let ctx=this.context2d;
      ctx.clearRect(0, 0, 300, 300); //清空所有的内容
      ctx.drawImage(this.animRes1.srcs[this.animRes1.index%3], 0, 0, 300, 300);
      this.animRes1.index=this.animRes1.index+1;
      this.animRes1.animID=requestAnimationFrame();
    },
    animationClock(){
      let ctx=this.context2d;
      ctx.save();
      ctx.scale(this.definition,this.definition);

      this.drawDial();

      let time = new Date();
      let s = time.getSeconds();
      let m = time.getMinutes();
      let h = time.getHours();

      let pi = Math.PI;
      let secondAngle = pi / 30 * s;  //计算出来s针的弧度
      let minuteAngle = pi / 30 * m + secondAngle / 60;  //计算出来分针的弧度
      let hourAngle = pi / 6 * h + minuteAngle / 12;  //计算出来时针的弧度
      this.drawHand(hourAngle, 60, 6, "red", ctx);  //绘制时针
      this.drawHand(minuteAngle, 106, 4, "green", ctx);  //绘制分针
      this.drawHand(secondAngle, 129, 2, "blue", ctx);  //绘制秒针

      ctx.restore();
      requestAnimationFrame(this.animationClock);
    },
    drawHand(angle, len, width, color){
      let ctx=this.context2d;
      ctx.save();
      ctx.translate(150, 150); //把坐标轴的远点平移到原来的中心
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
    drawDial(){
      let ctx=this.context2d;
      let pi = Math.PI;

      ctx.clearRect(0, 0, 300, 300); //清除所有内容
      ctx.save();

      ctx.translate(150, 150); //一定坐标原点到原来的中心
      ctx.beginPath();
      ctx.arc(0, 0, 148, 0, 2 * pi); //绘制圆周
      ctx.stroke();
      ctx.closePath();

      for (let i = 0; i < 60; i++){//绘制刻度。
        ctx.save();
        ctx.rotate(-pi / 2 + i * pi / 30);  //旋转坐标轴。坐标轴x的正方形从 向上开始算起
        ctx.beginPath();
        ctx.moveTo(110, 0);
        ctx.lineTo(140, 0);
        ctx.lineWidth = i % 5 ? 2 : 4;
        ctx.strokeStyle = i % 5 ? "blue" : "red";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
      ctx.restore();
    },
    /*drawDial(){

     // let pi = Math.PI;
      this.valueObj.i=null;
      this.drawDialFrame();
     /!* for (let i = 0; i < 60; i++){//绘制刻度。
        ctx.save();

        ctx.lineWidth = i % 5 ? 2 : 4;
        ctx.strokeStyle = i % 5 ? "blue" : "red";

        ctx.rotate(i * pi / 30);  //旋转坐标轴。坐标轴x的正方形从 向上开始算起

        ctx.beginPath();
        ctx.moveTo(110, 0);
        ctx.lineTo(140, 0);

        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
      ctx.restore();*!/
    },
    drawDialFrame(){
      let ctx=this.context2d;
      let pi = Math.PI;
      ctx.save();
      this.context2d.scale(this.definition,this.definition);
      ctx.clearRect(0, 0, 300, 300); //清除所有内容

      ctx.translate(150, 150); //一定坐标原点到原来的中心
      ctx.beginPath();
      ctx.arc(0, 0, 148, 0, 2 * pi); //绘制圆周
      ctx.stroke();
      ctx.closePath();

      let i=0;
      if(this.valueObj.i){
         i=this.valueObj.i;
      }
      if(i<60){

        ctx.save();

        ctx.lineWidth = i % 5 ? 2 : 4;
        ctx.strokeStyle = i % 5 ? "blue" : "red";

        ctx.rotate(i * pi / 30);  //旋转坐标轴。坐标轴x的正方形从 向上开始算起

        ctx.beginPath();
        ctx.moveTo(110, 0);
        ctx.lineTo(140, 0);

        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        this.valueObj.i=i+1;

      }else{
      }
      requestAnimationFrame(this.drawDialFrame);
      ctx.restore();
    },*/
    draw2(){/*绘制表盘*/
      let ctx=this.context2d;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    border: 1px solid #585858;
    overflow: hidden;
    position: relative;
  }
  .fl{
    display: block;
  }
  .canvPanel{
    position:absolute;
    top:0px;
    left:0px;
  }
</style>
