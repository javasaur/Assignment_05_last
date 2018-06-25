import * as React from 'react';
import * as moment from 'moment';

import './Message.css';
// import {IMessage} from "./IMessage";
import {IStateStore} from "../Store/IStateStore";
import {StateStore} from "../Store/StateStore";

interface IMessageComponentProps {
    message: any,
    alignClass: string,
    showAuthor: boolean;
    keyValue: number
}

export class Message extends React.Component<IMessageComponentProps, {}> {
    store: IStateStore;

    constructor(props: {
        message: any,
        alignClass: string,
        showAuthor: boolean,
        keyValue: number
    }) {
        super(props);
        this.store = StateStore.getInstance();
    }

    public render() {
        const date = moment.unix(this.props.message.dateTimestamp).fromNow();
        let author;
        if(this.props.showAuthor) {
            const a = this.store.getUsername(this.props.message.authorId);
            author = (
                <>
                <div className="author">{a}</div>
                    </>
            )
        } else {
            author = (
                <>
                    </>
            )
        }
        return (
            <div className="messageContainer" key={this.props.keyValue}>
                <div className={`message ${this.props.alignClass}`}>
                    {author}
                    <div className="content">{this.props.message.content}</div>
                    <div className="date">{date}</div>
                </div>
            </div>
        );
    }
}