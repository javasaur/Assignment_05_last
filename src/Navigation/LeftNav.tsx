import * as React from 'react';

import './LeftNav.css';
import { ChatTree } from './chat-tree.js';
import {StateStore} from "../Store/StateStore";

export class LeftNav extends React.Component<any, {content: Array<any>}> {

    constructor(props: any) {
        super(props);
        this.state = {
            content: [
        {
            "type": "group",
            "name": "Friends",
            "id": 1,
            "items": [
                {
                    "type": "group",
                    "name": "Best Friends",
                    "id": 2,
                    "items": [
                        {
                            "type": "user",
                            "name": "Ori",
                            "id": 5,
                        },
                        
                        {
                            "type": "group",
                            "name": "Not friends, but brothers!",
                            "id": 3,
                            "items": [
                                {
                                    "type": "user",
                                    "name": "John",
                                    "id": 2,
                                },
                                {
                                    "type": "user",
                                    "name": "Jack",
                                    "id": 3,
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "user",
                    "name": "Udi",
                    "id": 4,
                }
            ]
        },
            {
                "type": "user",
                "name": "Ori",
                "id": 5,
            },
            {
                "type": "user",
                "name": "Roni",
                "id": 6,
            },
            {
                "type": "group",
                "name": "Colleagues",
                "id": 4,
                "items": [
                    {
                        "type": "user",
                        "name": "Moshe",
                        "id": 7,
                    },
                    {
                        "type": "user",
                        "name": "David",
                        "id": 8,
                    }
                ]
            }
        ]
        };
    }

    public render() {
        const elem = <ul className="left tree" tabIndex={0} />;
        return (
            <div className="leftNav">
                {elem}
            </div>
        );
    }

    componentDidMount() {
        const userID = StateStore.getInstance().get('loggedUserId');
        const body = JSON.stringify({userID: userID});
        fetch('http://localhost:4000/tree', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        })
            .then(tree => tree.json().then(treeJSON => {
                const tree = ChatTree(document.querySelector('ul.tree'));
                tree.subscribeToElementSwitch(StateStore.changeActiveDialogue);
                tree.load(treeJSON);
                tree.element.focus();
            }))
            .catch(err => console.log(err))
    }
}