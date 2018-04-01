//var sum = require('./function1.js')

//test('that it gives a result of 3',)
// it('should return 3, given 1 and 2',()=>{
//   expect(sum(1,2)) // what to carry out
//   .toBe(3) // expected answer for comparison
// });

var divide = require('./function1.js')

describe("it tests divide function", ()=>{
  
  it('should return 3, given 6 and 2',()=>{
    expect(divide(6,2)) // what to carry out
    .toBe(3) // expected answer for comparison
  });

  it('should return error, if divide by 0',()=>{
    expect(divide(6,0)) // what to carry out
    .toMatch(/Error/) // expected answer for comparison
  });
  
})


