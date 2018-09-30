const { Component } = React;
const { Provider, connect } = ReactRedux;
const { reducer: formReducer, reduxForm, Field } = ReduxForm;

const data = {
  // used to populate "account" reducer when "Load" is clicked
  firstName: 'Jane',
  lastName: 'Doe',
  age: '42',
  sex: 'female',
  employed: true,
  favoriteColor: 'Blue',
  bio: 'Born to write amazing Redux code.'
}
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

let InitializeFromStateForm = props => {
  const {handleSubmit, load, pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button type="button" onClick={() => load(data)} className="btn btn-info">Load Account</button>
      </div>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Age</label>
        <div>
          <Field name="age" component="input" type="number" placeholder="Age" />
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field name="sex" component="input" type="radio" value="male" />
            {' '}
            Male
          </label>
          <label>
            <Field name="sex" component="input" type="radio" value="female" />
            {' '}
            Female
          </label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option value="">Select a color...</option>
            {colors.map(colorOption => (
              <option value={colorOption} key={colorOption}>
                {colorOption}
              </option>
            ))}
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>Bio</label>
        <div>
          <Field name="bio" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting} className="mr-1 btn btn-success">Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-danger">
          Undo Changes
        </button>
      </div>
    </form>
  )
}


//--------------------
// Submit
//--------------------
const load = (data) => {
  windown.alert(data);
}
//--------------------
// Submit
//--------------------
const onHandleSubmit = (values) => {
		window.alert(`Bạn đã gửi:\n${JSON.stringify(values, null, 2)}`)
}
//--------------------
// Reducer
//--------------------
const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD':
      return {
        data: action.data
      }
    default:
      return state
  }
}
//--------------------
// Redux
//--------------------
const rootReducer = Redux.combineReducers({
	accountReducer,
	form: formReducer
});

const store = Redux.createStore(rootReducer);

const App = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
	onSubmit: onHandleSubmit,
	loadAccount
})(InitializeFromStateForm)

const loadAccount = data => ({type: 'LOAD', data})

InitializeFromStateForm = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
  {load: loadAccount} // bind account loading action creator
)(InitializeFromStateForm)

//--------------------
// Render
//--------------------
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);