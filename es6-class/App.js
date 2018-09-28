class Counter extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = { count: 0 }
    this.click = this.click.bind(this);
  }
  click(value) {
    // alert("Clicked");
    console.log(value);
  }
  render() {
    console.log(this)
    return (
      <div onClick={() => this.click(10)}>{this.props.text}</div>
    )
  }
}

Counter.defaultProps = { text: "Hello" }
Counter.propTypes = { text: React.PropTypes.string }

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);