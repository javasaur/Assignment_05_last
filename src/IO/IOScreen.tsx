import * as React from 'react';

import './IOScreen.css';
import InputBlock from "./InputBlock";
import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";
import {Message} from "../Messages/Message";

interface IOScreenProps {
    messages: Array<any>,
    loggedUserID: any
}

class IOScreen extends React.Component<IOScreenProps, any> {
    constructor(props: any) {
        super(props);
    }

    scrollDown = () => {
        const element = document.querySelector("div.messages");
        if(!!element) {
            element.scrollTop = element.scrollHeight;
        }
    }

    public render() {
        let res;
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
                <div className="ioScreen">
                    <div className="messages">{messagesLI}</div>
                    {/*<button onClick={this.scrollDown}>Scroll</button>*/}
                    <InputBlock operation={this.scrollDown}/>
                </div>
            )
        }
        return res;
    }

    componentDidMount() {
        this.scrollDown();
    }

    componentDidUpdate() {
        this.scrollDown();
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        loggedUserID: state.loggedUserID,
        messages: state.messages,
    }
}

export default connect(mapStateToProps, {})(IOScreen);