import * as React from 'react';

import {AppState} from "../Store-Redux/appState";
import {connect} from "react-redux";
import "./LeftNavAdmin.css";
import {Link} from "react-router-dom";

class LeftNavAdmin extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div className="leftNavAdmin">
                <ul tabIndex={0}>
                    <li onClick={this.selectLI}>
                        Read | Update | Delete
                    </li>
                    <Link to={'/manageusers/create'}>
                        <li onClick={this.selectLI}>
                            Create
                        </li>
                    </Link>
                </ul>
            </div>
        );
    }

    private selectLI = (event) => {
        this.unSelectLIs();
        event.target.classList.add('selected');
    }

    private unSelectLIs = () => {
        const elems = document.querySelectorAll('.leftNavAdmin li');
        Array.from(elems).forEach(elem => elem.className = '');
        console.log(elems);
    }

}

const mapStateToProps = (state: AppState) => {
    return {

    }
}

export default connect(mapStateToProps, {})(LeftNavAdmin);