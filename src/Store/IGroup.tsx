import {IUser} from "./IUser";

export interface IGroup {
    id: number;
    groupname: string;
    users: IUser[];
}