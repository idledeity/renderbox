import { requestFileBlocking } from "../../../system/file/file.js";
import Renderer from "render/renderer/renderer.js";
import OpenGLShaderProgram from "render/renderer/open_gl/open_gl_shader_program.js";

export default class SolidColorShader {
   private _shader: OpenGLShaderProgram | null;
   
   constructor() {
   }
   
   initialize(renderer: Renderer): boolean
   {
      const solidColorVert = requestFileBlocking("../data/shaders/solid_color.vert");
      if (!solidColorVert[0])
      {
         throw Error("Could not load solid color vertex shader.");
      }
      const solidColorFrag = requestFileBlocking("../data/shaders/solid_color.frag");
      if (!solidColorFrag[0])
      {
         throw Error("Could not load solid color fragment shader.");
      }
      this._shader = renderer.createProgram(solidColorVert[1], solidColorFrag[1]);
      
      return true;
   }
   
   get shader(): OpenGLShaderProgram | null {
      return this._shader;
   }
}