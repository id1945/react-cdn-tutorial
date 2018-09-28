var Lifecycle = React.createClass({

  increment: function() {
    this.setState({
      count: this.state.count + 1
    })
  },
  getDefaultState: function() {
    console.log("get default state");
  },
  getInitialState: function() {
    console.log("get initial state");
    return({
      count: 0
    })
  },
  componentWillMount: function() {
    console.log("Component is mounting");
  },
  render: function() {
    console.log("Component is rendered");
    return (
      <button onClick={this.increment} className="btn btn-warning m-1">{this.state.count}</button>
    )
  },
  componentDidMount: function() {
    console.log("Component has rendered");
    this.interval = setInterval(this.increment, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
    console.log('Component Unmounted!');
  }
});
var LifecycleContainer = React.createClass({
  mount: function() {
    ReactDOM.render(<Lifecycle/>, document.getElementById('rootTest'));
  },
  unmount: function() {
    ReactDOM.unmountComponentAtNode(document.getElementById('rootTest'));
  },
  render: function() {
    console.log("LifecycleContainer Rendered");
    return (
      <div>
        <button onClick={this.mount} className="btn m-1 btn-success">Mount</button>
        <button onClick={this.unmount} className="btn m-1 btn-danger">Unmount</button>
      </div>
    );
  }
});

ReactDOM.render(
  <LifecycleContainer />,
  document.getElementById('root')
);

var LikesComponent = React.createClass({
  updateLikes: function() {
    ReactDOM.render(
      <LikesComponent likes={this.props.likes+1}/>,
      document.getElementById("rootTest2")
    )
  },
  getDefaultProps: function() {
    return({
      likes: 0
    })
  },
  getInitialState: function() {
    return({
      popular: false
    })
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      popular: nextProps.likes >= 10
    })
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.likes % 2 === 0;
  },
  render: function() {
    console.log("Component Rendered");
    return (
      <div className="container">
        <h1>{this.state.popular ? "I'm popular" : null}</h1>
        <button className="btn btn-info m-1" onClick={this.updateLikes}>Likes: {this.props.likes}</button>
      </div>
    )
  },
  componentDidUpdate: function(prevProps, prevState) {
    console.log("Previous Props ", prevProps);
    console.log("Previous State ", prevState);
    console.log(ReactDOM.findDOMNode(this));
  }
});
ReactDOM.render(
  <LikesComponent />,
  document.getElementById("rootTest2")
);