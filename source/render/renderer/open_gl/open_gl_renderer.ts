import OpenGLContext from "./open_gl_context.js"
import OpenGLShader from "./open_gl_shader.js";
import Renderer from "../renderer.js"
import Shader from "../../shader/shader.js";
import ShaderProgram from "../../shader/shader_program.js";
import SolidColorShader from "../../shader/shaders/solid_color.js";
import OpenGLShaderProgram from "./open_gl_shader_program..js";
import Vector2 from "math/vector/vector2.js";
import ColorRGB32 from "render/color.js";

export default class OpenGLRenderer extends Renderer
{
   private _solidColorProgram: SolidColorShader;
   
   /**
    * Constructor
    * @param {RenderContext} context - The render context for the renderer to use
    */
   constructor(canvasElement: HTMLCanvasElement) {
      super(canvasElement);
      
      this._solidColorProgram = new SolidColorShader();
      this._solidColorProgram.initialize(this);
   }

   get gl(): WebGLRenderingContext {
      return (this.context as OpenGLContext).gl;
   }
   
   get solidColorProgram(): SolidColorShader {
      return this._solidColorProgram;
   }

   makeContext(canvasElement: HTMLCanvasElement) {
      return new OpenGLContext(canvasElement);
   }

   beginFrame() {
      this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      this.gl.clearColor(0, 0, 0, 1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
   }
   
   createShader(): Shader
   {
      return new OpenGLShader();
   }

   createProgram(vertShaderSource: string, fragShaderSource: string): ShaderProgram | null
   {
      let success = true;

      // Create the vertex and fragment shaders
      let vertShader = new OpenGLShader();
      success = vertShader.initialize(vertShaderSource, Shader.Type.VERTEX, this.context);
      let fragShader = new OpenGLShader();
      success = success && fragShader.initialize(fragShaderSource, Shader.Type.FRAGMENT, this.context);

      // Create the program from the shaders
      let newProgram = new OpenGLShaderProgram();
      success = success && newProgram.initialize([vertShader, fragShader], this.context);

      return success ? newProgram : null;
   }
   
   drawTriangle2D(point1: Vector2, point2: Vector2, point3: Vector2, color: ColorRGB32)
   {
      let gl_program = (this.solidColorProgram.shader as OpenGLShaderProgram).gl_program;
      if (gl_program) {
         this.gl.useProgram(gl_program);
         
         const positionArray = new Float32Array(2 * 3);
         positionArray.set(point1.coords, 0);
         positionArray.set(point2.coords, 2);
         positionArray.set(point3.coords, 4);
         
         let positionBuffer = this.gl.createBuffer();
         this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
         this.gl.bufferData(this.gl.ARRAY_BUFFER, positionArray, this.gl.STATIC_DRAW);
   
         let positionAttributeLocation = this.gl.getAttribLocation(gl_program, "aVertPos");
         this.gl.enableVertexAttribArray(positionAttributeLocation);
         this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
         
         let colorUniformLocation = this.gl.getUniformLocation(gl_program, 'uVertColor');
         this.gl.uniform4fv(colorUniformLocation, color.value);
      
         // draw
         var primitiveType = this.gl.TRIANGLES;
         var offset = 0;
         var count = 3;
         this.gl.drawArrays(primitiveType, offset, count);
      }
   }
}