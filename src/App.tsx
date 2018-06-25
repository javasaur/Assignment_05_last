import * as React from 'react';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import socketIOClient from 'socket.io-client'

import './App.css';
import {ChatWindow} from "./Blocks/ChatWindow";
import {Switch} from "react-router";
import {AppState} from "./Store-Redux/appState";
import {connect} from "react-redux";
import Login from "./Other/Login";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const socket = socketIOClient('http://localhost:4000');
        socket.on('test', msg => {
            console.log(`got message from server: ${msg}`);
        })

        this.send();

        const logged = this.props.loggedUserID;

        const login = () => {
            return !!logged ? <Redirect to='/chat' /> : <Login />;
        }

        const chatWindow = () => {
            return !!logged ? <ChatWindow/> : <Login />;
        }

        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path='/' exact={true} render={login} />
                        <Route path='/chat' render={chatWindow} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

    send = () => {
        const socket = socketIOClient('http://localhost:4000');
        socket.emit('test', 'blabla');
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        loggedUserID: state.loggedUserID,
    }
}

export default connect(mapStateToProps, {})(App);
