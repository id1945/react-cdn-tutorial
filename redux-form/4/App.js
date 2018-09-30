const { Component } = React;
const { Provider, connect } = ReactRedux;
const { reducer: formReducer, reduxForm, Field } = ReduxForm;

const FieldLevelValidationForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>User Name:
					<Field name="username" component={input} type="text" 
					placeholder="user name" className="form-control"
					validate={[ required, maxLength15 ]}/>
				</label>
			</div>
			<div>
				<label>Email:
					<Field name="email" component={input} type="Email" 
					placeholder="email" className="form-control"
					validate={email} warn={aol}/>
				</label>
			</div>
			<div>
				<label>Age:
					<Field name="age" component={input} type="number" 
					placeholder="age" className="form-control"
					validate={[ required, number, minValue18 ]} warn={tooOld}/>
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
//--------------------
// Validate
//--------------------
const required = value => value ? undefined : 'Required'
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const tooOld = value => value && value > 65 ? 'You might be too old for this' : undefined
const aol = value => value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

//--------------------
// Input
//--------------------
// Đây làm input custom: so sánh với ví dụ 2 sẽ hiểu
const input = ({ input, label, type, className ,meta: { touched, error, warning } }) => (
	<div>
		<input {...input} placeholder={label} type={type} className={className}/>
    	{touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
	</div>
)

//--------------------
// Submit
//--------------------
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
	form: 'fieldLevelValidation', // một mã định danh duy nhất cho biểu mẫu này
	onSubmit: showResults,
})(FieldLevelValidationForm);

//--------------------
// Render
//--------------------
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);