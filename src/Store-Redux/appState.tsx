export interface AppState {
    loggedUserID: number | null,
    loggedUserName: string | null,
    loginError: boolean,
    navTree: any // not precise,
    activeDialogueID: number | null,
    messages: Array<any>
}