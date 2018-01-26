import React from 'react'

const Action = (props) => (
	<button
		disabled={!props.hasOptions}
		onClick={props.handlePick}
		className="Button Button__big"
	>
		What should I do?
	</button>
)

export default Action