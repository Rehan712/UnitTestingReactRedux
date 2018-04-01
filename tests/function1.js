// function sum(a, b) {
//   return a + b;
// }

// module.exports = sum;

// To test this
// Give inputs and expect an output

function divide(a, b) {
  if(b===0) {
    return "Error - Cannot divide by zero"
  }
  return a / b;
}

module.exports = divide;