import * as React from 'react';

import './ManageUsers.css';
import LeftNavAdmin from "./LeftNavAdmin";
import {Route} from "react-router";
import CreateUsers from "./CreateUsers";
import ReadUsers from "./ReadUsers";
import {UsersAPI} from "./UsersAPI";
import {connect} from "react-redux";
import {AppState} from "../../Store-Redux/appState";

interface ManageUsersState {
    data: any;
    result: any;
}

export class ManageUsers extends React.Component<any, ManageUsersState> {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            result: null
        }
    }

    render() {
        const createUsers = () => {
            return <CreateUsers createUser={this.createUser} />
        }

        const readUsers = () => {
            return (
                <ReadUsers
                    clearResult={this.clearResult}
                    fetchUsers={UsersAPI.fetchAllUsers}
                    updateUser={this.updateUser}
                    removeUser={this.removeUser}
                    flag={'all'}
                />
            )
        }

        return (
            <div className="manage-users">
                <LeftNavAdmin clearResult={this.clearResult} />
                <div className="manage-users-right-block">
                    <Route path='/manageusers/create' render={createUsers} />
                    <Route path='/manageusers/read' render={readUsers} />
                    {this.state.result}
                </div>
            </div>
        )
    }

    createUser = async (username, password, age) => {
        this.clearResult();
        UsersAPI.createUser(username, password, age)
            .then((data) => {
                this.formSuccess('User created!')
            })
            .catch((err) => {
                this.formError(err.response.data)
            });
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

    fetchUsers = () => {

    }

    removeUser = async (id, cb) => {
        UsersAPI.removeUser(id)
            .then((response) => {
                this.formSuccess('User deleted!');
                cb();
            })
            .catch((err) => {
                this.formError(err.response.data);
            });
    }

    updateUser = async (user, cb) => {
        UsersAPI.updateUser(user.id, user)
            .then((response) => {
                this.formSuccess('User updated!');
                cb();
            })
            .catch((err) => {
                this.formError(err.response.data);
            });
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
    }
}

export default connect(mapStateToProps, {})(ManageUsers);