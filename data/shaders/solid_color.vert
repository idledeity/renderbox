attribute vec4 aVertPos;

uniform vec4 uVertColor;

varying lowp vec4 vColor;

void main() {
   gl_Position = aVertPos;
   vColor = uVertColor;
}