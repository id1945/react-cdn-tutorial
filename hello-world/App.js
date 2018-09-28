const {Component} = React;

class App extends Component {

  render () {
    const style = {
      textDecoration: 'line-through'  
    };
    return (
      <div>
        <h1 className="text-danger" style={style}>Hello World</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />,document.getElementById('root'));