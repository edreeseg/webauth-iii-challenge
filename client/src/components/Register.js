import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      department: '',
      error: null,
    };
  }
  handleChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value, error: null });
  };
  createInput = (name, type = 'text') => {
    let placeholder = name.replace(/[A-Z]/g, char => ' ' + char);
    placeholder = placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
    return (
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={this.handleChange}
        value={this.state[name]}
      />
    );
  };
  handleRegister = ev => {
    ev.preventDefault();
    const { username, password, department } = this.state;
    if (!username || !password || !department)
      return this.setState({ error: 'Please fill out all fields.' });
    const user = { username, password, department };
    this.setState({ username: '', password: '', department: '' });
    axios
      .post('http://localhost:3030/api/register', user)
      .then(res => {
        localStorage.setItem('user-token', res.data.token);
        this.props.history.push('/users');
      })
      .catch(msg => this.setState({ error: msg.error }));
  };
  render() {
    return (
      <>
        {this.state.error ? <span>{this.state.error}</span> : null}
        <form onSubmit={this.handleRegister}>
          {this.createInput('username')}
          {this.createInput('password', 'password')}
          {this.createInput('department')}
          <button>Sign Up</button>
          <Link to="/signin">Already a user? Click here to login!</Link>
        </form>
      </>
    );
  }
}
