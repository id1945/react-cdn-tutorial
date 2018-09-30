const { Component } = React;
const { Provider, connect } = ReactRedux;
const { reducer: formReducer, reduxForm, Field } = ReduxForm;

const validate = values => {
	const errors = {}
	if (!values.username) {
	  	errors.username = 'Required'
	} else if (values.username.length > 15) {
	  	errors.username = 'Must be 15 characters or less'
	}
	if (!values.email) {
	  	errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
	  	errors.email = 'Invalid email address'
	}
	if (!values.age) {
	  	errors.age = 'Required'
	} else if (isNaN(Number(values.age))) {
	  	errors.age = 'Must be a number'
	} else if (Number(values.age) < 18) {
	  	errors.age = 'Sorry, you must be at least 18 years old'
	}
	return errors
  }
  
  const warn = values => {
	const warnings = {}
	if (values.age < 19) {
	  	warnings.age = 'Hmm, you seem a bit young...'
	}
	return warnings
  }
  
  const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
	<div>
		<label>{label}
			<input {...input} placeholder={label} type={type} className="form-control"/>
		</label>
		<div>
		{touched &&
			((error && <span className="text-danger">{error}</span>) ||
			(warning && <span className="text-warning">{warning}</span>))}
		</div>
	</div>
  )
  
  const SyncValidationForm = props => {
	const {handleSubmit, pristine, reset, submitting} = props
	return (
		<form onSubmit={handleSubmit}>
		<Field
			name="username"
			type="text"
			component={renderField}
			label="Username"
		/>
		<Field name="email" type="email" component={renderField} label="Email" />
		<Field name="age" type="number" component={renderField} label="Age" />
		<div>
			<button type="submit" disabled={submitting} className="btn btn-success mr-2">Submit</button>
			<button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-danger">
			Clear Values
			</button>
		</div>
		</form>
	)
}
//--------------------
// Submit
//--------------------
const onHandleSubmit = (values) => {
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
	form: 'syncValidation', // a unique identifier for this form
	validate, // <--- validation function given to redux-form
	warn, // <--- warning function given to redux-form
	onSubmit: onHandleSubmit
})(SyncValidationForm)
//--------------------
// Render
//--------------------
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);