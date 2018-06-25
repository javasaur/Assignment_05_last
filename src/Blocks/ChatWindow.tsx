import * as React from 'react';

import './ChatWindow.css';
import LeftNav from "../Navigation/LeftNav";
import {StateStore} from '../Store/StateStore';
import {IStateStore} from "../Store/IStateStore";
import Header from "./Header";
import IOScreen from "../IO/IOScreen";

export class ChatWindow extends React.Component {
    store: IStateStore;

    constructor(props: any) {
        super(props);
        this.store = StateStore.getInstance();
    }

    public render() {
        return (
            <div className="ChatWindow">
                <Header/>
                <div className="main">
                    <LeftNav/>
                    <IOScreen/>
                </div>
            </div>
        );
    }
}