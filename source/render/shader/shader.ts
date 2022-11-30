import RenderContext from "render/renderer/render_context.js";

abstract class Shader {
   private _type: Shader.Type;

   constructor() {
      this._type = Shader.Type.NONE;
   }

   abstract initialize(source: string, shaderType: Shader.Type, context: RenderContext): boolean

   abstract release(context: RenderContext): void;
   
   get type(): Shader.Type {
      return this._type;
   }
   
   set type(newType: Shader.Type) {
      this._type = newType;
   }
}

namespace Shader {
   export enum Type {
      VERTEX,
      FRAGMENT,
      NONE,
   }
}

export default Shader;