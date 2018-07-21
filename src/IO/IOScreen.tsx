import * as React from 'react';

import './IOScreen.css';
import InputBlock from "./InputBlock";
import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";
import {Message} from "../Messages/Message";
import { Scrollbars } from 'react-custom-scrollbars';

interface IOScreenProps {
    messages: Array<any>,
    loggedUserID: any,
    activeDialogue: {
        id: string,
        name: string,
        type: string
    }
}

class IOScreen extends React.Component<IOScreenProps, any> {
    scrollRef;

    constructor(props: any) {
        super(props);
        this.scrollRef = React.createRef();
    }

    scrollDown = () => {
        this.scrollRef.current.scrollToBottom();
    }

    public render() {
        let res;
        let header = null;
        if(this.props.activeDialogue) {
            if(this.props.activeDialogue.type === 'group') {
                header = <div className="io-screen-header">{this.props.activeDialogue.name} (Public)</div>
            } else if(this.props.activeDialogue.type === 'user') {
                header = <div className="io-screen-header">{this.props.activeDialogue.name} (Private)</div>
            }
        }
        const messages = this.props.messages;
        const messagesLI: any[] = [];
        if(messages.length < 0) {
            res = null;
        } else {
            messages.forEach((elem, index) => {
                const me = +elem.authorId === +this.props.loggedUserID;
                const alignClass = me ? 'right' : 'left';
                const el = (
                    <Message key={index} keyValue={index} message={elem} alignClass={alignClass} showAuthor={!me} />
                );
                messagesLI.push(el);
            });

            res = (
                <div className="io-screen">
                    {header}
                    <Scrollbars autoHide={true} ref={this.scrollRef}>
                        <div className="io-screen-messages">{messagesLI}</div>
                    </Scrollbars>
                    <InputBlock operation={this.scrollDown}/>
                </div>
            )
        }


        return res;
    }

    componentDidUpdate() {
        this.scrollDown();
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        activeDialogue: state.activeDialogue,
        loggedUserID: state.loggedUserID,
        messages: state.messages,
    }
}

export default connect(mapStateToProps, {})(IOScreen);