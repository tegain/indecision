import React from 'react'
import Header from './Header'
import AddOption from './AddOption'
import Options from './Options'
import Action from './Action'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
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
	// No need -> using ES6 properties syntax
	// constructor (props) {
	// 	super (props)
	// 	this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
	// 	this.handlePick = this.handlePick.bind(this)
	// 	this.handleAddOption = this.handleAddOption.bind(this)
	// 	this.handleDeleteOption = this.handleDeleteOption.bind(this)
	// 	this.state = {
	// 		options: []
	// 	}
	// }

	state = {
		options: [],
		selectedOption: undefined
	}

	/**
	 *
	 * Child communication with parent:
	 *
	 * define methods where the state is (parent),
	 * then pass them as props into children components, who will be able to call them
	 * as 'this.props.parentMethod'
	 */
	handleDeleteOptions = () => {
		/**
		 * Simplified syntax to return an object:
		 * wrap it into parentheses
		 */
		this.setState(() => ({
			options: []
		}))
	}

	handleDeleteOption = (option) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((opt) => option !== opt)
		}))
	}

	handlePick = () => {
		const randomNum = Math.floor(Math.random() * this.state.options.length)
		const randomOption = this.state.options[randomNum]
		this.setState(() => ({
			selectedOption: randomOption
		}))
	}

	handleAddOption = (option) => {
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
	}

	handleClearSelectedOption = () => {
		this.setState(() => ({
			selectedOption: undefined
		}))
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

	render () {
		const subtitle = 'Put your life in the hands of the computer'

		return (
			<div>
				<Header subtitle={subtitle} />

				<div className="container">
					<Action
						hasOptions={this.state.options.length > 0}
						handlePick={this.handlePick}
					/>

					<div className="Widget">
						<Options
							options={this.state.options}
							handleDeleteOptions={this.handleDeleteOptions}
							handleDeleteOption={this.handleDeleteOption}
						/>

						<AddOption handleAddOption={this.handleAddOption} />
					</div>
				</div>

				<OptionModal
					selectedOption={this.state.selectedOption}
					handleClearSelectedOption={this.handleClearSelectedOption}
				/>
			</div>
		)
	}
}