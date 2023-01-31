
export default class OpenGLContext {
   private _canvas: HTMLCanvasElement;
   private _gl: WebGLRenderingContext;

   /**
   * Constructor
   * @param {HTMLCanvasElement} canvasElement - The canvas HTMLElement the view will render to
   */
   constructor(canvasElement: HTMLCanvasElement) {
      this._canvas = canvasElement;
      let context = canvasElement.getContext("webgl");
      if (context == null) {
         throw Error("Could not acquire WebGL context from Canvas element.");
      }

      this._gl = context;
   }

   get gl(): WebGLRenderingContext {
      return this._gl;
   }
   
   get canvas(): HTMLCanvasElement {
      return this._canvas;
   }
   
   resize() {
      // Lookup the size the browser is displaying the canvas.
      const displayWidth  = this._canvas.clientWidth;
      const displayHeight = this._canvas.clientHeight;

      // Check if the canvas is not the same size.
      if (this._canvas.width  != displayWidth || this._canvas.height != displayHeight) {
         
         // Make the canvas the same size
         this._canvas.width  = displayWidth;
         this._canvas.height = displayHeight;
      }
   }
}
