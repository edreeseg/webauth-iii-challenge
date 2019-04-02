import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Register, Login, UserList } from './components';
import './App.css';

class App extends Component {
  componentDidMount(){
    console.log(process.env);
    const token = JSON.parse(localStorage.getItem('users-token'));
    if (!token) this.props.history.push('/signup');
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
