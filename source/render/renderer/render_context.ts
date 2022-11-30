export default abstract class RenderContext {
   private _canvas: HTMLCanvasElement;

   /**
   * Constructor
   * @param {HTMLCanvasElement} canvasElement - The canvas HTMLElement the view will render to
   */
   constructor(canvasElement: HTMLCanvasElement) {
      this._canvas = canvasElement;
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
   
   get canvas(): HTMLCanvasElement {
      return this._canvas;
   }
}