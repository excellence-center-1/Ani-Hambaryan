//Write a function that takes in an array of strings and returns a new array with all the strings capitalized.

const string_capitalize = (arr_str) => {
  let new_arr = arr_str.map(element => element.toUpperCase());
  return new_arr;
}

console.log(string_capitalize(["aa", "bb"]));