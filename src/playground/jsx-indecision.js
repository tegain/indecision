// JSX - JavaScript XML

// Only render subtitle (and p tag) if subtitle exist
// render new p tag - if options.length > 0 "Here are your options" "No options"
const app = {
	title: 'Indecision app',
	subtitle: 'This is a subtitle',
	options: []
}

const onFormSubmit = (ev) => {
	ev.preventDefault()

	// Get input[name=option] value
	const option = ev.target.elements.option.value

	if (option) {
		// Push to app.options
		app.options.push(option)

		// Empty input value
		ev.target.elements.option.value = ''

		// rerender
		renderAppTemplate()
	}
}

const onRemoveAll = () => {
	app.options = []
	renderAppTemplate()
}

const root = document.getElementById('root')
const renderAppTemplate = () => {
	const template = (
		<div>
			<h1>{app.title}</h1>
			{ app.subtitle && <p>{app.subtitle}</p> }
			<p>{ (app.options && app.options.length > 0) ? 'Here are your options' : 'No options' }</p>
			<p>Options : {app.options.length}</p>
			<button onClick={onRemoveAll}>Remove all</button>

			<ul>
				{
					app.options.map((opt, index) => {
						return <li key={index}>{opt}</li>
					})
				}
			</ul>

			<form onSubmit={onFormSubmit}>
				<input type="text" name="option" />
				<button type="submit">Add option</button>
			</form>
		</div>
	)

	ReactDOM.render(template, root)
}

renderAppTemplate()