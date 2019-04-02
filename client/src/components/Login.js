import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {
  // Better to use class component when dealing with many controlled inputs?
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const handleLogin = ev => {
    ev.preventDefault();
    if (!username || !password) return setError('Please fill out all fields.');
    const user = { username, password };
    axios
      .post('http://localhost:3030/api/login', user)
      .then(res => {
        localStorage.setItem('user-token', res.data.token);
        props.history.push('/users');
      })
      .catch(msg => setError(msg.error));
    setUsername('');
    setPassword('');
  };
  const handleChange = ev => {
    setError(null);
    if (ev.target.name === 'username') setUsername(ev.target.value);
    else setPassword(ev.target.value);
  };
  return (
    <>
      {error ? <span>{error}</span> : null}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <button>Sign In</button>
        <Link to="/signup">Not a user yet? Click here to sign up!</Link>
      </form>
    </>
  );
}
