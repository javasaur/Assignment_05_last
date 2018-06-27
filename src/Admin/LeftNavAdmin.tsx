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
                    <Link to={'/manageusers/read'} onClick={this.props.clearResult}>
                        <li onClick={this.selectLI}>
                            Read | Update | Delete
                        </li>
                    </Link>
                    <Link to={'/manageusers/create'} onClick={this.props.clearResult}>
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
    }

}

const mapStateToProps = (state: AppState, ownProps) => {
    return {
        clearResult: ownProps.clearResult
    }
}

export default connect(mapStateToProps, {})(LeftNavAdmin);