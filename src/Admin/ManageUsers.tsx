import * as React from 'react';

import './ManageUsers.css';
import LeftNavAdmin from "./LeftNavAdmin";
import {Route} from "react-router";
import CreateUsers from "./CreateUsers";
import {ReadUsers} from "./ReadUsers";
// import {UsersAPI} from "./UsersAPI";

interface ManageUsersState {
    data: any;
    result: any;
}

export class ManageUsers extends React.Component<any, ManageUsersState> {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            result: null
        }
    }

    render() {
        const createUsers = () => {
            return <CreateUsers createUser={this.createUser} />
        }

        return (
            <div className="manageUsers">
                <LeftNavAdmin />
                <div className="right">
                    <Route path='/manageusers/create' render={createUsers} />
                    <Route path='/manageusers/read' component={ReadUsers} />
                    {this.state.result}
                    {/*<a onClick={this.fetchAllUsers}>Fetch all users</a> |*/}
                    {/*<a>Search user</a> |*/}
                    {/*<div className="result">{this.state.data}</div>*/}
                </div>

            </div>
        )
    }

    createUser = async (username, password, age) => {
        console.log(`trying to create ${username}, ${password}, ${age}`);
        // UsersAPI.createUser(username, password, age)
        //     .then((data) => {
        //         console.log(data);
        //         this.formSuccess('User created!')
        //     })
        //     .catch((err) => this.formError(`Failed to create user: ${err.message}`));
    }

    formError = (msg) => {
        console.log(`inside error`);
        const elem = (
            <div className='error'>
                {msg}
            </div>
        );
        this.setState({result: elem});
    }

    formSuccess = (msg) => {
        const elem = (
            <div className='success'>
                {msg}
            </div>
        );
        this.setState({result: elem});
    }

    clearResult = () => {
        this.setState({result: null});
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