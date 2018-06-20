import * as moment from 'moment';

import {IStateStore} from "./IStateStore";
import {IState} from "./IState";
import {MessagesStore} from "./MessagesStore";
import {UsersStore} from "./UsersStore";
import {GroupsStore} from "./GroupsStore";

export class StateStore implements IStateStore {
    state: IState = {
        currentDialogueOwnerId: null,
        currentDialogueOwnerType: null,
        loggedUserId: null
    };
    messageStore: MessagesStore;
    usersStore: UsersStore;
    groupsStore: GroupsStore;

    constructor() {
        this.messageStore = MessagesStore.getInstance();
        this.usersStore = UsersStore.getInstance();
        this.groupsStore = GroupsStore.getInstance();
    }

    set(key: string, val: any) {
        this.state[key] = val;
    }

    get(key: string) {
        return this.state[key] || null;
    }

    addMessage(msg: string) {
        const ownerId = this.get('currentDialogueOwnerId');
        const authorId = this.get('loggedUserId');
        const timestamp = moment().unix();
        const ownerType = this.get('currentDialogueOwnerType')
        const res = this.messageStore.createAndAddMessage(ownerId, authorId, msg, timestamp, ownerType);
        if(res) {
            // For test only send immediate response
            if(ownerType === 'user') {
                this.messageStore.createAndAddMessage(authorId, ownerId, msg, timestamp, 'user');
            }
            StateStore.forceUpdateOfMainComponent();
        }
    }

    authenticate(username: string, password: string) {
        const user = this.usersStore.getUserByName(username);
        if(!!user) {
            this.set('loggedUserId', user.id);
            StateStore.forceUpdateOfMainComponent();
        }
    }

    getAllMessagesByOwnerId(ownerType: string, ownerId: number, authorId: number) {
        return this.messageStore.getAllMessagesForId(ownerType, ownerId, authorId);
    }

    getUsername(userId: number) {
        return this.usersStore.getUsername(userId);
    }

    static instance: IStateStore;

    static getInstance() {
        if (!StateStore.instance) {
            StateStore.instance = new StateStore();
        }
        return StateStore.instance;
    }

    static changeActiveDialogue(index: number, type: string) {
        StateStore.getInstance().set('currentDialogueOwnerId', +index);
        StateStore.getInstance().set('currentDialogueOwnerType', type);
        StateStore.forceUpdateOfMainComponent();
    }

    static forceUpdateOfMainComponent() {
        StateStore.getInstance().get('appRefForceUpdate')();
    }

    static logout() {
        StateStore.getInstance().set('loggedUserId', null);
        StateStore.forceUpdateOfMainComponent();
    }
}