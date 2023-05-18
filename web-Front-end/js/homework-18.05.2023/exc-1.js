const Rectangle = class {
  #_height;
  #_width;
  constructor(height, width) {
    this.#_height = height;
    this.#_width = width;
  }

  getArea() {
    return this.#_height * this.#_width;
  }
  getPerimeter() {
    return 2 * (this.#_height + this.#_width);
  }
  get width() {
    return this.#_width;
  }

  set width(newWidth) {
    if (newWidth <= 0 || isNaN(newWidth)) {
      console.error("Invalid width value. Width must be a positive number.");
    } else {
      this.#_width = newWidth;
    }
  }
  get height() {
    return this.#_height;
  }
  set height(newHeight) {
    if (newHeight <= 0 || isNaN(newHeight)) {
      console.error("Invalid height value. Height must be a positive number.");
    } else {
      this.#_height = newHeight;
    }
  }
};

// Create an instance of Rectangle
const rectangle = new Rectangle(5, 10);
// Display the area and perimeter
console.log("Area:", rectangle.getArea()); // Output: 50
console.log("Perimeter:", rectangle.getPerimeter()); // Output: 30
// Update the width and height using the setter methods
rectangle.width = 8;
rectangle.height = 15;
// Display the updated area and perimeter
console.log("Updated Area:", rectangle.getArea()); // Output: 120
console.log("Updated Perimeter:", rectangle.getPerimeter()); // Output: 46
// // Try setting invalid values
rectangle.width = -2; // Invalid width value. Width must be a positive number.
rectangle.height = 0; // Invalid height value. Height must be a positive number.
