/**
 * @author userjustdoit
 * @des  立方体
 */
import {Vertex} from './Vertex.js';
import Util from '@/base/util/util.js';

export class Cube {

  constructor(center, side){

    //中心
    this.center = center;

    //边长
    this.side = side;

    //半径
    var d = side/2;

    //8个点
    this.vertices = [
      new Vertex(center.x - d, center.y - d, center.z + d),
      new Vertex(center.x - d, center.y - d, center.z - d),
      new Vertex(center.x + d, center.y - d, center.z - d),
      new Vertex(center.x + d, center.y - d, center.z + d),
      new Vertex(center.x + d, center.y + d, center.z + d),
      new Vertex(center.x + d, center.y + d, center.z - d),
      new Vertex(center.x - d, center.y + d, center.z - d),
      new Vertex(center.x - d, center.y + d, center.z + d)
    ];


    //白 蓝 红 绿 黄  橙色
    this.facecolor = ['rgba(227, 236, 236, 1)','rgba(0, 150, 255, 1)','rgba(158, 63, 34, 1)','rgba(41, 222, 80, 1)',
      'rgba(231, 234, 32, 1)','rgba(226, 131, 14, 1)'];

    //6个面
    this.faces = [
      [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
      [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
      [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
      [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
      [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
      [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
    ];
  }

  drawSelf(){

  }

  /**
   * 已Y轴为垂线将三维平面的点映射到二维平面.
   * @param vertex vertex
   */
  project(vertex) {
    return new Vertex(vertex.x, vertex.z);
  }

}
