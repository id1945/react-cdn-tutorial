const App = React.createClass({
  render: function() {
    return (
      <div>
        <h1>This is our first component</h1>
        <h2>Hello again!</h2>
      </div>
    )
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);