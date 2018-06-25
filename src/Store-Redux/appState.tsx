export interface AppState {
    loggedUserID: number | null,
    loggedUserName: string | null,
    loginError: boolean,
    navTree: any // not precise,
    activeDialogueID: string | null,
    messages: Array<any>,
    socket: any
}