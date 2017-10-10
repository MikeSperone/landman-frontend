import React from 'react';
import $ from 'jquery';

import FingeringDisplay from '../../components/FingeringDisplay';
import EditInfo from '../../components/EditInfo';

const API = "http://api.mikesperone.com/landman/v1/alto/";

export default class EditData extends React.Component {

    constructor(props) {
        super();
        this.state = {
            bin: "00000000000000000000000",
            pitches: "",
            multi: false,
            audio: '',
            other: {}
        };
    }

    _checkIfExists(bin) {
        const url = API + bin;
        var req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.send();
        return (req.status === 200);
    }

    _addNewData() {
        let req = new XMLHttpRequest();
        let url = API;
        let params = this._verifyData(this.state);
        req.open("POST", url, true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = () => {
            if (req.readyState == 4 && req.status == 200) {
                console.log("Success, new data added");
            }
        };
        console.log(params);
        req.send(params);

    }

    _verifyData(d) {
        const invalid = "Error: Invalid Data - ";
        let finalData = {};
        if (d.bin.length !== 23) {
            alert(invalid, "incorrect data length");
            return false;
        }
        finalData["bin"] = d.bin;
        if (d.pitches !== "") {
            finalData["pitches"] = d.pitches.split(",");
        }
        finalData["multi"] = d.multi;
        if (JSON.stringify(d.other) !== JSON.stringify({})) {
            finalData["other"] = d.other;
        }
        return JSON.stringify(finalData);
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

    handleChange(e) {
        const target = e.target;
        const val = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: val});
    }

    handleEditData(e) {

        console.log("editing current data");
    }

    handleNewData(e) {

        console.log("adding new data");
        const exists = this._checkIfExists(this.state.bin);
        console.log("exists? ", exists);
        if (exists) {
            alert('this fingering already exists');
        } else {
            console.log("creating new entry");
            this._addNewData();
            //TODO: create this fingering
        }

    }

    handleFingeringClick(i) {
        const keyState = this.state.bin;
        const newState = (keyState[i] == 0) ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        this.setState({bin: newKeyState});
    }

    render() {
        return (
            <div className="new">
                <FingeringDisplay
                    editing
                    bin={this.state.bin}
                    onClick={this.handleFingeringClick.bind(this)}
                />
                <EditInfo
                    pitches={this.state.pitches}
                    multi={this.state.multi}
                    audio={this.state.audio}
                    other={this.state.other.toString()}
                    onChange={this.handleChange.bind(this)}
                />
                <button
                    className="pure-button pure-button-primary"
                    onClick={this.handleSubmit.bind(this)}
                >
                    Submit
                </button> 
            </div>
        );
    }
}

