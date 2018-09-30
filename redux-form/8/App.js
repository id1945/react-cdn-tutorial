const { Component } = React;
const { Provider, connect } = ReactRedux;
const { reducer: formReducer, reduxForm, Field , formValueSelector} = ReduxForm;

let SelectingFormValuesForm = props => {
  const {
    favoriteColorValue,
    fullName,
    handleSubmit,
    hasEmailValue,
    pristine,
    reset,
    submitting
  } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name
          <Field name="firstName" component="input" type="text" placeholder="First Name" className="form-control"/>
        </label>
      </div>
      <div>
        <label>Last Name
          <Field name="lastName" component="input" type="text" placeholder="Last Name" className="form-control"/>
        </label>
      </div>
      <div>
        <label htmlFor="hasEmail">Has Email?</label>
        <div>
          <Field name="hasEmail" id="hasEmail" component="input" type="checkbox"/>
        </div>
      </div>
      {hasEmailValue &&
        <div>
          <label>Email
            <Field name="email" component="input" type="email" placeholder="Email" className="form-control"/>
          </label>
        </div>}
      <div>
        <label>Favorite Color:
          <Field name="favoriteColor" component="select" className="form-control">
            <option />
            <option value="#ff0000">Red</option>
            <option value="#00ff00">Green</option>
            <option value="#0000ff">Blue</option>
          </Field>
        </label>
      </div>
      {favoriteColorValue &&
        <div
          style={{
            height: 80,
            width: 200,
            backgroundColor: favoriteColorValue
          }}
        />}
      <div className="mt-3">
        <button type="submit" disabled={pristine || submitting} className="btn btn-success mr-2">
          Submit {fullName}
        </button>
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
		window.alert(`Bạn đã gửi:\n${JSON.stringify(values, null, 2)}`)
}
//--------------------
// Redux
//--------------------
const rootReducer = Redux.combineReducers({
	form: formReducer
});
const store = Redux.createStore(rootReducer);

// Decorate with redux-form
SelectingFormValuesForm = reduxForm({
  form: 'selectingFormValues', // a unique identifier for this form
})(SelectingFormValuesForm)

// Decorate with connect to read form values
const selector = formValueSelector('selectingFormValues') // <-- same as form name
SelectingFormValuesForm = connect(state => {
  // can select values individually
  const hasEmailValue = selector(state, 'hasEmail')
  const favoriteColorValue = selector(state, 'favoriteColor')
  // or together as a group
  const {firstName, lastName} = selector(state, 'firstName', 'lastName')
  return {
    hasEmailValue,
    favoriteColorValue,
    fullName: `${firstName || ''} ${lastName || ''}`
  }
})(SelectingFormValuesForm)
//--------------------
// Render
//--------------------
ReactDOM.render(
	<Provider store={store}>
		<SelectingFormValuesForm onSubmit={onHandleSubmit}/>
	</Provider>,
	document.getElementById('root')
);