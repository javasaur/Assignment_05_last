import {mockGroups} from "../Mocks/MockGroups";
import {IGroup} from "./IGroup";

export class GroupsStore {
    static instance: GroupsStore;
    private _groups: IGroup[];

    constructor() {
        this._groups = mockGroups;
    }

    static getInstance() {
        if (!GroupsStore.instance) {
            GroupsStore.instance = new GroupsStore();
        }

        return GroupsStore.instance;
    }

    get groups(): IGroup[] {
        return this._groups;
    }
}