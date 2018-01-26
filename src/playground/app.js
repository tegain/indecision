class IndecisionApp extends React.Component {
	/**
	 * Calls super in constructor
	 *
	 * IMPORTANT: rebind 'this' to the current class on event handlers methods
	 * by overriding constructor(), because they lose the 'this' context.
	 *
	 * -> There is no need to rebind 'this' on constructor() and render() methods,
	 * because they're not event handlers, thus don't affect 'this' context
	 *
	 * @param props
	 */
	constructor (props) {
		super (props)
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
		this.handlePick = this.handlePick.bind(this)
		this.handleAddOption = this.handleAddOption.bind(this)
		this.handleDeleteOption = this.handleDeleteOption.bind(this)
		this.state = {
			options: []
		}
	}

	/**
	 * Lifecycle Methods
	 */
	componentDidMount () {
		try {
			const json = localStorage.getItem('options')
			const options = JSON.parse(json)

			if (options) {
				this.setState(() => ({ options }))
			}
		} catch (e) {
			// Do nothing at all
		}
	}

	componentDidUpdate (prevProps, prevState) {
		// Triggers only if there are changes
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options)
			localStorage.setItem('options', json)
		}
		console.log('componentDidUpdate!')
		console.log(prevProps, this.props)
		console.log(prevState, this.state)
	}

	componentWillUnmount () {
		console.log('componentWillUnmount!')
	}

	/**
	 *
	 * Child communication with parent:
	 *
	 * define methods where the state is (parent),
	 * then pass them as props into children components, who will be able to call them
	 * as 'this.props.parentMethod'
	 */
	handleDeleteOptions () {
		// this.setState(() => {
		// 	return {
		// 		options: []
		// 	}
		// })

		/**
		 * Simplified syntax to return an object:
		 * wrap it into parentheses
		 */
		this.setState(() => ({
			options: []
		}))
	}

	handleDeleteOption (option) {
		this.setState((prevState) => ({
			options: prevState.options.filter((opt) => option !== opt)
		}))
	}

	handlePick () {
		const randomNum = Math.floor(Math.random() * this.state.options.length)
		const randomOption = this.state.options[randomNum]
		alert(randomOption)
	}

	handleAddOption (option) {
		/**
		 * Add validation:
		 * if 'option' is empty string, or if 'option' already exists in state.options,
		 * returns error message to use in '<AddOption />' component
		 */
		if (!option) {
			return 'Enter valid value to add'
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists'
		}

		// Using spread operator
		this.setState((prevState) => ({
			options: [...prevState.options, option]
		}))

		// Using concat()
		// this.setState((prevState) => {
		// 	return {
		// 		options: prevState.options.concat(option)
		// 	}
		// })
	}

	render () {
		const subtitle = 'Put your life in the hands of the computer'

		return (
			<div>
				<Header subtitle={subtitle} />

				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>

				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>

				<AddOption handleAddOption={this.handleAddOption} />
			</div>
		)
	}
}

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subtitle && <h2>{props.subtitle}</h2>}
		</div>
	)
}

/**
 * Set default properties
 * @type {{title: string}}
 */
Header.defaultProps = {
	title: 'Indecision'
}

const Action = (props) => {
	return (
		<button
			disabled={!props.hasOptions}
			onClick={props.handlePick}>What should I do?</button>
	)
}

const Options = (props) => {
	return (
		<div>
			{
				props.options.length === 0 && <p>Please add options to start</p>
			}

			<button onClick={props.handleDeleteOptions}>Remove all</button>
			<ul>
				{
					props.options.map((option, index) => {
						return (
							<Option
								handleDeleteOption={props.handleDeleteOption}
								option={option}
								key={index}
							/>
						)
					})
				}
			</ul>
		</div>
	)
}

const Option = (props) => {
	return (
		<li>
			{props.option}
			<button
				/**
				 * Pass a function to prevent returning the event instead of the actual value
				 */
				onClick={(e) => {
					props.handleDeleteOption(props.option)
				}}
			>
				Remove
			</button>
		</li>
	)
}

class AddOption extends React.Component {
	/**
	 * We need to rebind 'this' for this context,
	 * because handleAddOption method is called in an event handler method
	 * @param props
	 */
	constructor (props) {
		super (props)
		this.handleAddOption = this.handleAddOption.bind(this)

		/**
		 * Set local (component) state with error message,
		 * returned from parent's handleAddOption() method
		 * undefined by default
		 */
		this.state = {
			error: undefined
		}
	}

	/**
	 * Keep this method because of the form validation,
	 * then call parent's method inside, as prop
	 * @param ev
	 */
	handleAddOption (ev) {
		ev.preventDefault();
		const field = ev.target.elements.option
		const option = field.value.trim()

		// Call method, and if there is a returned error message,
		// assign it to a new variable
		const error = this.props.handleAddOption(option)

		// Set state with new error message
		this.setState(() => ({
			error // same than -> error: error
		}))

		if (!error) {
			field.value = ''
		}
	}

	render () {
		return (
			<div>
				{
					// Display error message if it exists
					this.state.error && <p>{this.state.error}</p>
				}
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="option" placeholder="Add option here" />
					<button type="submit">Add option</button>
				</form>
			</div>
		)
	}
}


// stateless functional component
// const User = (props) => {
// 	return (
// 		<div>
// 			<p>Name: {props.name}</p>
// 			<p>Age: {props.age}</p>
// 		</div>
// 	)
// }

ReactDOM.render(<IndecisionApp /* options={['one', 'two']} // Passing props from here */ />, document.getElementById('root'))