var SecondComponent = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      name: 'Peter',
      location: 'New York'
    }
  },
  render: function() {
    let name = this.props.name;
    let location = this.props.location;
    return (
      <div>
        <p>Hello, {name}!</p>
        <p>I live in {location}</p>
      </div>
    )
  }
});
ReactDOM.render(
  <SecondComponent name="Simon" location="London"/>,
  document.getElementById('root')
);