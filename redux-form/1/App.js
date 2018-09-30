const { Component } = React;
const { Provider, connect } = ReactRedux;
const { reducer: formReducer, reduxForm, Field } = ReduxForm;

// -------------------
// COMPONENTS
// -------------------
const SimpleForm = (props) => {
	const { handleSubmit, pristine, reset, submitting, firstName } = props;
	const formDisabled = pristine || submitting;
	const _onSubmit = (data) => {
		console.log('-->onSubmit:',data);
	};

	return (
		<form>
			<div>
				<label>First Name:
					<Field name="firstName" component="input" type="text" placeholder="First Name" className="form-control"/>
				</label>
			</div>
			<div>
				<button type="submit" disabled={formDisabled} onClick={handleSubmit(_onSubmit)} className="btn btn-success mr-1">Submit</button>
				<button type="button" disabled={formDisabled} onClick={reset} className="btn btn-danger">Clear Values</button>
			</div>
		</form>
	);
};
const App = reduxForm({
	form: 'simple'
})(SimpleForm);

//--------------------
// Redux
//--------------------
const rootReducer = Redux.combineReducers({
	form: formReducer
});
const store = Redux.createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

console.log('done');