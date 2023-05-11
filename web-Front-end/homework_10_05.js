let name = prompt("What is your name?");

if (!(/^[a-zA-Z]/.test(name) && name.length > 1)) {
  alert("Invalid name input!");
} else {
  let age = prompt("What is your age?");
  name = name.charAt(0).toUpperCase() + name.slice(1);
  if (isNaN(age) || age < 0) {
    alert("Age must be a positive number!");
  } else if (age <= 12) {
    alert(`Welcome ${name}! You are in childhood.`);
  } else if (age <= 19) {
    alert(`Welcome ${name}! You are in your teenage years.`);
  } else if (age <= 29) {
    alert(`Welcome ${name}! You are a young adult.`);
  } else if (age < 60) {
    alert(`Welcome ${name}! You are an adult.`);
  } else {
    alert(`Welcome ${name}! You are a senior.`);
  }
}