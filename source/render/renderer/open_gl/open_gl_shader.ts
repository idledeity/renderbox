
import OpenGLContext from "./open_gl_context.js";
import Shader from "../../shader/shader.js";
import RenderContext from "render/renderer/render_context.js";


export default class OpenGLShader extends Shader
{
   private _gl_shader: WebGLShader | null;

   constructor() {
      super();
      this._gl_shader = null;
   }

   initialize(source: string, shaderType: Shader.Type, context: RenderContext): boolean
   {
      this.release(context);
      
      let GLcontext = context as OpenGLContext;

      // Create a new GL shader
      this.type = shaderType;
      switch(this.type)
      {
         case Shader.Type.VERTEX: {
            this._gl_shader = GLcontext.gl.createShader(GLcontext.gl.VERTEX_SHADER);;
            break;
         }
         case Shader.Type.FRAGMENT: {
            this._gl_shader = GLcontext.gl.createShader(GLcontext.gl.FRAGMENT_SHADER);
            break;
         }
      }
      if (this._gl_shader == null)
      {
         console.log("Failed to create new shader, of type: %i.", shaderType);
         return false;
      }

      // Compile the shader
      GLcontext.gl.shaderSource(this._gl_shader, source);
      GLcontext.gl.compileShader(this._gl_shader);
      const success = GLcontext.gl.getShaderParameter(this._gl_shader, GLcontext.gl.COMPILE_STATUS);
      if (!success) {
         const info = GLcontext.gl.getShaderInfoLog(this._gl_shader);
         console.log("Failed to compile shader. Error:\n\n" + info);
         this.release(context);
      }

      return success;
   }

   release(context: RenderContext)
   {
      let contextGL = context as OpenGLContext;
      
      if (this._gl_shader != null)
      {
         contextGL.gl.deleteShader(this._gl_shader);
      }
      this._gl_shader = null;
      this.type = Shader.Type.NONE;
   }
   
   get gl_shader(): WebGLShader | null {
      return this._gl_shader;
   }
}
