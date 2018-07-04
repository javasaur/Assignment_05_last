import * as React from 'react';
import LeftNavAdminTree from "./LeftNavAdminTree";

import './ManageGroups.css';
import {getAdminNavTree} from "../../Store-Redux/thunks/tree";
import {store} from "../../Store-Redux/store";
import {Route} from "react-router";
import AddRootGroup from "./AddRootGroup";
import {Link} from "react-router-dom";
import {GroupsAPI} from "./GroupsAPI";
import AddSubgroup from "./AddSubgroup";
import ReadUsers from "../Users/ReadUsers";
import {connect} from "react-redux";
import {AppState} from "../../Store-Redux/appState";
import {UsersAPI} from "../Users/UsersAPI";
import RemoveGroup from "./RemoveGroup";

interface ManageGroupsState {
    result: any,
}

interface ManageGroupsProps {
    adminCurrentGroupID?: any
}

export class ManageGroups extends React.Component<ManageGroupsProps, ManageGroupsState> {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
        }
    }

    componentDidMount() {
        store.dispatch(getAdminNavTree());
    }

    render() {
        const addUsers = () => {
            return (
                <ReadUsers
                    clearResult={this.clearResult}
                    fetchUsers={UsersAPI.fetchAllUsers}
                    associateUserWithGroup={this.addUserToGroup}
                />);
        }

        const addRootGroup = () => {
            return <AddRootGroup addRootGroup={this.addRootGroup} />;
        }

        const addSubgroup = () => {
            return <AddSubgroup addSubgroup={this.addSubgroup} />;
        }

        const groupUsers = () => {
            return (
                <ReadUsers
                    clearResult={this.clearResult}
                    fetchUsers={GroupsAPI.fetchUsersByAdminGroup}
                    updateUser={this.updateUser}
                    removeUser={this.removeUser}
                />
            );
        }

        const removeGroup = () => {
            return <RemoveGroup removeGroup={this.removeGroup} />;
        }

        return (
            <div className="manage-groups">
                <LeftNavAdminTree />
                <div className="manage-groups-right-block">
                    <div className="manage-groups-header">
                        <Link to={'/managegroups/addgroup/root'} className="manage-groups-navitem">Add root group</Link>
                        <Link to={'/managegroups/addgroup/subgroup'} className="manage-groups-navitem">Add subgroup</Link>
                        <Link to={'/managegroups/groupusers'} className="manage-groups-navitem">Group users</Link>
                        <Link to={'/managegroups/addusers'} className="manage-groups-navitem">Associate users</Link>
                        <Link to={'/managegroups/removegroup'} className="manage-groups-navitem">Remove group</Link>
                    </div>

                    <Route path='/managegroups/addgroup/root' render={addRootGroup} />
                    <Route path='/managegroups/addgroup/subgroup' render={addSubgroup} />
                    <Route path='/managegroups/groupusers' render={groupUsers} />
                    <Route path='/managegroups/addusers' render={addUsers} />
                    <Route path={'/managegroups/removegroup'} render={removeGroup} />
                    {this.state.result}
                </div>
            </div>
        )
    }

    private addUserToGroup = async (userID, cb) => {
        GroupsAPI.addUserToGroup(userID)
            .then(() => {
                this.formSuccess('User added to group');
                cb();
            })
            .catch((err) => this.formError(err.response.data));
    }

    private addRootGroup = (name) => {
        this.clearResult();
        GroupsAPI.addRootGroup(name)
            .then(() => this.formSuccess('Group added!'))
            .catch((err) => this.formError(err.response.data));
    }

    private addSubgroup = (name, parent) => {
        this.clearResult();
        GroupsAPI.addSubgroup(name, parent)
            .then(() => this.formSuccess('Subgroup added!'))
            .catch((err) => this.formError(err.response.data));
    }

    formError = (msg) => {
        const elem = (
            <div className='error action-result'>
                <i className="fas fa-times" /> {msg}
            </div>
        );
        this.setState({result: elem});
    }

    formSuccess = (msg) => {
        const elem = (
            <div className='success action-result'>
                <i className="fas fa-check-circle" /> {msg}
            </div>
        );
        this.setState({result: elem});
    }

    clearResult = () => {
        this.setState({result: null});
    }

    private updateUser = async (user, cb) => {
        UsersAPI.updateUser(user.id, user)
            .then((response) => {
                this.formSuccess('User updated!');
                cb();
            })
            .catch((err) => {
                this.formError(err.response.data);
            });
    }

    private removeUser = async (userID, cb) => {
        GroupsAPI.removeUserFromAdminGroup(userID)
            .then(() => {
                this.formSuccess('User removed from group');
                cb();
            })
            .catch((err) => this.formError(err.response.data));
    }

    private removeGroup = async (id, cb) => {
        console.log(`removing group ${id}`);
        // GroupsAPI.removeUserFromAdminGroup(id)
        //     .then(() => {
        //         this.formSuccess('Group removed');
        //         cb();
        //     })
        //     .catch((err) => this.formError(err.response.data));
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
        adminCurrentGroupID: state.adminCurrentGroupID,
    }
}

export default connect(mapStateToProps, {})(ManageGroups);