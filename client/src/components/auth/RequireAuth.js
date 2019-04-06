import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = `http://localhost:3030/api`;

axios.interceptors.request.use(
    options => {
        options.headers.authorization = `Bearer ${localStorage.getItem('user-token')}`;
        return options;
    },
    error => Promise.reject(error)
)

export default Component => class Authenticated extends React.Component {
    componentDidMount(){
        const token = localStorage.getItem('user-token');
        if (!token) this.props.history.push('/signin');
    }
    render(){
        return <Component {...this.props} />;
    }
}