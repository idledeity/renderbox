import OpenGLRenderer from "./render/renderer/open_gl/open_gl_renderer.js";
import Renderer from "./render/renderer/renderer.js";

export default class RenderBox {
   private _renderer: Renderer;
   
   constructor(canvasElement: HTMLCanvasElement | HTMLElement | null)
   {
      if (canvasElement == null)
      {
         throw Error("Cannot initialize RenderBox with {null} canvas Element.");
      }
      this._renderer = new OpenGLRenderer(canvasElement as HTMLCanvasElement);
   }
   
   get renderer() {
      return this._renderer;
   }
}