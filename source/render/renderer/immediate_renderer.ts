/*
import Renderer from "./renderer.js";
//import Vector2 from "math/vector/vector2.js";
//import ColorRGB32 from "render/color.js";
import ShaderProgram from "render/renderer/shader/shader_program.js";
import { requestFileBlocking } from "../../system/file/file.js";

export default class ImmediateRenderer
{
   private renderer: Renderer;
   private solidColorProgram: ShaderProgram;
   
   constructor(renderer: Renderer)
   {
      this.renderer = renderer;
      
      const solidColorVert = requestFileBlocking("../data/shaders/solid_color.vert");
      if (!solidColorVert[0])
      {
         throw Error("Could not load solid color vertex shader.");
      }
      const solidColorFrag = requestFileBlocking("../data/shaders/solid_color.frag");
      if (!solidColorFrag)B
      {
         throw Error("Could not load solid color fragment shader.");
      }
      
      const solidColorProgram = this.renderer.createProgram(solidColorVert[1], solidColorFrag[1]);
      if (solidColorProgram == null)
      {
         throw Error("Could not create solid color shader program.");
      }
      this.solidColorProgram = solidColorProgram;
   }
   
   get gl()
   {
      return this.renderer.gl;
   }


}
*/