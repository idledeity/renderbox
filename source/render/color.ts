
/**
 * A simple Color RGBA class with 32-bit floats
 */
export default class ColorRGB32 {
   public _values: Float32Array;

   // Constants
   public static readonly Red = new ColorRGB32(1.0, 0.0, 0.0, 1.0);
   public static readonly Green = new ColorRGB32(0.0, 1.0, 0.0, 1.0);
   public static readonly Blue = new ColorRGB32(0.0, 0.0, 1.0, 1.0);

   /**
    * Create a new Color RGB32
    */
   constructor(color: ColorRGB32);
   constructor(r: number, g: number, b: number, a: number);
   constructor(fill?: number);
   constructor() {
      this._values = new Float32Array(4);
      
      // Check the number of arguments provided
      if (arguments.length == 1) {
         // Check if the single argument is a Vector2
         if (arguments[0] instanceof ColorRGB32) {
            // Copy the ColorRGB32
            this.equals(arguments[0]);
         } else if (!isNaN(arguments[0])) {
            // If the argument is a number, fill all components with it
            this.fill(arguments[0]);
         } else {
            // Unknown argument configuration, just zero the color
            this.zero();
         }
      } else if (arguments.length == 4) {
         // If there are 4 arguments, assign to each color value
         this.setValues(arguments[0], arguments[1], arguments[2], arguments[3]);
      } else {
         // Unknown argument configuration, just zero the vector
         this.zero();
      }
   }
   
   get values() {
      return this._values;
   }
   
   get r() {
      return this._values[0];
   }
   
   set r(value: number) {
      this._values[0] = value;
   }
   
   get g() {
      return this._values[1];
   }
   
   set g(value: number) {
      this._values[1] = value;
   }

   get b() {
      return this._values[2];
   }
   
   set b(value: number) {
      this._values[2] = value;
   }
   
   get a() {
      return this._values[3];
   }
   
   set a(value: number) {
      this._values[3] = value;
   }
   
   /**
   * Set the values for the color
   * @param {number} r - The Red value
   * @param {number} g - The Green value
   * @param {number} b - The Blue value
   * @param {number} a - The Alpha value
   * @return {ColorRGB32} This ColorRGB32 object
   */
   setValues(r: number, g: number, b: number, a: number) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      return this;
   }

   /**
   * Set this color equal to the passed color
   * @param {ColorRGB32} color - The color to set this color to
   * @return {ColorRGB32} This ColorRGB32 object
   */
   set(color: ColorRGB32) {
      return this.setValues(color.r, color.b, color.b, color.a);
   }
   
   fill(value: number)
   {
      this._values.fill(value);
   }

   /**
   * Set this color to equal the passed color
   * @param {ColorRGB32} vector - The color to set this vector to
   * @return {ColorRGB32} This ColorRGB32 object
   */
   equals(color: ColorRGB32) {
      return this.set(color);
   }

   /**
   * Returns a copy of this Color
   * @return {Clor4} A new ColorRGB32 object that is a copy of this color
   */
   copy() {
      return new ColorRGB32(this);
   }

   /** Zeros the vector components
   * @return {ColorRGB32} This ColorRGB32 object
   */
   zero() {
      return this.setValues(0.0, 0.0, 0.0, 0.0);
   }
}
