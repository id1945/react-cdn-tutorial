var TaskList  = React.createClass({

  getInitialState: function() {
    return {
      tasks: [
        {title: 'Clean dishes', id: 1},
        {title: 'Take out the bins', id: 2},
        {title: 'Change bed', id:3}
      ]
    }
  },
  render: function() {
    return (
      <ul>
          {this.state.tasks.map(function(task){
            return <Task title={task.title} key={task.id}/>
          })}
      </ul>
    )
  }
});

var Task = function(props) {
  return <li>{props.title}</li>
}
ReactDOM.render(
  <TaskList />,
  document.getElementById('root')
);