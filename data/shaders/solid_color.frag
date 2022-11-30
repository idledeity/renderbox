// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;

varying lowp vec4 vColor;

void main() {
   gl_FragColor = vColor;
}