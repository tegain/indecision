class Person {
	constructor (name = 'Anonymous', age = 0) {
		this.name = name
		this.age = age
	}

	getGreeting () {
		return `Hi, I am ${this.name}!`
	}

	getDescription () {
		return `${this.name} is ${this.age} year(s) old.`
	}
}

class Student extends Person {
	constructor (name, age, major) {
		super (name, age)
		this.major = major
	}

	hasMajor () {
		return !!this.major // '!!' OR operator: double-flip the value to have truethy or falsy return
	}

	// Overwrite parent method
	/* getDescription () {
		return 'Overwriting parent getDescription() method.'
	} */

	// Complete / Use and modify parent method
	getDescription () {
		let description = super.getDescription()

		// If a major is defined, complete desrciption and return it
		// Otherwise, user parent description
		if (this.hasMajor()) {
			description += ` Their major is ${this.major}.`
		}

		return description
	}
}

class Traveler extends Person {
	constructor (name, age, homeLocation) {
		super (name, age)
		this.homeLocation = homeLocation
	}

	getGreeting () {
		let greeting = super.getGreeting()

		if (this.homeLocation) {
			greeting += ` I am visiting from ${this.homeLocation}`
		}

		return greeting
	}
}

const me = new Student('Thomas Egain', 28, 'Graphic Design');
console.log(me)
console.log(me.getDescription())

const other = new Student(undefined, 17)
console.log(other)
console.log(other.getDescription())

const travelerOne = new Traveler('Thomas', 28, 'Lille')
console.log(travelerOne)
console.log(travelerOne.getGreeting())

const travelerTwo = new Traveler(undefined, 24)
console.log(travelerTwo)
console.log(travelerTwo.getGreeting())