import RenderContext from "../render_context.js";
import Shader from "../../shader/shader.js";
import ShaderProgram from "../../shader/shader_program.js";
import OpenGLContext from "./open_gl_context.js";
import OpenGLShader from "./open_gl_shader.js";

export default class OpenGLShaderProgram extends ShaderProgram {
   private _gl_program: WebGLProgram | null;
   
   constructor() {
      super();
      
      this._gl_program = null;
   }
   
   initialize(shaders: Array<Shader>, context: RenderContext): boolean
   {
      if (!super.initialize(shaders, context)) {
         return false;
      }
      
      let contextGL = context as OpenGLContext;
      
      var success = false;
      const program = contextGL.gl.createProgram();
      if (program != null)
      {
         this._gl_program = program;
         for (let shader of this.shaders)
         {
            let shaderGL = shader as OpenGLShader;
            if (shaderGL.gl_shader != null)
            {
               contextGL.gl.attachShader(this._gl_program, shaderGL.gl_shader);
            }
         }
         
         contextGL.gl.linkProgram(this._gl_program);
         success = contextGL.gl.getProgramParameter(this._gl_program, contextGL.gl.LINK_STATUS)
         if (!success) {
            const info = contextGL.gl.getProgramInfoLog(this._gl_program);
            console.log("Failed to link program. Error:\n\n" + info);
         }
      }
      else
      {
         console.log("Failed to create program.");
      }
      
      if (!success) {
         this.release(context);
      }
      
      return success;
   }
   
   release(context: RenderContext)
   {
      if (this._gl_program != undefined)
      {
         (context as OpenGLContext).gl.deleteProgram(this._gl_program);
      }
      
      super.release(context);
   }
   
   get gl_program(): WebGLProgram | null {
      return this._gl_program;
   }
   
   isValid(): boolean {
      if (!super.isValid()) {
         return false;
      }
      
      return this._gl_program != null;
   }
}