import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../Store-Redux/appState";

import './AddRootGroup.css';

interface AddRootGroupState {
    groupNameRef: any,
}

interface AddRootGroupProps {
    addRootGroup: Function
}

export class AddRootGroup extends React.Component<AddRootGroupProps, AddRootGroupState> {
    private groupNameRef;

    constructor(props) {
        super(props);
        this.groupNameRef = React.createRef();
    }

    render() {
        const form = (
            <>
                <form className="addrootgroup">
                    <input ref={this.groupNameRef} type='text' placeholder='GROUPNAME' /><br />
                    <button onClick={this.addRootGroup}>Add</button>
                </form></>);

        return (
            <div className="addRootGroup">
                {form}
            </div>
        );
    }

    private addRootGroup = (event) => {
        event.preventDefault();
        this.props.addRootGroup(this.groupNameRef.current.value);
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
        addRootGroup: ownProps.addRootGroup
    }
}

export default connect(mapStateToProps, {})(AddRootGroup);