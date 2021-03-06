import * as React from 'react';

import './InputBlock.css';
import {sendMessage} from "../Store-Redux/thunks/dialogues";
import {store} from "../Store-Redux/store";
import {connect} from "react-redux";
import {AppState} from "../Store-Redux/appState";

interface InputBlockProps {
    activeDialogue: {
        id: string,
        name: string,
        type: string
    }
    loggedUserID: number;
    operation: Function;
}

class InputBlock extends React.Component<InputBlockProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            message: ''
        }
    }

    handleChange = (event: any) => {
        this.setState({
            message: event.target.value
        });
    }

    handleKey = (event: any) => {
        if(event.key === 'Enter') {
            this.send();
        }
    }

    send = () => {
        this.setState({
            message: ''
        });
        store.dispatch(sendMessage(this.props.activeDialogue.id, this.props.loggedUserID, this.state.message));
    }

    public render() {
        return (
            <div className="input-block">
                <textarea rows={4}  placeholder="Type a message" onKeyPress={this.handleKey} onChange={this.handleChange} value={this.state.message}>Some text to enter</textarea>
                <button onClick={this.send}>Send</button>
            </div>
        );
    }

    componentDidUpdate() {
        if(this.props.operation) {
            this.props.operation();
        }
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
        loggedUserID: state.loggedUserID,
        activeDialogue: state.activeDialogue,
        operation: ownProps.operation
    }
}

export default connect(mapStateToProps, {})(InputBlock);