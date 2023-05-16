//Write a function that takes in an array of numbers and returns the sum of all the even numbers in the array.

const sum = (arr) => {
  let s = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      s += arr[i];
    }
  }
  return s;
}

console.log(sum([5, 4, 3, 8, 12]));
