import Vector2 from "math/vector/vector2.js";
import ColorRGB32 from "../color.js";
import OpenGLContext from "./open_gl/open_gl_context.js";
import OpenGLShaderProgram from "./open_gl/open_gl_shader_program.js";

export default abstract class Renderer
{
   private _context: OpenGLContext;

   /**
    * Constructor
    * @param {RenderContext} context - The render context for the renderer to use
    */
   constructor(canvasElement: HTMLCanvasElement) {
      this._context = this.makeContext(canvasElement);
   }

   get context(): OpenGLContext {
      return this._context;
   }
   
   abstract makeContext(canvasElement: HTMLCanvasElement): OpenGLContext;

   abstract beginFrame(): void;

   abstract createProgram(vertShaderSource: string, fragShaderSource: string): OpenGLShaderProgram | null;
   
   abstract drawTriangle2D(verts: Vector2[], colors: ColorRGB32[]): void;
}