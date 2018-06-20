import * as React from 'react';

import './IOScreen.css';
import {InputBlock} from "./InputBlock";
import { Message } from "../Messages/Message";
import { StateStore } from '../Store/StateStore';
import {IStateStore} from "../Store/IStateStore";

export class IOScreen extends React.Component {
    private store: IStateStore;

    constructor(props: any) {
        super(props);
        this.store = StateStore.getInstance();
    }

    scrollDown(){
        const element = document.querySelector("div.messages");
        if(!!element) {
            element.scrollTop = element.scrollHeight;
        }
    }

    public render() {
        const dialogId = this.store.get('currentDialogueOwnerId');
        const dialogType = this.store.get('currentDialogueOwnerType');
        const authorId = this.store.get('loggedUserId');

        let res;
        if(!this.store.get('currentDialogueOwnerId')) {
            res = null;
        } else {
            const messages = this.store.getAllMessagesByOwnerId(dialogType, dialogId, authorId).map((elem, index) => {
                const me = elem.authorId === this.store.get('loggedUserId');
                const alignClass = me ? 'right' : 'left';
                return (
                    <Message key={index} keyValue={index} message={elem} alignClass={alignClass} showAuthor={!me} />
                )
            });

            res = (
                <div className="ioScreen">
                    <div className="messages">{messages}</div>
                    <InputBlock operation={this.scrollDown}/>
                </div>
            )
        }

        return res;
    }

    componentDidMount() {
        this.scrollDown();
    }
}