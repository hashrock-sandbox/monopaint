import Component from 'vue-class-component'
import * as Vue from "vue";

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
  ready(){
    this.canvas = <HTMLCanvasElement>document.getElementById("canv");;
    this.context = this.canvas.getContext("2d");

    this.context.strokeStyle = "black";
    this.context.lineWidth = 5;
    this.context.lineCap = "round";
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawing: boolean

  mouseX: number
  mouseY: number

  updateMousePos(ev: MouseEvent){
    var rect = this.canvas.getBoundingClientRect();
    this.mouseX = ev.clientX - rect.left;
    this.mouseY = ev.clientY - rect.top;
  }

  mousemove(ev: MouseEvent){
    console.log(ev)
    if(!this.drawing){
      return
    }
    this.context.beginPath();
    var rect = this.canvas.getBoundingClientRect();
    var dx = ev.clientX - rect.left;
    var dy = ev.clientY - rect.top;

    this.context.moveTo(dx, dy);
    this.context.lineTo(this.mouseX, this.mouseY);
    this.context.stroke();
    this.context.closePath();    

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