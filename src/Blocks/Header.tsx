import * as React from 'react';

import './Header.css';
import {StateStore} from "../Store/StateStore";

export class Header extends React.Component {
    render() {
        return (

            <div className="header">
                <div className="logout">
                    <a onClick={StateStore.logout}>Logout</a>
                </div>
            </div>

        )
    }
}