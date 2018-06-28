import * as React from 'react';

import './LeftNav.css';
import { ChatTree } from '../Navigation/chat-tree.js';
import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";
// import {store} from "../Store-Redux/store";


interface LeftNavAdminTreeProps {
    adminNavTree: any
}

class LeftNavAdminTree extends React.Component<LeftNavAdminTreeProps, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        const elem = <ul className="left tree" tabIndex={0} />;

        return (
            <div className="leftNav">
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
        if(!!this.props.adminNavTree) {
            const tree = ChatTree(document.querySelector('ul.tree'));
            // tree.subscribeToElementSwitch(this.switchDialogue);
            tree.load(this.props.adminNavTree);
            tree.element.focus();
        }
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        adminNavTree: state.adminNavTree
    }
}

export default connect(mapStateToProps, {})(LeftNavAdminTree);