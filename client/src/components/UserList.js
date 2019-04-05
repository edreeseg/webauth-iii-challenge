import React from 'react';
import axios from 'axios';
import User from './User';
import RequireAuth from './auth/RequireAuth';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    // Authorization header attached by RequireAuth HOC, which also handles checking for token and changing base URL.
    axios
      .get('/users')
      .then(res => this.setState({ users: res.data.users }))
      .catch(msg => {
        if (msg.response){
          if (msg.response.status === 401 || msg.response.status === 403) localStorage.removeItem('user-token');
          this.props.displayError(msg.response.data.error);
        } else this.props.displayError('There was an error while retrieving users.');
        this.props.history.push('/signin');
      });
  }
  render() {
    return (
      <ul className="users-list">
        {this.state.users.map(user => (
          <User key={user.id} {...user} />
        ))}
      </ul>
    );
  }
}

export default RequireAuth(UserList);