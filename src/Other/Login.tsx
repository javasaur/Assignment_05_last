import * as React from 'react';

import './Login.css';
import {store} from "../Store-Redux/store";
import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";
import {nullLoginError} from "../Store-Redux/actions/login";
import {checkMatch} from "../Store-Redux/thunks/login";

interface LoginProps {
    loginError: boolean,
    inputUsernameRef: any,
    inputPasswordRef: any
}

class Login extends React.Component<LoginProps, any> {
    private inputUsernameRef;
    private inputPasswordRef;

    constructor(props: any) {
        super(props);
        this.inputUsernameRef = React.createRef();
        this.inputPasswordRef = React.createRef();
    }

    public render() {
        let error = this.props.loginError ? (<div className="error">No match found</div>) : null;

        return (
            <div className="Login">
                <form className="form-style-4" action="" method="post" onChange={this.handleFormChange}>
                    <input  ref={this.inputUsernameRef} placeholder='username' type="text" name="username" autoComplete='off' />
                    <input ref={this.inputPasswordRef} placeholder='password' type="password" name="password" autoComplete='off' />
                    <input onClick={this.handleClick} type="submit" value="Sign in"/>
                    {error}
                </form>
            </div>
        );
    }

    private handleClick = (event: any) => {
        event.preventDefault();
        store.dispatch(checkMatch(this.inputUsernameRef.current.value, this.inputPasswordRef.current.value));
    }

    private handleFormChange = () => {
        this.nullLoginError();
    }

    private nullLoginError() {
        if(this.props.loginError) {
            store.dispatch(nullLoginError());
        }
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        loginError: state.loginError,
    }
}

export default connect(mapStateToProps, {})(Login);