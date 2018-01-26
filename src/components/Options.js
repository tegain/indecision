import React from 'react'
import Option from './Option'

const Options = (props) => (
	<div>
		<div className="Widget__header">
			<h3>Your options</h3>
			<button
				disabled={props.options.length === 0}
				onClick={props.handleDeleteOptions}
				className="Button Button__link"
			>
				Remove all
			</button>
		</div>

		{
			props.options.length === 0 && <p className="Widget__slot">Please add options to start</p>
		}

		<ul className="Widget__body">
			{
				props.options.map((option, index) => {
					return (
						<Option
							handleDeleteOption={props.handleDeleteOption}
							option={option}
							key={index}
							count={index + 1}
						/>
					)
				})
			}
		</ul>
	</div>
)

export default Options