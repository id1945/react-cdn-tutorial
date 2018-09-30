const { Component } = React;
const { Provider , connect} = ReactRedux;
const { reducer: formReducer, reduxForm, Field, submit, SubmissionError} = ReduxForm;

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const RemoteSubmitForm = props => {
  const {error, handleSubmit} = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      {error && <strong>{error}</strong>}
      <div>
        No submit button in the form. The submit button below is a separate unlinked component.
      </div>
    </form>
  )
}

//--------------------
// dispatch
//--------------------
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
function submitFunction(values) {
  return sleep(1000).then(() => {
    // simulate server latency
    if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!'
      })
    } else if (values.password !== 'redux-form') {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })
    } else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
  })
}

//--------------------
// dispatch
//--------------------
const style = {
  padding: '10px 20px',
  width: 140,
  display: 'block',
  margin: '20px auto',
  fontSize: '16px'
}

const RemoteSubmitButton = ({dispatch}) => (
  <button
    type="button"
    style={style}
    onClick={() => dispatch(submit('remoteSubmit'))}
  >
    Submit
  </button>
)
connect()(RemoteSubmitButton)
//--------------------
// Redux
//--------------------
const rootReducer = Redux.combineReducers({
	form: formReducer
});
const store = Redux.createStore(rootReducer);

const App = reduxForm({
  form: 'remoteSubmit', // a unique identifier for this form
  onSubmit: submitFunction // submit function must be passed to onSubmit
})(RemoteSubmitForm)

//--------------------
// Render
//--------------------
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);