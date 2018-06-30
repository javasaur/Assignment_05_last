import * as React from 'react';

import './LeftNavTree.css';
import { ChatTree } from './chat-tree.js';
import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";
import {store} from "../Store-Redux/store";
import {switchDialogue} from "../Store-Redux/thunks/dialogues";

interface LeftNavProps {
    navTree: any
}

class LeftNavTree extends React.Component<LeftNavProps, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        const elem = <ul className="left-nav-tree js-tree" tabIndex={0} />;

        return (
            <div className="left-nav">
                {elem}
            </div>
        );
    }

    componentDidUpdate() {
        this.loadNavTree();
    }

    componentDidMount() {
        this.loadNavTree();
    }

    private loadNavTree() {
        if(!!this.props.navTree) {
            const tree = ChatTree(document.querySelector('ul.js-tree'));
            tree.subscribeToElementSwitch(this.switchDialogue);
            tree.load(this.props.navTree);
            tree.element.focus();
        }
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

export default connect(mapStateToProps, {})(LeftNavTree);