const { Component } = React;
const { Provider, connect } = ReactRedux;
const { reducer: formReducer, reduxForm, Field, SubmissionError } = ReduxForm;

const AsyncValidationForm = (props) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
		<form onSubmit={handleSubmit(onHandleSubmit)} className="col-4">
			<div className="mt-2 mb-2">
				<lable>User name:
					<Field name="username" type="text" component={renderField} classInput="form-control"/>
				</lable>
				<lable>Password:
					<Field name="password" type="password" component={renderField} classInput="form-control"/>
				</lable>
			</div>
			<div>
				<button type="submit" disabled={submitting} className="btn btn-success mr-2">Log In</button>
				<button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-danger">Clear Values</button>
			</div>
			{error ? (
				<label className="alert alert-danger mt-2">
					<strong>{error}</strong>
				</label>) : <div/>
			}
		</form>
    )
}
//--------------------
// Input
//--------------------
const renderField = ({ input, label, type, classInput ,meta: { asyncValidating, touched, error, warning } }) => (
	<div>
		<input {...input} placeholder={label} type={type} className={asyncValidating ? classInput + ' loading' : classInput}/>
    	{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
	</div>
)
//--------------------
// Validate
//--------------------
const validate = values => {
	const errors = {}
    if (!values.username) {
		errors.username = 'Required'
    }
    if (!values.password) {
		errors.password = 'Required'
    }
    return errors
}
//--------------------
// Async - Validate Không đồng bộ
//--------------------
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'That username is taken' }
    }
  })
}
//--------------------
// Submit
//--------------------
const onHandleSubmit = (values) => {
	if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
		throw new SubmissionError({
			username: 'Người dùng không tồn tại',
			_error: 'Login failed!'
		})
	} else if (values.password !== 'redux-form') {
		throw new SubmissionError({
			password: 'Sai mật khẩu',
			_error: 'Login failed!'
		})
	} else {
		window.alert(`Bạn đã gửi:\n\n${JSON.stringify(values, null, 2)}`)
	}
}
//--------------------
// Redux
//--------------------
const rootReducer = Redux.combineReducers({
	form: formReducer
});

const store = Redux.createStore(rootReducer);

const App = reduxForm({
	form: 'asyncValidation', // a unique identifier for this form
	validate,
	asyncValidate,
	asyncBlurFields: [ 'username' ],
	onSubmit: onHandleSubmit
  })(AsyncValidationForm)

//--------------------
// Render
//--------------------
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);