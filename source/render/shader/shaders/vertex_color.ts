import { requestFileBlocking } from "../../../system/file/file.js";
import Renderer from "render/renderer/renderer.js";
import OpenGLShaderProgram from "render/renderer/open_gl/open_gl_shader_program.js";

export default class VertexColorShader {
   private _shader: OpenGLShaderProgram | null;
   
   constructor() {
   }
   
   initialize(renderer: Renderer): boolean
   {
      const vertexColorVert = requestFileBlocking("../data/shaders/vertex_color.vert");
      if (!vertexColorVert[0])
      {
         throw Error("Could not load solid color vertex shader.");
      }
      const vertexColorFrag = requestFileBlocking("../data/shaders/solid_color.frag");
      if (!vertexColorFrag[0])
      {
         throw Error("Could not load solid color fragment shader.");
      }
      this._shader = renderer.createProgram(vertexColorVert[1], vertexColorFrag[1]);
      
      return true;
   }
   
   get shader(): OpenGLShaderProgram | null {
      return this._shader;
   }
}