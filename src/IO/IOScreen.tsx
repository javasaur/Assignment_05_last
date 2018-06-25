import * as React from 'react';

import './IOScreen.css';
import {InputBlock} from "./InputBlock";
import {Message} from "../Messages/Message";
import {StateStore} from '../Store/StateStore';
import {IStateStore} from "../Store/IStateStore";
import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";

export class IOScreen extends React.Component<{}, {messages: any}> {
    private store: IStateStore;

    constructor(props: any) {
        super(props);
        this.store = StateStore.getInstance();
        this.state = {
            messages: []
        }
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
        let messages = [];

        let res;
        if(!this.store.get('currentDialogueOwnerId')) {
            res = null;
        } else {
            this.store.getAllMessagesByOwnerId(dialogType, dialogId, authorId)
                .then(msgs => {this.setState({messages: msgs})})

                this.state.messages.map((elem: any, index) => {
                    console.log(elem);
                    const me = elem.authorId === this.store.get('loggedUserId');
                    const alignClass = me ? 'right' : 'left';
                    return (
                        <Message key={index} keyValue={index} message={elem} alignClass={alignClass} showAuthor={!me} />
                    )
                });
            }

            res = (
                <div className="ioScreen">
                    <div className="messages">{messages}</div>
                    <InputBlock operation={this.scrollDown}/>
                </div>
            )
        return res;
    }

    componentDidMount() {
        this.scrollDown();
    }
}

// const mapStateToProps = (state: AppState) => {
//     return {
//         messages: state.loggedUserName,
//     }
// }
//
// export default connect(mapStateToProps, {})(Header);