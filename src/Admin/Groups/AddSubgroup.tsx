import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../Store-Redux/appState";

import './AddSubgroup.css';

interface AddSubgroupState {
    groupNameRef: any,
}

interface AddSubgroupProps {
    addSubgroup: Function,
    parent: string
}

export class AddSubgroup extends React.Component<AddSubgroupProps, AddSubgroupState> {
    private groupNameRef;

    constructor(props) {
        super(props);
        this.groupNameRef = React.createRef();
    }

    render() {
        const form = (
            <>
                <form className="addsubgroup">
                    <input type='text' placeholder={`Parent ID - ${this.props.parent}`} disabled={true} /><br />
                    <input ref={this.groupNameRef} type='text' placeholder='GROUPNAME' /><br />
                    <button onClick={this.addSubgroup}>Add</button>
                </form></>);

        return (
            <div className="AddSubgroup">
                {form}
            </div>
        );
    }

    private addSubgroup = (event) => {
        event.preventDefault();
        this.props.addSubgroup(this.groupNameRef.current.value, this.props.parent);
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
        addSubgroup: ownProps.addSubgroup,
        parent: state.adminCurrentGroupID
    }
}

export default connect(mapStateToProps, {})(AddSubgroup);