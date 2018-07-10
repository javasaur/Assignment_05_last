import * as React from 'react';
import * as moment from 'moment';

import './Message.css';

interface IMessageComponentProps {
    message: any,
    alignClass: string,
    showAuthor: boolean;
    keyValue: number
}

export class Message extends React.Component<IMessageComponentProps, {}> {

    constructor(props: {
        message: any,
        alignClass: string,
        showAuthor: boolean,
        keyValue: number
    }) {
        super(props);
    }

    public render() {
        const date = moment(this.props.message.date).utc().fromNow();
        let author;
        if(this.props.showAuthor) {
            const a = this.props.message.user;
            author = (
                <>
                <div className="message-author">{a}</div>
                    </>
            )
        } else {
            author = (
                <>
                    </>
            )
        }
        return (
            <div className="message-container" key={this.props.keyValue}>
                <div className={`message ${this.props.alignClass}`}>
                    {author}
                    <div className="message-content">{this.props.message.content}</div>
                    <div className="message-date">{date}</div>
                </div>
            </div>
        );
    }
}