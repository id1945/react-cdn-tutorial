//State Challenge Refactor 2
var CounterChallenge2 = React.createClass({
  getInitialState: function() {
    return {
      count: 0
    }
  },
  incrementCount: function(value) {
    this.setState({
      count: this.state.count + value
    })
  },
  getDefaultProps: function() {
    return {
      valueOne: 1,
      valueTwo: 5,
      valueThree: 10,
      text: 'Add'
    }
  },
  alert: function() {
    alert('Button Clicked - Delete')
    this.setState({
      count: 0
    })
  },
  render: function() {
    return (
      <div className="container">
        <h1>Count: {this.state.count}</h1>
        <Button style="btn btn-info m-1" text={`${this.props.text} ${this.props.valueOne}`} value={this.props.valueOne} clickHandler={this.incrementCount.bind(this, this.props.valueOne)} />
        <Button style="btn btn-success m-1" text={`${this.props.text} ${this.props.valueTwo}`} value={this.props.valueTwo} clickHandler={this.incrementCount.bind(this, this.props.valueTwo)} />
        <Button style="btn btn-warning m-1" text={`${this.props.text} ${this.props.valueThree}`} value={this.props.valueThree} clickHandler={this.incrementCount.bind(this, this.props.valueThree)} />
        <Button style="btn" text="Alert!" clickHandler={this.alert} />
      </div>
    )
  }  
});

var Button = function(props) {
  return (
    <button className={props.style} value={props.value} onClick={props.clickHandler}>{props.text}</button>
  )
};

ReactDOM.render(
<CounterChallenge2 valueOne={100} valueTwo={1000} valueThree={10000}/>, 
document.getElementById('root3'));

//State Challenge Refactor 1
var CounterChallenge = React.createClass({
  getInitialState: function() {
    return {
      count: 0
    }
  },
  incrementCount: function(value) {
    this.setState({
      count: this.state.count + value
    })
  },
  render: function() {
    return (
      <div className="container">
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.incrementCount.bind(this, 1)} className="btn btn-success m-1">Add 1</button>
        <button onClick={this.incrementCount.bind(this, 5)} className="btn btn-danger m-1">Add 5</button>
        <button onClick={this.incrementCount.bind(this, 10)} className="btn btn-info m-1">Add 10</button>
      </div>
    )
  }
});

ReactDOM.render( <CounterChallenge />,
  document.getElementById('root2'));

//State Challenge
var CounterChallenge = React.createClass({
  getInitialState: function() {
    return {
      count: 0
    }
  },
  incrementCountByOne: function(value) {
    this.setState({
      count: this.state.count + 1
    })
  },
  incrementCountByFive: function() {
    this.setState({
      count: this.state.count + 5
    })
  },
  incrementCountByTen: function() {
    this.setState({
      count: this.state.count + 10
    })
  },
  render: function() {
    return (
      <div className="container">
        <h1>Count: {this.state.count}</h1>
        <button className="btn btn-danger m-1" onClick={this.incrementCountByOne}>Add 1</button>
        <button className="btn btn-success m-1" onClick={this.incrementCountByFive}>Add 5</button>
        <button className="btn btn-info m-1" onClick={this.incrementCountByTen}>Add 10</button>
      </div>
    )
  }
});

ReactDOM.render(
  <CounterChallenge />,
  document.getElementById('root1')
);

// State
var NameStateComponent = React.createClass({
  resetName: function() {
    this.setState({
      name: ''
    })
  },
  nameChanged: function(event) {
    this.setState({
      name: event.target.value
    })
  },
  getInitialState: function() {
    return {
      name: ''
    }
  },
  render: function(){
    return (
      <div className="container">
        <input type='text' onChange={this.nameChanged} />
        <h1>Hello my name is {this.state.name} </h1>
        <button onClick={this.resetName}>Reset name</button>
      </div>
    )
  }
});
ReactDOM.render(
  <NameStateComponent />,
  document.getElementById('root')
);