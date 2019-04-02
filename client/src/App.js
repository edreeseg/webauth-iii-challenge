import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Register, Login, UserList } from './components';
import './App.css';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('user-token');
    console.log(token);
    if (!token) this.props.history.push('/signin');
    else this.props.history.push('/users');
  }
  render() {
    return (
      <div className="App">
        <Route path="/signup" component={Register} />
        <Route path="/signin" component={Login} />
        <Route path="/users" component={UserList} />
      </div>
    );
  }
}

export default App;
