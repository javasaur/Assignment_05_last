import * as React from 'react';
import {BrowserRouter, Route, Redirect} from "react-router-dom";

import './App.css';
import {IUser} from "./Store/IUser";
import {IStateStore} from "./Store/IStateStore";
import {StateStore} from "./Store/StateStore";
import {Login} from "./Other/Login";
import {ChatWindow} from "./Blocks/ChatWindow";
import {Switch} from "react-router";

interface IAppState {
  users: IUser[];
  userInSession: IUser | null;
}

class App extends React.Component<any, IAppState> {
    private store: IStateStore;

    constructor(props: any) {
        super(props);
        this.store = StateStore.getInstance();
        this.store.set('appRefForceUpdate', this.forceUpdate.bind(this));
    }

    public render() {
       const login = () => {
            const logged = this.store.get('loggedUserId');
            return !!logged ? <Redirect to='/chat' /> : <Login />;
       }

       const chatWindow = () => {
           const logged = this.store.get('loggedUserId');
           return !!logged ? <ChatWindow/> : <Login />;
       }


        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path='/' exact={true} render={login} />
                        <Route path='/chat' render={chatWindow} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
