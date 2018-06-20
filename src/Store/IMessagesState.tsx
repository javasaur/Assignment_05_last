import {IMessage} from "../Messages/IMessage";

export interface IMessagesState {
    [x: number]: IMessage[];
}