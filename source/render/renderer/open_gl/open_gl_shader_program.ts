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

      this._gl_program = context.gl.createProgram();
      if (!this._gl_program) {
         console.log("Failed to create WebGL Program.");
         return false;
      }
      
      // Attach each shader
      for (let shader of this._shaders)
      {
         if (shader.gl_shader)
         {
            context.gl.attachShader(this._gl_program, shader.gl_shader);
         }
      }
      
      // Link the program
      context.gl.linkProgram(this._gl_program);
      var success = context.gl.getProgramParameter(this._gl_program, context.gl.LINK_STATUS);
      if (!success) {
         const info = context.gl.getProgramInfoLog(this._gl_program);
         console.log("Failed to link program. Error:\n\n" + info);
         
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
   
   static Load(vertPath: string, fragPath: string, context: OpenGLContext): OpenGLShaderProgram
   {
      let newProgram = new OpenGLShaderProgram();
      
      // Load the vert and frag shaders
      let shaders = Array<OpenGLShader>();
      shaders.push(OpenGLShader.Load(vertPath, OpenGLShader.Type.VERTEX, context));
      shaders.push(OpenGLShader.Load(fragPath, OpenGLShader.Type.FRAGMENT, context));
     
      // Create the program from the shaders
      if (!newProgram.initialize(shaders, context))
      {
         throw Error("Could not load shader program with vert shader: " + vertPath + " and frag path: " + fragPath);
      }
      
      return newProgram;
   }
}