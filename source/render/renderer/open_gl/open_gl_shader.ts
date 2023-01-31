
import OpenGLContext from "./open_gl_context.js";

class OpenGLShader {
   private _type: OpenGLShader.Type;
   private _gl_shader: WebGLShader | null;

   constructor() {
      this._type = OpenGLShader.Type.NONE;
      this._gl_shader = null;
   }
   
   get type(): OpenGLShader.Type {
      return this._type;
   }
   
   get gl_shader(): WebGLShader | null {
      return this._gl_shader;
   }

   initialize(source: string, shaderType: OpenGLShader.Type, context: OpenGLContext): boolean
   {
      this.release(context);
      
      let GLcontext = context as OpenGLContext;

      // Create a new GL shader
      this._type = shaderType;
      switch(this.type)
      {
         case OpenGLShader.Type.VERTEX: {
            this._gl_shader = GLcontext.gl.createShader(GLcontext.gl.VERTEX_SHADER);;
            break;
         }
         case OpenGLShader.Type.FRAGMENT: {
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

   release(context: OpenGLContext)
   {
      if (this._gl_shader != null)
      {
         context.gl.deleteShader(this._gl_shader);
      }
      this._gl_shader = null;
      this._type = OpenGLShader.Type.NONE;
   }
}

namespace OpenGLShader {
   export enum Type {
      VERTEX,
      FRAGMENT,
      NONE,
   }
}

export default OpenGLShader;