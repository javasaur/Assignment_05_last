import * as React from 'react';

import './Login.css';
import {IStateStore} from "../Store/IStateStore";
import {StateStore} from "../Store/StateStore";

interface ILoginState {
    inputUsername: string;
    inputPassword: string;
}

export class Login extends React.Component<{}, ILoginState> {
    store: IStateStore;

    constructor(props: any) {
        super(props);
        this.state = {
            inputUsername: '',
            inputPassword: ''
        };
        this.store = StateStore.getInstance();
    }

    public render() {
        return (
            <div className="Login">
                <form className="form-style-4" action="" method="post">
                    <input onChange={this.handleUserNameChange} placeholder='username' type="text" name="username" autoComplete='off' />
                    <input onChange={this.handlePassChange} placeholder='password' type="password" name="password" autoComplete='off' />
                    <input onClick={this.handleClick} type="submit" value="Sign in"/>
                    <div className="error" >No match found</div>
                </form>
            </div>
        );
    }

    private handleClick = (event: any) => {
        event.preventDefault();
        const body = JSON.stringify({username: this.state.inputUsername, password: this.state.inputPassword});
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: body})
                .then((data) => data.json().then(accessAllowed => {
                    if(!accessAllowed) {
                        this.showError();
                        return;
                    }
                    this.store.authenticate(this.state.inputUsername, this.state.inputPassword);
                    StateStore.forceUpdateOfMainComponent();

                }))
                .catch((err) => {
                    this.showError();
                });
    }

    private handlePassChange = (event: any) => {
        this.hideError();
        this.setState({inputPassword: event.target.value});
    }

    private handleUserNameChange = (event: any) => {
        this.hideError();
        this.setState({inputUsername: event.target.value});
    }

    private showError() {
        const elem = document.querySelector('div.error') as HTMLElement;
        if(!!elem) {
            elem.style.display = 'block';
        }
    }

    private hideError() {
        const elem = document.querySelector('div.error') as HTMLElement;
        if(!!elem) {
            elem.style.display = 'none';
        }
    }
}