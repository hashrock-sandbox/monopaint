import Component from 'vue-class-component'
import * as Vue from "vue";

class Point{
  x:number
  y:number
}

@Component({
  template: `
    <div>
      <canvas id="canv" @mousemove="mousemove" @mouseup="mouseup" @mousedown="mousedown" @mouseout="mouseup" width="600px" height="600px"></canvas>
      <div v-for="item in bindList" :class="{'selected': $index === bindIndex}">
        <div v-if="item">
          x: {{item.x}}, y:{{item.y}}
        </div>
        <div v-if="!item">
          なし
        </div>
      </div>
      <div style="border: 1px solid white; margin: 2em 0">
        b: ブラシ<br>
        e: 消しゴム<br>
        1-5: 消失点の選択
      </div>
    </div>
  `
})
export class App extends Vue {
  context: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  drawing: boolean
  before: Point
  startPoint: Point
  bindList: Point[]
  bindIndex: number


  data():any{
    return {
      drawing: false,
      before: undefined,
      startPoint: undefined,
      bindList: [
        undefined,
        {x: -300, y: 400},
        {x: 900, y: 400},
        {x: 300, y: 2800},
        {x: 300, y: -2800},
      ],
      bindIndex : 0
    }

  }

  ready(){
    this.canvas = <HTMLCanvasElement>document.getElementById("canv");;
    this.context = this.canvas.getContext("2d");

    this.context.strokeStyle = "black";
    this.context.lineWidth = 1;
    this.context.lineCap = "round";
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    window.onkeydown = this.keydown

  }

  keydown(ev: KeyboardEvent){
    switch(ev.key){
      case "1":
        this.bindIndex = 0
        break;
      case "2":
        this.bindIndex = 1
        break;
      case "3":
        this.bindIndex = 2
        break;
      case "4":
        this.bindIndex = 3
        break;
      case "5":
        this.bindIndex = 4
        break;
      case "b":
        this.context.lineWidth = 1;
        this.context.strokeStyle = "black";
        break;
      case "e":
        this.context.lineWidth = 20;
        this.context.strokeStyle = "white";
        break;
      

    }
  }

  get bindPoint():Point{
    return this.bindList[this.bindIndex]
  }

  updateMousePos(ev: MouseEvent){
    this.before = this.getPoint(ev)
  }

  getPoint(ev: MouseEvent): Point{
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: ev.clientX - rect.left,
      y: ev.clientY - rect.top
    }
  }

  drawLine(p1: Point, p2: Point){
    this.context.beginPath();

    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.stroke();
    this.context.closePath();    

  }
  lerp(x0:number, y0:number, x1:number, y1:number, x:number) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
  }

  convert(p: Point){
    //startPointとbindPointを結ぶ直線
    let p1 = this.startPoint
    let p2 = this.bindPoint

    let x = p.x
    let y = this.lerp(p1.x, p1.y, p2.x, p2.y ,x)
    return {x: x, y:y}
  }

  mousemove(ev: MouseEvent){
    if(!this.drawing){
      return
    }
    let real = this.getPoint(ev);
    if(this.bindPoint){
      real = this.convert(real)
    }
    this.drawLine(this.before, real)
    this.before = real
  }
  mouseup(){
    this.drawing = false
  }
  mousedown(ev: MouseEvent){
    this.drawing = true
    this.startPoint = this.getPoint(ev)
    this.updateMousePos(ev)
  }

}