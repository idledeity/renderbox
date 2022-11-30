import Vector2 from "math/vector/vector2.js";
import ColorRGB32 from "../color.js";
import ShaderProgram from "../shader/shader_program.js";
import RenderContext from "./render_context.js";

export default abstract class Renderer
{
   private _context: RenderContext;

   /**
    * Constructor
    * @param {RenderContext} context - The render context for the renderer to use
    */
   constructor(canvasElement: HTMLCanvasElement) {
      this._context = this.makeContext(canvasElement);
   }

   get context(): RenderContext {
      return this._context;
   }
   
   abstract makeContext(canvasElement: HTMLCanvasElement): RenderContext;

   abstract beginFrame(): void;

   abstract createProgram(vertShaderSource: string, fragShaderSource: string): ShaderProgram | null;
   
   abstract drawTriangle2D(point1: Vector2, point2: Vector2, point3: Vector2, color: ColorRGB32): void;
}