// Arguments object - no longer bound with arrow functions

// Works
const add = function(a, b) {
	console.log(arguments)
	return a + b
}

// doesn't work
// const add = (a, b) => {
// 	console.log(arguments)
// 	return a + b
// }
// console.log(add(5, 5))

// this keyword - no longer bound
const user = {
	name: 'Mike',
	cities: ['Paris', 'Lille', 'Tokyo'],
	printPlaces: function () {
		console.log(this.name)
		console.log(this.cities)
	}
}
user.printPlaces()


const multiplier = {
	numbers: [1, 2, 3],
	multiplyBy: 3,
	multiply () {
		return this.numbers.map(number => number * this.multiplyBy)
	}
}

console.log(multiplier.numbers)
console.log(multiplier.multiply())
