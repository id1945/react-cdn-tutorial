let Component = React.Component;
let Route = ReactRouter.Route;
let Router = ReactRouter.Router;
let hashHistory = ReactRouter.hashHistory;
let Link = ReactRouter.Link;
let IndexRoute = ReactRouter.IndexRoute;
let browserHistory = ReactRouter.browserHistory;

class App extends Component {
  render() {
    console.log('##App');
    return(
      <div>
        <h1>App</h1>
        <Link to="about">About</Link>
        {' / '}
        <Link to="asdf">No Match</Link>
      </div>
    );
  }
}
class About extends Component {
  render() {
    console.log('##About');
    return(
      <div>
        <h1>About</h1>
        <Link to="/">Home</Link>
        {' / '}
        <Link to="asdf">No Match</Link>
      </div>
    );
  }
}
class NoMatch extends Component {
  render() {
    console.log('##NoMatch');
    return(
      <div>
        <h1>No Match</h1>
        <Link to="/">Home</Link>
        {' / '}
        <Link to="about">About</Link>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
  <Route path="/" component={App} />
  <Route path="about" component={About} />
  <Route path="*" component={NoMatch} />
  </Router>
), document.getElementById('root'));