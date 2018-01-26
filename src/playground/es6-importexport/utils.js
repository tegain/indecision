console.log('utils.js running')

// export at the end
// const square = (x) => x * x
// const add = (a, b) => a + b
// const substract = (a, b) => a - b
//
// export { square, add, substract as default }

// export in line
export const square = (x) => x * x
export const add = (a, b) => a + b

// const substract = (a, b) => a - b
// export default substract
// OR:
export default (a, b) => a - b


// In another file:
// import substract, { square, add } from './utils.js'
//
// console.log('app.js is running!')
// console.log(square(4))
// console.log(add(4, 52))
// console.log('substract', substract(10, 5))
//
// import isSenior, { isAdult, canDrink } from './person.js'
//
// console.log('isAdult', isAdult(24))
// console.log('canDrink', canDrink(28))
// console.log('isSenior', isSenior(66))