const {Component} = React;

class Counter extends Component {
  constructor(props) {
    super(props);
  }
  click (e) {
    alert("Clicked");
  }
  render () {
    return (
      <div>
        <Button className="btn blue-btn" clickHandler={this.click} text="Click me!" />
      </div>
    );
  }
}

// setup propTypes
Counter.defaultProps = {text: 'Hello'};
Counter.propTypes = { text: React.PropTypes.string }

const Button = (props) => {
  return(
    <button onClick={props.clickHandler}>{props.text}</button>
  );
}

ReactDOM.render(<Counter />,document.getElementById('root'));