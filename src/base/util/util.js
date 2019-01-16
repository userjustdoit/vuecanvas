/**
 * @author userjustdoit
 * @des
 */
import Constans from '@/base/constans.js'

//返回随机的 [from, to] 之间的整数(包括from，也包括to)
exports.randomInt = function (from, to) {
  return parseInt(Math.random() * (to - from) + from);
}

exports.toPx = function (pct,toWidth){//相对单位转绝地单位,屏幕宽为750
  let width=Constans.defaultWidth();
  if(toWidth){
    width=toWidth;
  }
  return pct*width/750;
}

//角度转弧度
exports.degreesToRadians= function(degrees){
  return (Math.PI/180)*degrees;
}
