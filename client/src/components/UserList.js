import React from 'react';
import axios from 'axios';
import User from './User';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    const token = localStorage.getItem('user-token');
    if (!token) return this.props.history.push('/signin');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get('http://localhost:3030/api/users', config)
      .then(res => this.setState({ users: res.data.users }))
      .catch(msg => {
        this.props.displayError(msg.response ? msg.response.data.error : 'There was an error while retrieving users.');
        this.props.history.push('/signin');
      });
  }
  handleLogout = ev => {
    localStorage.removeItem('user-token');
    this.props.history.push('/signin');
  };
  render() {
    return (
      <ul className="users-list">
        {this.state.users.map(user => (
          <User key={user.id} {...user} />
        ))}
        <button className="logout" onClick={this.handleLogout}>
          Logout
        </button>
      </ul>
    );
  }
}
