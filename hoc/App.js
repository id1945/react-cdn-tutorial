const {Component} = React;

let BaseCount = (BasicComponent) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      text: "Hello"
    }
  }
  incrementCount() {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div className="container">
        <BasicComponent {...this.state} increment={this.incrementCount.bind(this)}/>
      </div>
    )
  }
}

const Button = (props) => {
  console.log(props)
  return (
    <button onClick={props.increment} className="btn btn-outline-success m-1">Count: {props.count}</button>
  )
}

const Label = (props) => {
  return (
    <label onMouseMove={props.increment} className="alert alert-success">Count: {props.count} </label>
  )
}

let ExtendedButton = BaseCount(Button);
let ExtendedLabel = BaseCount(Label);
const Container = () => {
    return(
      <div>
        <ExtendedLabel />
        <ExtendedButton />
      </div>
    )
}
ReactDOM.render(
  <Container />,
  document.getElementById('root')
);