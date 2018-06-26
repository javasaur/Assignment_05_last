import * as React from 'react';
import {BrowserRouter, Route, Redirect} from "react-router-dom";

import './App.css';
import {ChatWindow} from "./Blocks/ChatWindow";
import {Switch} from "react-router";
import {AppState} from "./Store-Redux/appState";
import {connect} from "react-redux";
import Login from "./Other/Login";
import {ManageUsers} from "./Admin/ManageUsers";
import {ManageGroups} from "./Admin/ManageGroups";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const logged = this.props.loggedUserID;

        const login = () => {
            return !!logged ? <Redirect to='/chat' /> : <Login />;
        }

        const chatWindow = () => {
            return !!logged ? <ChatWindow/> : <Login />;
        }

        const manageUsers = () => {
            return !!logged ? <ManageUsers/> : <Login />;
        }

        const manageGroups = () => {
            return !!logged ? <ManageGroups/> : <Login />;
        }

        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path='/' exact={true} render={login} />
                        <Route path='/chat' render={chatWindow} />
                        <Route path='/manageusers' render={manageUsers} />
                        <Route path='/managegroups' render={manageGroups} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        loggedUserID: state.loggedUserID,
    }
}

export default connect(mapStateToProps, {})(App);
