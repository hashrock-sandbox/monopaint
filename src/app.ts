import Component from 'vue-class-component'
import * as Vue from "vue";
class Point{
  x:number
  y:number
}


@Component({
  props: {
  },
  template: `
    <div>
      <canvas id="canv" @mousemove="mousemove" @mouseup="mouseup" @mousedown="mousedown" width="600px" height="600px"></canvas>
    </div>
  `
})
export class App extends Vue {
  context: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  drawing: boolean
  before: Point

  ready(){
    this.canvas = <HTMLCanvasElement>document.getElementById("canv");;
    this.context = this.canvas.getContext("2d");

    this.context.strokeStyle = "black";
    this.context.lineWidth = 5;
    this.context.lineCap = "round";
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

  mousemove(ev: MouseEvent){
    if(!this.drawing){
      return
    }
    this.drawLine(this.before, this.getPoint(ev))
    this.updateMousePos(ev)
  }
  mouseup(){
    this.drawing = false
  }
  mousedown(ev: MouseEvent){
    this.drawing = true
    this.updateMousePos(ev)
  }

}