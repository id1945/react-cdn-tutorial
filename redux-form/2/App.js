const { Component } = React;
const { Provider, connect } = ReactRedux;
const { reducer: formReducer, reduxForm, Field } = ReduxForm;

const SimpleForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>First Name:
					<Field name="firstName" component="input" type="text" placeholder="First Name" className="form-control"/>
				</label>
			</div>
			<div>
				<label>Last Name:
					<Field name="lastName" component="input" type="text" placeholder="Last Name" className="form-control"/>
				</label>
			</div>
			<div>
				<label>Email:
					<Field name="email" component="input" type="email" placeholder="Email" className="form-control"/>
				</label>
			</div>
			<div>
				<label>Sex</label>
				<div>
					<label>
						<Field name="sex" component="input" type="radio" value="male"/>
						{' '} Male
					</label>
					<label>
						<Field name="sex" component="input" type="radio" value="female"/>
						{' '} Female
					</label>
				</div>
			</div>
			<div>
				<label>Favorite Color
					<Field name="favoriteColor" component="select" className="form-control">
						<option />
						<option value="ff0000">Red</option>
						<option value="00ff00">Green</option>
						<option value="0000ff">Blue</option>
					</Field>
				</label>
			</div>
			<div>
				<label htmlFor="employed">Employed</label>
				<div>
					<Field name="employed" id="employed" component="input" type="checkbox" />
				</div>
			</div>
			<div>
				<label>Notes:
					<Field name="notes" component="textarea" className="form-control"/>
				</label>
			</div>
			<div>
				<button type="submit" disabled={pristine || submitting} className="btn btn-success mr-1">
					Submit
				</button>
				<button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-danger">
					Clear Values
				</button>
			</div>
		</form>
    )
}
const showResults = (values) => {
	window.alert(JSON.stringify(values));
}
//--------------------
// Redux
//--------------------
const rootReducer = Redux.combineReducers({
	form: formReducer
});

const store = Redux.createStore(rootReducer);

const App = reduxForm({
	form: 'simple', // một mã định danh duy nhất cho biểu mẫu này
	onSubmit: showResults
})(SimpleForm);

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);