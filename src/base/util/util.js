/**
 * @author userjustdoit
 * @des
 */

//返回随机的 [from, to] 之间的整数(包括from，也包括to)
exports.randomInt = function (from, to) {
  return parseInt(Math.random() * (to - from) + from);
}

//角度转弧度
exports.degreesToRadians= function(degrees){
  return (Math.PI/180)*degrees;
}
