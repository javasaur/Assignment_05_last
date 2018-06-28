export interface AppState {
    loggedUserID: number | null,
    loggedUserName: string | null,
    loginError: boolean,
    navTree: any // not precise,
    adminNavTree: any,
    activeDialogueID: string | null,
    messages: Array<any>,
    socket: any
}