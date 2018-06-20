import {IState} from "./IState";
import {IMessage} from "../Messages/IMessage";

export interface IStateStore {
    state: IState;

    set(key: string, val: any): void
    get(key: string): any | null
    addMessage(msg: string): void
    authenticate(username: string, password: string): void
    getAllMessagesByOwnerId(ownerType: string, ownerId: number, authorId: number): IMessage[]
    getUsername(userId: number): string
}