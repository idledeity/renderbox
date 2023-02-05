import RenderBox from "../renderbox.js";
import Vector2 from "../math/vector/vector2.js";
import ColorRGB32 from "../render/color.js"

let renderBox = new RenderBox(document.getElementById("renderbox-canvas"));

renderBox.renderer.beginFrame();
renderBox.renderer.drawTriangle2D(
   [new Vector2(-0.25, 0.25), new Vector2(0.5, 0.5), new Vector2(- 0.3, 0.90)],
   [ColorRGB32.Red, ColorRGB32.Green, ColorRGB32.Blue]);
