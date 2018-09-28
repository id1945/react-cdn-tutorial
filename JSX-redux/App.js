const Component = React.Component;
const { createStore } = Redux;
// same as
// var createStore = Redux.createStore; //es5
// import { createStore } from 'redux' //babel import

const Counter = ({value, onIncrement, onDecrement}) =>(
  <div>
      <h1>{value}</h1>
      <button onClick={onIncrement} className="btn btn-danger">+</button>
      <button onClick={onDecrement} className="btn btn-success">-</button>
  </div>
)

class App extends Component {
  onIncrementDispath() {
    console.log('dispath +');
    store.dispatch({type : 'INCREMENT'})
  }
  onDecrementDispath() {
    console.log('dispath -');
    store.dispatch({type : 'DECREMENT'})
  }
  render() {
    return (
      <Counter value={store.getState()}
        onIncrement={this.onIncrementDispath.bind(this)}
        onDecrement={this.onDecrementDispath.bind(this)}
      />
    );
  }
}

const counterReducer = (state = 0, action) => {
  console.log('reducer state:', state);
  console.log('reducer action:', action);
  switch(action.type){
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
};
const store = createStore(counterReducer);

const render = () => {
  ReactDOM.render(<App/>,document.getElementById('root'));
};

store.subscribe(render);

render();