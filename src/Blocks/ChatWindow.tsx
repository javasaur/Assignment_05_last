import * as React from 'react';

import './ChatWindow.css';
import LeftNavTree from "../Navigation/LeftNavTree";
import IOScreen from "../IO/IOScreen";

export class ChatWindow extends React.Component {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="chat-window">
                <div className="chat-window-main">
                    <LeftNavTree/>
                    <IOScreen/>
                </div>
            </div>
        );
    }
}