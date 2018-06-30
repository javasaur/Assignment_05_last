import * as React from 'react';
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import {connect} from "react-redux";

import './App.css';
import {ChatWindow} from "./Blocks/ChatWindow";
import {AppState} from "./Store-Redux/appState";
import Login from "./Other/Login";
import {ManageUsers} from "./Admin/Users/ManageUsers";
import {ManageGroups} from "./Admin/Groups/ManageGroups";
import Header from "./Blocks/Header";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const logged = this.props.loggedUserID;
        const login = () => !!logged ? <Redirect to='/chat' /> : <Login />;
        const chatWindow = () => !!logged ? <><Header /><ChatWindow/></> : <Login />;
        const manageUsers = () => !!logged ? <><Header /><ManageUsers/></> : <Login />;
        const manageGroups = () => !!logged ? <><Header /><ManageGroups/></> : <Login />;

        return (
            <BrowserRouter>
                <div className="app">
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
