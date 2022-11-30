
import RenderContext from "../render_context.js"

export default class OpenGLContext extends RenderContext {
   private _gl: WebGLRenderingContext;

   /**
   * Constructor
   * @param {HTMLCanvasElement} canvasElement - The canvas HTMLElement the view will render to
   */
   constructor(canvasElement: HTMLCanvasElement) {
      super(canvasElement);
      let gl = this.canvas.getContext("webgl");
      if (gl == null) {
         throw Error("Coult not acquire WebGL context from Canvas element.");
      }

      this._gl = gl;
   }

   get gl(): WebGLRenderingContext {
      return this._gl;
   }
}