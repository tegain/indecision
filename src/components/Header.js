import React from 'react'

const Header = (props) => (
	<div className="AppHeader">
		<div className="container">
			<h1 className="AppHeader__title">{props.title}</h1>
			{props.subtitle && <h2 className="AppHeader__subtitle">{props.subtitle}</h2>}
		</div>
	</div>
)

/**
 * Set default properties
 * @type {{title: string}}
 */
Header.defaultProps = {
	title: 'Indecision'
}

export default Header