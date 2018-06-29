import * as React from "react";

import './ReadUsers.css';
import {AppState} from "../../Store-Redux/appState";
import {connect} from "react-redux";
import {UpdateUser} from "./UpdateUser";

interface ReadUsersState {
    users: Array<any>
    result: any,
    updateUser: any
}

interface ReadUsersProps {
    clearResult: Function,
    fetchUsers?: Function,
    updateUser?: Function,
    removeUser?: Function,
    associateUserWithGroup?: Function
}

export class ReadUsers extends React.Component<ReadUsersProps, ReadUsersState> {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            result: null,
            updateUser: null,
        }
    }

    componentDidMount() {
        console.log('readusers did mount');
    }

    componentDidUpdate() {
        console.log('readusers did update');
    }

    render() {
        let updateForm;
        if(this.state.updateUser) {
            updateForm = <UpdateUser updateUser={this.updateUser} user={this.state.updateUser}/>
        } else {
            updateForm = null
        }


        const usersLI = this.state.users.map((u, index) => {
            const addToGroupIcon = this.props.associateUserWithGroup ?
                <i onClick={this.addUserToGroup.bind(this, u.id)} className="fas fa-user-plus readusers-addtogroupicon" /> :
                null;

            const updateIcon = this.props.updateUser ?
                <i onClick={this.passUpdateUserData.bind(this, {id: u.id, name: u.name, age: u.age})} className="fas fa-pen readusers-updateicon" /> :
                null;

            const removeIcon = this.props.removeUser ?
                <i onClick={this.removeUser.bind(null, u.id)} className="fas fa-trash-alt readusers-removeicon" /> :
                null;

            const li = (
                <li key={u.id}>[{u.id}] {u.name}, {u.age}
                    {addToGroupIcon}
                    {updateIcon}
                    {removeIcon}
                </li>)
            return li;
        })
        const users = this.state.users.length > 0 ? <div className="readusers-list">[ID] Name, age<ul>{usersLI}</ul></div> :
        <div className="readusers-list">No users to display</div>;
        return (
            <div className="readusers">
                <div className="readusers-header">
                    <div className="readusers-refresh" onClick={this.refreshUsers.bind(this, true)}>Users list <i className="fas fa-sync-alt refresh" /></div>
                </div>
                {users}
                {this.state.result}
                {updateForm}
            </div>
        );
    }

    private addUserToGroup = async(id, cb) => {
        this.props.associateUserWithGroup(id, this.refreshUsers.bind(this, false));
    }

    private refreshUsers = async (clearResult) => {
        if(clearResult) {
            this.props.clearResult();
        }
        this.setState({users: []});

        this.props.fetchUsers()
            .then(response => this.setState({users: response.data}))
            .catch(err => console.log(err.response.data))
    }

    private removeUser = (id, cb) => {
        this.props.removeUser(id, this.refreshUsers.bind(this, false))
    }

    private passUpdateUserData = (user) => {
        this.props.clearResult();
        this.setState({updateUser: user});
    }

    private updateUser = (user) => {
        this.props.clearResult();
        this.props.updateUser(user, this.refreshUsers.bind(this, false))
    }
}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
        clearResult: ownProps.clearResult,
        fetchUsers: ownProps.fetchUsers,
        removeUser: ownProps.removeUser,
        updateUser: ownProps.updateUser,
        associateUserWithGroup: ownProps.associateUserWithGroup
    }
}

export default connect(mapStateToProps, {})(ReadUsers);