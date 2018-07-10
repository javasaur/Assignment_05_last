import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { ChatTree } from '../../Navigation/chat-tree.js';
import {AppState} from "../../Store-Redux/appState";
import {connect} from "react-redux";
import {setAdminCurrentGroupID} from "../../Store-Redux/actions/groups";
import {store} from "../../Store-Redux/store";

import "../../Navigation/LeftNavTree.css";
import {loadUsersForCurrentGroup} from "../../Store-Redux/thunks/users";

interface LeftNavAdminTreeProps {
    adminNavTree: any
}

class LeftNavAdminTree extends React.Component<LeftNavAdminTreeProps, any> {
    constructor(props) {
        super(props);

    }

    public render() {
        const elem = <div className="js-admin-tree" />;

        return (
            <div className="left-nav">
                <Scrollbars autoHide={true} >
                    {elem}
                </Scrollbars>
            </div>
        );
    }

    componentDidUpdate() {
        this.loadNavTree();
    }

    private loadNavTree() {
        if(!!this.props.adminNavTree) {
            const tree = ChatTree(document.querySelector('.js-admin-tree'));
            tree.subscribeToElementSwitch(this.setAdminCurrentGroupID);
            tree.load(this.props.adminNavTree);
            tree.element.focus();
        }
    }

    private setAdminCurrentGroupID = (id) => {
        store.dispatch(setAdminCurrentGroupID(id));
        store.dispatch(loadUsersForCurrentGroup());
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        adminNavTree: state.adminNavTree
    }
}

export default connect(mapStateToProps, {})(LeftNavAdminTree);