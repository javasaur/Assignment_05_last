export interface AppState {
    loggedUserID: number | null,
    loggedUserName: string | null,
    loginError: boolean,
    navTree: any // not precise,
    adminNavTree: any,
    adminCurrentGroupID: string | null,
    activeDialogue: {
        id: string,
        name: string,
        type: string
    } | null,
    messages: Array<any>,
    socket: any,
    users: Array<any>,
    usersBySelector: Array<any>
}