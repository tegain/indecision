class VisibilityToggle extends React.Component {
	constructor (props) {
		super (props)
		this.handleToggleVisibility = this.handleToggleVisibility.bind(this)
		this.state = {
			visibility: false
		}
	}

	handleToggleVisibility () {
		this.setState((prevState) => {
			return {
				visibility: !prevState.visibility
			}
		})
	}

	render () {
		return (
			<div>
				<h1>Visibility Toggle</h1>
				<button onClick={this.handleToggleVisibility}>
					{this.state.visibility ? 'Hide details' : 'Show details'}
				</button>
				{
					this.state.visibility && (
						<div>
							<p>Hey, these are some details you can now see!</p>
						</div>
					)
				}
			</div>
		)
	}
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('root'))

// const root = document.getElementById('root')
// let toggled = false
//
// // Methods
// const onToggleDetails = () => {
// 	toggled = !toggled
// 	renderApp()
// }
//
// const renderApp = () => {
// 	// Template
// 	const template = (
// 		<div>
// 			<h1>Visibility toggle</h1>
//
// 			<button onClick={onToggleDetails}>
// 				{toggled ? 'Hide details' : 'Show details'}
// 			</button>
//
// 			{toggled && (
// 				<div>
// 					<p>Here are the details</p>
// 				</div>
// 			)}
// 		</div>
// 	)
//
// 	ReactDOM.render(template, root)
// }
//
// renderApp()