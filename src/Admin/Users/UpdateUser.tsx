import * as React from "react";

import './UpdateUser.css';

interface UpdateUsersStateProps {
    updateUser: Function
    user: {
        id: string,
        name: string,
        age: string
    }
}

export class UpdateUser extends React.Component<UpdateUsersStateProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            id: props.user.id,
            name: props.user.name,
            age: props.user.age
        }
    }

    componentWillReceiveProps(props) {
        this.setState(props.user);
    }

    render() {
        const form = (
            <div className="update-user">
                <div className="update-user-header">Update user</div>
                <form className="update-user-forum">
                    <input onChange={this.handleNameChange} type='text' placeholder='USERNAME' value={this.state.name} /><br />
                    <input onChange={this.handleAgeChange} type='text' placeholder='AGE' value={this.state.age} /><br />
                    <button onClick={this.updateUser}>Update</button>
                </form></div>);
        return form;
    }

    private handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    private handleAgeChange = (event) => {
        this.setState({age: event.target.value})
    }

    private updateUser = (event) => {
        event.preventDefault();
        this.props.updateUser(this.state);
    }
}

