import * as React from 'react';

import './LeftNav.css';
import { ChatTree } from './chat-tree.js';
import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";
import {store} from "../Store-Redux/store";
import {switchDialogue} from "../Store-Redux/thunks/dialogues";

interface LeftNavProps {
    navTree: any
}

class LeftNav extends React.Component<LeftNavProps, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        const elem = <ul className="left tree" tabIndex={0} />;

        if(!!this.props.navTree) {
            const tree = ChatTree(document.querySelector('ul.tree'));
            tree.subscribeToElementSwitch(this.switchDialogue);
            tree.load(this.props.navTree);
            tree.element.focus();
        }

        return (
            <div className="leftNav">
                {elem}
            </div>
        );
    }

    private switchDialogue(id) {
        store.dispatch(switchDialogue(id));
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        navTree: state.navTree
    }
}

export default connect(mapStateToProps, {})(LeftNav);