import { nearlyEqual, SMALL_NUMBER } from "../numbers/floating.js";

/**
 * A simple 2D vector class
 */
export default class Vector2 {
   public _coords: Float32Array;

   // Constants
   public static readonly ZERO = new Vector2(0.0, 0.0);
   public static readonly RIGHT = new Vector2(1.0, 0.0);
   public static readonly UP = new Vector2(0.0, 1.0);

   /**
    * Create a new Vector2
    */
   constructor(vector: Vector2);
   constructor(x: number, y: number);
   constructor(fill?: number);
   constructor() {
      this._coords = new Float32Array(2);
      
      // Check the number of arguments provided
      if (arguments.length == 1) {
         // Check if the single argument is a Vector2
         if (arguments[0] instanceof Vector2) {
            // Copy the Vector2
            this.equals(arguments[0]);
         } else if (!isNaN(arguments[0])) {
            // If the argument is a number, fill all components with it
            this.fill(arguments[0]);
         } else {
            // Unknown argument configuration, just zero the vector
            this.zero();
         }
      } else if (arguments.length == 2) {
         // If there are 2 arguments, try to assign them to the vector's components
         this.setComponents(arguments[0], arguments[1]);
      } else {
         // Unknown argument configuration, just zero the vector
         this.zero();
      }
   }
   
   get coords() {
      return this._coords;
   }
   
   get x() {
      return this._coords[0];
   }
   
   set x(value: number) {
      this._coords[0] = value;
   }
   
   get y() {
      return this._coords[1];
   }
   
   set y(value: number) {
      this._coords[1] = value;
   }

   /**
   * Set the components for the vector
   * @param {number} x - The X component
   * @param {number} y - The Y component
   * @return {Vector2} This Vector2 object
   */
   setComponents(x: number, y: number) {
      this.x = x;
      this.y = y;
      return this;
   }

   /**
   * Set this vector to equal the passed vector
   * @param {Vector2} vector - The vector to set this vector to
   * @return {Vector2} This Vector2 object
   */
   set(vector: Vector2) {
      return this.setComponents(vector.x, vector.y);
   }
   
   fill(value: number)
   {
      this._coords.fill(value);
   }

   /**
   * Set this vector to equal the passed vector
   * @param {Vector2} vector - The vector to set this vector to
   * @return {Vector2} This Vector2 object
   */
   equals(vector: Vector2) {
      return this.set(vector);
   }

   /**
   * Returns a copy of this vector
   * @return {Vector2} A new Vector2 object that is a copy of this vector
   */
   copy() {
      return new Vector2(this);
   }

   /** Zeros the vector components
   * @return {Vector2} This Vector2 object
   */
   zero() {
      return this.setComponents(0.0, 0.0);
   }

   /**
   * Multiply this vector's components by a scalar value
   * @param {number} value - The scalar value to multiply this vector by
   * @return {Vector2} This Vector2 object
   */
   scalarMul(value: number) {
      this.x *= value;
      this.y *= value;
      return this;
   }

   /**
   * Divide this vector's components by a scalar value
   * @param {number} value - The scalar balue to divide this vector by
   * @return {Vector2} This Vector2 object
   */
   scalarDiv(value: number) {
      this.x /= value;
      this.y /= value;
      return this;
   }

   /**
   * Add another vector's components to this vector's components
   * @param {Vector2} vector - The vector to add to this vector
   * @return {Vector2} This Vector2 object
   */
   add(vector: Vector2) {
      this.x += vector.x;
      this.y += vector.y;
      return this;
   }

   /**
   * Subtract another vector's components to this vector's components
   * @param {Vector2} vector - The vector to subtract from this vector
   * @return {Vector2} This Vector2 object
   */
   sub(vector: Vector2) {
      this.x -= vector.x;
      this.y -= vector.y;
      return this;
   }

   // Multiply another vector's components to this vector's components
   mul(vector: Vector2) {
      this.x *= vector.x;
      this.y *= vector.y;
      return this;
   }

   /**
   * Divide this vector's components by another vector's components
   * @param {Vector2} vector - The vector to to use for dividing each of this vector's components
   * @return {Vector2} This Vector2 object
   */
   div(vector: Vector2) {
      this.x /= vector.x;
      this.y /= vector.y;
      return this;
   }

   /**
   * Returns the length of the vector
   * @return {number} The length of this vector
   */
   length() {
      return Math.sqrt(this.lengthSq());
   }

   /**
   * Returns the squared length of the vector
   * @return {number} The squared length of this vector
   */
   lengthSq() {
      return this.dot(this);
   }

   /**
   * Returns the result of the dot product of this vector with the passed vector
   * @return {number} The dot product of this vector and the passed vector
   */
   dot(vector: Vector2) {
      return (this.x * vector.x) + (this.y * vector.y);
   }

   /**
   * ReturnsB true if the vector is a normalized unit vector, false if it is not
   * @return {boolean} True if this vector is normalized (has unit length), False if it is not
   */
   isNormalized() {
      const lengthSq = this.lengthSq();
      return nearlyEqual(lengthSq, 1.0);
   }

   /**
   * Noramalizes the vector's length to convert it to a unit vector in the same direction
   * @return {Vector2} This vector object
   */
   normalize() {
      // If the length of the vectors is smaller than epsilon, default to the right facing unit vector
      const vectorLength = this.length();
      if (vectorLength < SMALL_NUMBER) {
      this.equals(Vector2.RIGHT);
      }

      // Divide each of the components by the vector's length to generate a unit vector
      return this.scalarDiv(vectorLength);
   }

   /**
   * Creates a copy of this vector that is normalized to a unit vector
   * @return {Vector2} A new Vector2 object that is a normalized copy of this vector
   */
   normalizeCopy() {
      let newVector = new Vector2(this);
      return newVector.normalize();
   }
}
