import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const OptionModal = (props) => {
	return (
		<Modal
			// converts to real boolean with 2 '!!'
			isOpen={!!props.selectedOption} // Required
			contentLabel="Selected Option" // Required: for accessibility
			onRequestClose={props.handleClearSelectedOption} // When users presses 'Esc' or clicks on the background
			closeTimeoutMS={200} // Timeout before closing and removing from DOM
			className="modal"
		>
			<h3 className="modal__title">Selected Option</h3>
			{props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
			<button onClick={props.handleClearSelectedOption} className="Button Button__small">Okay</button>
		</Modal>
	)
}

export default OptionModal