const {Component} = React;

class App extends Component {
  state = {
    selectedLang: 'vn'
  }
  selectLang = (id) => {
    this.setState({
      selectedLang: id
    });
  }
  translate = (item) => {
    return languages[this.state.selectedLang][item];
  }
  render () {
    const {translate} = this;
    return (
      <div>
        <button disabled={this.state.selectedLang === 'vn' ? true:false} onClick={() => this.selectLang('vn')} className="m-1 btn btn-success">Việt Nam</button>
        <button disabled={this.state.selectedLang === 'eng' ? true:false} onClick={() => this.selectLang('eng')} className="m-1 btn btn-danger">English</button>
        <br />
        <h1>{translate('head')}</h1>
        <h2>{translate('content')}</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);