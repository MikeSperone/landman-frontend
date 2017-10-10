import React from 'react';
import $ from 'jquery';

import FingeringDisplay from '../../components/FingeringDisplay';
import EditInfo from '../../components/EditInfo';

export default class EditData extends React.Component {

    constructor(props) {
        super();
        this.state = {
            keyState: "00000000000000000000000"
        };
    }

    handleSubmit(e) {
        console.log("searching...");
        if (this.props.editType === "add") {
            this.handleNewData(e);
        } else if (this.props.editType === "edit") {
            this.handleEditData(e);
        }
        //TODO: something when a result returns
        e.preventDefault();
    }

    handleEditData(e) {

    }

    handleNewData(e) {

        const url = "http://api.mikesperone.com/landman/v1/alto/" + this.state.keyState;
        //TODO: check if fingering exists
        const res = $.getJSON(url, (d) => {
            console.log(d);
            // this.setState({keyState:d}));
        });
        if (res) {
            console.log("this already exists");
        } else {
            //TODO: create this fingering
        }

    }

    handleClick(i) {
        const keyState = this.state.keyState;
        const newState = (keyState[i] == 0) ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        this.setState({keyState: newKeyState});
    }

    render() {
        return (
            <div className="new">
                <FingeringDisplay editing bin={this.state.keyState} onClick={this.handleClick.bind(this)}/>
                <EditInfo />
            </div>
        );
    }
}

