import OpenGLShaderProgram from "../../renderer/open_gl/open_gl_shader_program.js";
import OpenGLContext from "../../renderer/open_gl/open_gl_context.js";

export default class VertexColorProgram  {
   private _program: OpenGLShaderProgram | null;
   
   constructor() {
      this._program = null;
   }
   
   initialize(context: OpenGLContext): boolean
   {
      this._program = OpenGLShaderProgram.Load(
         "../data/shaders/vertex_color.vert",
         "../data/shaders/solid_color.frag",
         context);
      
      return true;
   }
   
   get shader(): OpenGLShaderProgram | null {
      return this._program;
   }
}