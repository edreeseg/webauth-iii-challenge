import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {
    handleLogout = ev => {
        localStorage.removeItem('user-token');
        this.props.history.push('/signin');
    };
    render(){
        const token = localStorage.getItem('user-token');
        return (
            <nav className="nav-bar">
                {token 
                    ? <button className="logout" onClick={this.handleLogout}>Sign Out</button> 
                    : <NavLink to="/signin" style={this.props.location.pathname === '/signup' ? { fontWeight: 'bold' } : null}>Sign In</NavLink>}
                        {/* Hacky way of ensuring style stays consistent when signing in, should be handled without inline styles*/}
                <NavLink to="/users">Users</NavLink>
            </nav>
        );
    }
}