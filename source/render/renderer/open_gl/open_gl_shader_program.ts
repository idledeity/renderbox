import OpenGLContext from "./open_gl_context.js";
import OpenGLShader from "./open_gl_shader.js";

export default class OpenGLShaderProgram {
   private _gl_program: WebGLProgram | null;
   private _shaders: Array<OpenGLShader>;
   
   constructor() {
      this._gl_program = null;
      this._shaders = [];
   }
   
   initialize(shaders: Array<OpenGLShader>, context: OpenGLContext): boolean
   {
      this._shaders = shaders;
      
      var success = false;
      const program = context.gl.createProgram();
      if (program != null)
      {
         this._gl_program = program;
         for (let shader of this._shaders)
         {
            let shaderGL = shader as OpenGLShader;
            if (shaderGL.gl_shader != null)
            {
               context.gl.attachShader(this._gl_program, shaderGL.gl_shader);
            }
         }
         
         context.gl.linkProgram(this._gl_program);
         success = context.gl.getProgramParameter(this._gl_program, context.gl.LINK_STATUS)
         if (!success) {
            const info = context.gl.getProgramInfoLog(this._gl_program);
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
   
   release(context: OpenGLContext)
   {
      this._shaders = [];
      
      if (this._gl_program != undefined)
      {
         context.gl.deleteProgram(this._gl_program);
      }
   }
   
   get gl_program(): WebGLProgram | null {
      return this._gl_program;
   }
   
   get shaders() {
      return this._shaders;
   }
   
   isValid(): boolean {
      return (this.gl_program != null && this.shaders.length > 0);
   }
}