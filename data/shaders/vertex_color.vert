attribute vec4 aVertPos;
attribute vec4 aVertColor;

varying lowp vec4 vColor;

void main() {
   gl_Position = aVertPos;
   vColor = aVertColor;
}