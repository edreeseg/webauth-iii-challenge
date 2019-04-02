import React, { useState } from 'react';
import axios from 'axios';

export default function Login(){ // Better to use class component when dealing with many controlled inputs?
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const handleLogin = ev => {
        ev.preventDefault();
        const user = { username, password };
        axios.post('http://localhost:5000/api/login', user)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        setUsername('');
        setPassword('');
    }
    return (
        <form onSubmit={handleLogin}>
            <input 
                type="text"
                placeholder="Username"
                onChange={ev => setUsername(ev.target.value)}
                value={username}
            />
            <input 
                type="password"
                placeholder="Password"
                onChange={ev => setPassword(ev.target.value)}
                value={password}
            />
            <button>Login</button>
        </form>
    );
}