import * as React from 'react';

import './ManageUsers.css';

interface ManageUsersState {
    data: any;
}

export class ManageUsers extends React.Component<any, ManageUsersState> {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    render() {
        return (
            <div className="manageUsers">
                <a onClick={this.fetchAllUsers}>Fetch all users</a> |
                <a>Search user</a>
                <div className="result">{this.state.data}</div>
            </div>
        )
    }

    fetchAllUsers = async () => {
        try {
            const httpResponse = await fetch('http://localhost:4000/users', {method: 'GET'});
            const data = await httpResponse.json();
            const usersLI = data.map((u, index) => {
                return <li key={index}>{index + 1}) {u.name} ({u.id}), {u.age} years old <a className="delete" onClick={this.removeUser.bind(this, u.id)}>X</a></li>;
            })
            const res = (
                <ul>{usersLI}</ul>
            );
            this.setState({data: res});
        } catch (err) {
            this.setState({data: JSON.stringify(err)})
        }
    }

    removeUser = async (id) => {
        try {
            await fetch(`http://localhost:4000/users/${id}`, {
                method: 'DELETE',});
            this.fetchAllUsers();
        }
        catch (err) {
            this.setState({data: JSON.stringify(err)})
        }
    }
}