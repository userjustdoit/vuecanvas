/**
 * @author userjustdoit
 * @des
 */

import Constans from '@/base/constans.js'
import Resconfig from '@/base/resconfig.js';
export default {
  methods: {
    hello() {
      console.log('hello');
    },
    /*****屏幕宽为750,宽高相对坐标表示一致的相对坐标体系方法start*******/
    toPx(pct,toWidth){//相对单位转绝地单位,屏幕宽为750
      let width=Constans.defaultWidth();
      if(toWidth){
        width=toWidth;
      }
      return pct*width/750;
    },
    getHPct(toHeight,toWidth){//在假设宽度为750pct的情况下,获取高度方向总共的pct
      let height=Constans.defaultHeight();
      if(toHeight){
        height=toHeight;
      }
      let width=Constans.defaultWidth();
      if(toWidth){
        width=toWidth;
      }
      return height*750/width;
    },
    /*****屏幕宽为750,宽高相对坐标表示一致的相对坐标体系方法end*******/
    RAF(callback){
      return window.requestAnimationFrame(callback) ||
      window.webkitRequestAnimationFrame(callback) ||
      window.mozRequestAnimationFrame(callback) ||
      window.oRequestAnimationFrame(callback) ||
      window.msRequestAnimationFrame(callback) ||
      window.setTimeout(callback, 1000 / 60);
    },
    getImageUrl(fileName){//获取路径资源
      return Resconfig.staticPath+`/image/${fileName}`;
    },
  }

}
