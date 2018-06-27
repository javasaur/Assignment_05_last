import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../Store-Redux/appState";

import './CreateUsers.css';

interface CreateUsersState {
    usernameRef: any,
    passwordRef: any,
    ageRef: any
}

interface CreateUserProps {
    createUser: Function,
    clearResult: Function,
}

export class CreateUsers extends React.Component<CreateUserProps, CreateUsersState> {
    private usernameRef;
    private passwordRef;
    private ageRef;

    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.ageRef = React.createRef();
    }

    render() {
        const form = (
            <>
            <div className="createusers-header">Create user</div>
            <form className="createUsername">
            <input ref={this.usernameRef} type='text' placeholder='USERNAME' /><br />
            <input ref={this.passwordRef} type='password' placeholder='PASSWORD' /><br />
            <input ref={this.ageRef} type='text' placeholder='AGE' /><br />
                <button onClick={this.createUser}>Create</button>
        </form></>);

        return (
            <div className="createUsers">
            {form}
            </div>
        );
    }

    private clearInputs() {
        this.usernameRef.current.value = '';
        this.passwordRef.current.value = '';
        this.ageRef.current.value = '';
    }

    private createUser = (event) => {
        event.preventDefault();
        this.props.createUser(
            this.usernameRef.current.value,
            this.passwordRef.current.value,
            this.ageRef.current.value);
        this.clearInputs();
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
        clearResult: ownProps.clearResult,
        createUser: ownProps.createUser
    }
}

export default connect(mapStateToProps, {})(CreateUsers);