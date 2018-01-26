import React from "react";

export default class AddOption extends React.Component {
	/**
	 * Set local (component) state with error message,
	 * returned from parent's handleAddOption() method
	 * undefined by default
	 */
	// New ES6 Class properties syntax (babel 'transform-class-properties' plugin)
	state = {
		error: undefined
	}

	/**
	 * We need to rebind 'this' for this context,
	 * because handleAddOption method is called in an event handler method
	 * @param props
	 */
	// No need to rebind 'this' if we use class properties ES6 syntax, defining arrow functions for methods
	// constructor (props) {
	// 	super (props)
	// 	this.handleAddOption = this.handleAddOption.bind(this)
	// }

	/**
	 * Keep this method because of the form validation,
	 * then call parent's method inside, as prop
	 * @param ev
	 */
	handleAddOption = (ev) => {
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
			<div className="AddOption">
				{
					// Display error message if it exists
					this.state.error && <p className="AddOption__error">{this.state.error}</p>
				}
				<form onSubmit={this.handleAddOption} className="AddOption__form">
					<input type="text" name="option" placeholder="Add option here" className="AddOption__input" />
					<button type="submit" className="Button Button__small AddOption__submit">Add option</button>
				</form>
			</div>
		)
	}
}