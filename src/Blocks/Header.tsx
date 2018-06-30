import * as React from 'react';

import './Header.css';
import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";
import {store} from "../Store-Redux/store";
import {logout} from "../Store-Redux/actions/login";
import {Link} from "react-router-dom";

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
                <div className="header-logout">
                    <Link to={'/chat'}>Chat <i className="fas fa-comments" /></Link>
                    <Link to={'/managegroups'}>Manage groups <i className="far fa-object-group" /></Link>
                    <Link to={'/manageusers'}>Manage users <i className="fas fa-users" /></Link>
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