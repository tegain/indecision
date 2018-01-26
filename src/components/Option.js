import React from 'react'

const Option = (props) => (
	<li className="AppOption">
		<span className="AppOption__content">
			{props.count}. {props.option}
		</span>
		<button
			/**
			 * Pass a function to prevent returning the event instead of the actual value
			 */
			onClick={(e) => { props.handleDeleteOption(props.option) }}
			className="Button Button__link"
		>
			Remove
		</button>
	</li>
)

export default Option