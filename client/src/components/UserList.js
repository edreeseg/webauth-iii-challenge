import React from 'react';
import axios from 'axios';

export default class UserList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
        };
    }
    componentDidMount(){}
    render(){
        return (
            <ul>
                {this.state.users.map(user => <User key={user.id} {...user} />)}
            </ul>
        );
    }
}