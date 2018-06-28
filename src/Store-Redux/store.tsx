import {Action, AnyAction, applyMiddleware, createStore, Dispatch, Unsubscribe} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    LOG_OUT,
    NULL_LOGIN_ERROR,
    RAISE_LOGIN_ERROR,
    SET_LOGGED_USER,
    SET_MESSAGES,
    SET_NAV_TREE,
    SET_SOCKET,
    SWITCH_DIALOGUE
} from "./actions/actionTypes";
import {AppState} from "./appState";
import {logout, nullLoginError, raiseLoginError, setLoggedUser} from "./reducers/login";
import {setNavTree} from "./reducers/tree";
import {setMessages, switchDialogue} from "./reducers/dialogues";
import {setSocket} from "./reducers/socket";

export const initialState: AppState = {
    loggedUserID: null,
    loggedUserName: null,
    loginError: false,
    navTree: null,
    adminNavTree: null,
    activeDialogueID: null,
    messages: [],
    socket: null
};

function rootReducer(state: AppState, action: AnyAction): AppState {
    switch(action.type) {
        case NULL_LOGIN_ERROR:
            return nullLoginError(state);
        case LOG_OUT:
            return logout(state);
        case RAISE_LOGIN_ERROR:
            return raiseLoginError(state);
        case SET_LOGGED_USER:
            return setLoggedUser(state, action.payload);
        case SET_NAV_TREE:
            return setNavTree(state, action.payload);
        case SET_MESSAGES:
            return setMessages(state, action.payload);
        case SET_SOCKET:
            return setSocket(state, action.payload);
        case SWITCH_DIALOGUE:
            return switchDialogue(state, action.payload);
        default:
            return state;
    }
}

interface AppStore {
    dispatch: Dispatch<Action | any>;
    getState(): AppState;
    subscribe(listener: () => void): Unsubscribe;
}

export const store: AppStore = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
);