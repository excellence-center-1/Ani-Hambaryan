/*Create a class called MathUtils that contains static methods for performing various mathematical operations. 
 -----------------------------------------*/
const MathUtils = class {
  //MathUtils.sum(numbers): Accepts an array of numbers and returns the sum of all the numbers.
  static sum(numbers) {
    return numbers.reduce((accuml, element) => (accuml += element));
  }
  // MathUtils.average(numbers): Accepts an array of numbers and returns the average (mean) of the numbers.
  static average(numbers) {
    return MathUtils.sum(numbers) / numbers.length;
  }
  //MathUtils.max(numbers): Accepts an array of numbers and returns the maximum number in the array.
  static max(numbers) {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      max = numbers[i] > max ? numbers[i] : max;
    }
    return max;
  }
  // MathUtils.min(numbers): Accepts an array of numbers and returns the minimum number in the array.
  static min(numbers) {
    let min = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      min = numbers[i] < min ? numbers[i] : min;
    }
    return min;
  }
};

const numbers = [5, 2, 9, 1, 7];
console.log(`sum = ${MathUtils.sum(numbers)}`); //Sum: 24
console.log(`sum = ${MathUtils.average(numbers)}`); //Average: 4.8
console.log(`max = ${MathUtils.max(numbers)}`); // Max: 9
console.log(`min = ${MathUtils.min(numbers)}`); //Min: 1
