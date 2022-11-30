import Shader from "./shader.js"
import RenderContext from "../renderer/render_context.js";

export default abstract class ShaderProgram {
   private _shaders: Array<Shader>;
   
   initialize(shaders: Array<Shader>, context: RenderContext): boolean {
      this._shaders = shaders;
      return true;
   }
   
   release(context: RenderContext) {
      this._shaders = [];
   }
   
   isValid(): boolean {
      return this.shaders.length > 0;
   }
   
   get shaders() {
      return this._shaders;
   }
}