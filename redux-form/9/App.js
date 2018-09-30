const { Component } = React;
const { Provider } = ReactRedux;
const { reducer: formReducer, reduxForm, Field, FieldArray} = ReduxForm;

const renderField = ({input, label, type, className,meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} className={className}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
const renderHobbies = ({fields, meta: {error}}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}/>
        <Field name={hobby} type="text" component={renderField} label={`Hobby #${index + 1}`} className="form-control"/>
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)
const renderMembers = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Member</button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button type="button" title="Remove Member" onClick={() => fields.remove(index)} />
        <h4>Member #{index + 1}</h4>
        <Field name={`${member}.firstName`} type="text" component={renderField} label="First Name" className="form-control"/>
        <Field name={`${member}.lastName`} type="text" component={renderField} label="Last Name" className="form-control"/>
        <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
      </li>
    ))}
  </ul>
)
const FieldArraysForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="clubName" type="text" component={renderField} label="Club Name" className="form-control"/>
      <FieldArray name="members" component={renderMembers} />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

//--------------------
// Validate
//--------------------
const validate = values => {
  const errors = {}
  if (!values.clubName) {
    errors.clubName = 'Required'
  }
  if (!values.members || !values.members.length) {
    errors.members = {_error: 'At least one member must be entered'}
  } else {
    const membersArrayErrors = []
    values.members.forEach((member, memberIndex) => {
      const memberErrors = {}
      if (!member || !member.firstName) {
        memberErrors.firstName = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }
      if (!member || !member.lastName) {
        memberErrors.lastName = 'Required'
        membersArrayErrors[memberIndex] = memberErrors
      }
      if (member && member.hobbies && member.hobbies.length) {
        const hobbyArrayErrors = []
        member.hobbies.forEach((hobby, hobbyIndex) => {
          if (!hobby || !hobby.length) {
            hobbyArrayErrors[hobbyIndex] = 'Required'
          }
        })
        if (hobbyArrayErrors.length) {
          memberErrors.hobbies = hobbyArrayErrors
          membersArrayErrors[memberIndex] = memberErrors
        }
        if (member.hobbies.length > 5) {
          if (!memberErrors.hobbies) {
            memberErrors.hobbies = []
          }
          memberErrors.hobbies._error = 'No more than five hobbies allowed'
          membersArrayErrors[memberIndex] = memberErrors
        }
      }
    })
    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors
    }
  }
  return errors
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

const App =  reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate
})(FieldArraysForm)

//--------------------
// Render
//--------------------
ReactDOM.render(
	<Provider store={store}>
		<App onSubmit={onHandleSubmit}/>
	</Provider>,
	document.getElementById('root')
);