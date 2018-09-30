const { Component } = React;
const { Provider, connect } = ReactRedux;
const { reducer: formReducer, reduxForm, Field, SubmissionError } = ReduxForm;

const SubmitValidationForm = (props) => {
    const { error, handleSubmit, pristine, reset, submitting } = props
    return (
		<form onSubmit={handleSubmit(onHandleSubmit)} className="col-4">
			<div className="mt-2 mb-2">
				<lable>User name:
					<Field name="username" type="text" component={renderField} className="form-control"/>
				</lable>
				<lable>Password:
					<Field name="password" type="password" component={renderField} className="form-control"/>
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
const renderField = ({ input, label, type, className ,meta: { touched, error, warning } }) => (
	<div>
		<input {...input} placeholder={label} type={type} className={className}/>
    	{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
	</div>
)
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
	form: 'submitValidation', // một mã định danh duy nhất cho biểu mẫu này
})(SubmitValidationForm);

//--------------------
// Render
//--------------------
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);