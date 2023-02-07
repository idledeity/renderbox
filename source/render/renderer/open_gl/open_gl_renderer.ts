import OpenGLContext from "./open_gl_context.js"
import Renderer from "../renderer.js"
import SolidColorProgram from "../../shader/shaders/solid_color.js";
import VertexColorProgram from "../../shader/shaders/vertex_color.js";
import OpenGLShaderProgram from "./open_gl_shader_program.js";
import Vector2 from "math/vector/vector2.js";
import ColorRGB32 from "render/color.js";

export default class OpenGLRenderer extends Renderer
{
   private _SolidColorProgram: SolidColorProgram;
   private _VertexColorProgram: VertexColorProgram;
   
   /**
    * Constructor
    * @param {RenderContext} context - The render context for the renderer to use
    */
   constructor(canvasElement: HTMLCanvasElement) {
      super(canvasElement);
      
      this._SolidColorProgram = new SolidColorProgram();
      this._SolidColorProgram.initialize(this.context);
      
      this._VertexColorProgram = new VertexColorProgram();
      this._VertexColorProgram.initialize(this.context);
   }

   get gl(): WebGLRenderingContext {
      return (this.context as OpenGLContext).gl;
   }
   
   get SolidColorProgram(): SolidColorProgram {
      return this._SolidColorProgram;
   }
   
   get VertexColorProgram(): VertexColorProgram {
      return this._VertexColorProgram
   }

   makeContext(canvasElement: HTMLCanvasElement) {
      return new OpenGLContext(canvasElement);
   }

   beginFrame() {
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      this.gl.clearColor(0, 0, 0, 1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
   }
   
   drawTriangle2D(verts: Vector2[], colors: ColorRGB32[])
   {
      let gl_program = (this.VertexColorProgram.shader as OpenGLShaderProgram).gl_program;
      if (gl_program) {
         this.gl.useProgram(gl_program);
         
         const positionArray = new Float32Array(2 * 3);
         positionArray.set(verts[0].coords, 0);
         positionArray.set(verts[1].coords, 2);
         positionArray.set(verts[2].coords, 4);
         
         let positionBuffer = this.gl.createBuffer();
         this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
         this.gl.bufferData(this.gl.ARRAY_BUFFER, positionArray, this.gl.STATIC_DRAW);
   
         let positionAttributeLocation = this.gl.getAttribLocation(gl_program, "aVertPos");
         this.gl.enableVertexAttribArray(positionAttributeLocation);
         this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
         
         const colorArray = new Float32Array(4 * 3);
         colorArray.set(colors[0].values, 0);
         colorArray.set(colors[1].values, 4);
         colorArray.set(colors[2].values, 8);
         
         let colorBuffer = this.gl.createBuffer();
         this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
         this.gl.bufferData(this.gl.ARRAY_BUFFER, colorArray, this.gl.STATIC_DRAW);
         
         let colorAttributeLocation = this.gl.getAttribLocation(gl_program, 'aVertColor');
         this.gl.enableVertexAttribArray(colorAttributeLocation);
         this.gl.vertexAttribPointer(colorAttributeLocation, 4, this.gl.FLOAT, false, 0, 0);
      
         // draw
         var primitiveType = this.gl.TRIANGLES;
         var offset = 0;
         var count = 3;
         this.gl.drawArrays(primitiveType, offset, count);
      }
   }
}