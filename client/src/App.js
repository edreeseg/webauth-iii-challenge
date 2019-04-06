import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Register, Login, UserList, NavBar } from './components';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
    };
  }
  componentDidMount() {
    const token = localStorage.getItem('user-token');
    if (!token) this.props.history.push('/signin');
    else this.props.history.push('/users');
  }
  displayError = (msg) => {
    this.setState({ error: msg});
  }
  render() {
    return (
      <div className="App">
        {this.state.error ? <span className="error" onClick={ev => this.setState({ error: null })}>{this.state.error}</span> : null}
        <Route path="/" component={NavBar} />
        <Route path="/signup" render={props => <Register {...props} displayError={this.displayError} />} />
        <Route path="/signin" render={props => <Login {...props} displayError={this.displayError} />} />
        <Route path="/users" render={props => <UserList {...props} displayError={this.displayError} />} />
      </div>
    );
  }
}

export default App;
