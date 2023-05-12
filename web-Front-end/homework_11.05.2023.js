const books = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 336 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180 },
  { title: "1984", author: "George Orwell", pages: 328 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 224 },
  { title: "Brave New World", author: "Aldous Huxley", pages: 288 }
]

//Task 2: Use a loop to iterate through the array and print out the title of each book
books.forEach(element => console.log(element.title));

console.log("\n--------\n");

//Task 3: Use a loop to iterate through the array and print out the title of each book
let sum = books.reduce((sum, value) => sum + value.pages, 0)
console.log(`Total number of pages ${sum}`)

console.log("\n--------\n");

// Task 4: Use a loop to find the book with the most pages
let max = Math.max.apply(null, (books.map(element => element.pages)))
console.log(`The book with the most pages is 'To Kill a Mockingbird' with ${max} pages`);

console.log("\n--------\n");

//Task 5: Use a loop to find the book with the shortest title
let min_length = Math.min.apply(null, (books.map(element => element.title.length)))
let title_min_length;
for (let i = 0; i < books.length; i++) {
  if (books[i].title.length == min_length) {
    title_min_length = books[i].title
  }
}
// let found = arr.find(element => element.title.length ==min)
console.log(`The book with the shortest title is  '${title_min_length}'`);

console.log("\n--------\n");

//Task 6: Use a loop to create an array of all the authors in the array of books
let authors=arr.map(element => element.author);
console.log(authors)

console.log("\n--------\n");





//Task 7: Use a loop to create an array of objects representing authors. Each author object should have a name and an array of books they have written
arr1 = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 336 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180 },
  { title: "1984", author: "George Orwell", pages: 328 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 224 },
  { title: "AAA", author: "Harper Lee", pages: 336 },
  { title: "BBB", author: "F. Scott Fitzgerald", pages: 180 },
  { title: "CCC", author: "George Orwell", pages: 328 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 224 },
  { title: "Brave New World", author: "Aldous Huxley", pages: 288 },
  { title: "DDD", author: "F. Scott Fitzgerald", pages: 180 },
  { title: "DDD", author: "George Orwell", pages: 328 },
]

// for (const [key, value] of Object.entries(arr)) {
//   console.log(`${key}: ${value}`);
// }


