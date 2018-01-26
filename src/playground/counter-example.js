class Counter extends React.Component {
	constructor (props) {
		super (props)
		// Rebind 'this' to the class component so it's not undefined
		this.handleAddOne = this.handleAddOne.bind(this)
		this.handleMinusOne = this.handleMinusOne.bind(this)
		this.handleReset = this.handleReset.bind(this)
		this.state = {
			count: 0
		}
	}

	componentDidMount () {
		const storedCount = localStorage.getItem('count')
		const count = parseInt(storedCount)

		if (count && !isNaN(count)) {
			this.setState(() => ({ count }))
		}
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState.count !== this.state.count) {
			localStorage.setItem('count', this.state.count)
		}
	}

	handleAddOne () {
		// setState() takes 'previous state' as argument
		this.setState((previousState) => {
			return {
				count: previousState.count + 1
			}
		})
	}

	handleMinusOne () {
		this.setState((previousState) => {
			return {
				count: previousState.count - 1
			}
		})
	}

	handleReset () {
		this.setState(() => {
			return {
				count: 0
			}
		})

		/**
		 * Do not use:
		 * Old way to setState: with an object
		 *
		 * It works, but when in need to have two setState() calls at the same time (whether in the same method or not),
		 * and because setState() is ASYNC method, the result can be not as expected.
		 *
		 * In this case, it's always preferred to use the function arg,
		 * because it will take the previous state as argument
		 *
		 * -> In general, always prefer using setState() with function argument
		 *
		 */
		// this.setState({ count: 0 })
	}

	render () {
		return (
			<div>
				<h1>Count: {this.state.count}</h1>
				<button onClick={this.handleAddOne}>+1</button>
				<button onClick={this.handleMinusOne}>-1</button>
				<button onClick={this.handleReset}>reset</button>
			</div>
		)
	}
}

ReactDOM.render(<Counter />, document.getElementById('root'))


// let count = 0
// const style = {
// 	btn: {
// 		margin: '0 5px'
// 	}
// }
//
// /**
//  * Needs rerender everytime changing variable, otherwise the DOM is not updated because the variable keeps its first value
//  */
// const addOne = () => {
// 	count = count + 1
// 	renderCounterApp()
// }
// const minusOne = () => {
// 	count = count - 1
// 	renderCounterApp()
// }
// const reset = () => {
// 	count = 0
// 	renderCounterApp()
// }
//
// const root = document.getElementById('root')
//
// const renderCounterApp = () => {
// 	const templateTwo = (
// 		<div>
// 			<h1>Count: {count}</h1>
// 			<button className='btn btn-minusone' style={style.btn} onClick={minusOne}>-1</button>
// 			<button className='btn btn-reset' style={style.btn} onClick={reset}>reset</button>
// 			<button className='btn btn-plusone' style={style.btn} onClick={addOne}>+1</button>
// 		</div>
// 	)
//
// 	/**
// 	 * Takes 2 args: template to render, and where to render it
// 	 */
// 	ReactDOM.render(templateTwo, root)
// }
//
// renderCounterApp()