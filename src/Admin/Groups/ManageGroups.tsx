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
    isActive: Array<boolean>
}

interface ManageGroupsProps {
    adminCurrentGroupID?: any
}

export class ManageGroups extends React.Component<ManageGroupsProps, ManageGroupsState> {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            isActive: [false, false, false, false, false]
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
                    flag={'all'}
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
                    flag={'group'}
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
                        <Link
                            to={'/managegroups/addgroup/root'}
                            className={`manage-groups-navitem ${this.state.isActive[0] ? 'active' : ''}`}
                            onClick={this.toggle.bind(null, 0)}
                        >
                            Add root group
                        </Link>
                        <Link
                            to={'/managegroups/addgroup/subgroup'}
                            className={`manage-groups-navitem ${this.state.isActive[1] ? 'active' : ''}`}
                            onClick={this.toggle.bind(null, 1)}
                        >
                            Add subgroup
                        </Link>
                        <Link
                            to={'/managegroups/groupusers'}
                            className={`manage-groups-navitem ${this.state.isActive[2] ? 'active' : ''}`}
                            onClick={this.toggle.bind(null, 2)}
                        >
                            Group users
                        </Link>
                        <Link
                            to={'/managegroups/addusers'}
                            className={`manage-groups-navitem ${this.state.isActive[3] ? 'active' : ''}`}
                            onClick={this.toggle.bind(null, 3)}
                        >
                            Associate users
                        </Link>
                        <Link
                            to={'/managegroups/removegroup'}
                            className={`manage-groups-navitem ${this.state.isActive[4] ? 'active' : ''}`}
                            onClick={this.toggle.bind(null, 4)}
                        >
                            Remove group
                        </Link>
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

    private toggle = (id) => {
        let isActive = [...this.state.isActive];
        isActive = isActive.map(elem => false);
        isActive[id] = true;
        this.setState({isActive});
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

    private removeGroup = async (id) => {
        this.clearResult();
        GroupsAPI.removeGroup(id)
            .then(() => {
                this.formSuccess('Group removed');
            })
            .catch(err => {
                this.formError(err.response.data)
            });
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
        adminCurrentGroupID: state.adminCurrentGroupID,
    }
}

export default connect(mapStateToProps, {})(ManageGroups);