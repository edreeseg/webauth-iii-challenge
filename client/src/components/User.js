import React from 'react';

export default function User(props){
    return (
        <li className="user">
            <p>{props.id}</p>
            <p>{props.username}</p>
            <p>{props.department}</p>
        </li>
    );
}