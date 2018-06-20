import * as React from 'react';

import './InputBlock.css';
import {StateStore} from "../Store/StateStore";
import {IStateStore} from "../Store/IStateStore";

interface IInputBlockState {
    message: string;
}

export class InputBlock extends React.Component<{operation: any}, IInputBlockState> {
    store: IStateStore;

    constructor(props: any) {
        super(props);
        this.state = {
            message: ''
        }
        this.store = StateStore.getInstance();
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
        this.store.addMessage(this.state.message);
    }

    public render() {
        return (
            <div className="inputBlock">
                <textarea rows={4}  placeholder="Type a message" onKeyPress={this.handleKey} onChange={this.handleChange} value={this.state.message}>Some text to enter</textarea>
                <button onClick={this.send}>Send</button>
            </div>
        );
    }

    componentDidUpdate() {
        this.props.operation();
    }
}