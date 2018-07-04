import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../Store-Redux/appState";

import './RemoveGroup.css';

interface RemoveGroupState {
    groupIDRef: any
}

interface RemoveGroupProps {
    groupID: string,
    removeGroup: Function
}

export class RemoveGroup extends React.Component<RemoveGroupProps, RemoveGroupState> {

    constructor(props) {
        super(props);
        this.state = {
            groupIDRef: React.createRef()
        }
    }

    render() {
        const form = (
                <form className="remove-group-form">
                    <input ref={this.state.groupIDRef} value={`${this.props.groupID}`} disabled={true} /><br />
                    <button onClick={this.removeGroup}>Remove</button>
                </form>);
        return form;

        return (
            <div className="remove-group">
                Removing group
            </div>
        );
    }

    private removeGroup = (e) => {
        e.preventDefault();
        this.props.removeGroup(this.state.groupIDRef.current.value);
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
        groupID: state.adminCurrentGroupID,
        removeGroup: ownProps.removeGroup
    }
}

export default connect(mapStateToProps, {})(RemoveGroup);