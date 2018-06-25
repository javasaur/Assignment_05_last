import * as React from 'react';

import './Header.css';
import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";
import {store} from "../Store-Redux/store";
import {logout} from "../Store-Redux/actions/login";

interface HeaderProps {
    username: string;
}

class Header extends React.Component<HeaderProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                Welcome, {this.props.username}!
                <div className="logout">
                    <a onClick={this.logout}>Logout <i className="fas fa-sign-out-alt" /></a>

                </div>
            </div>
        )
    }

    private logout() {
        store.dispatch(logout());
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        username: state.loggedUserName,
    }
}

export default connect(mapStateToProps, {})(Header);