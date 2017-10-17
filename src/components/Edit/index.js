import React from 'react';

import Display from "../Display";

import { API } from '../../constants';
import Button from '../../atoms/Button'; 

export default class Edit extends React.Component {

    constructor(props) {
        super();
        this.data = props.data || {bin: "00000000000000000000000"};
        this.state = {
            editType: props.editType || "view",
            editing: (props.editType !== "view"),
            data: this.data
        };
        this.state.buttonText = this.state.editing ? "submit" : "edit";
        console.log("starting edit type: ", this.state.editType);
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
        let params = this._verifyData();
        if (params === false) {
            return;
        }
        req.open("POST", url, true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                if (req.status == 201) {
                    alert("Success, new data added");
                    window.location.reload();
                } else {
                    alert("Server error: " + req.status);
                }
            }
        };
        console.log("Data added: ", params);
        req.send(params);

    }

    _editData() {
        let req = new XMLHttpRequest();
        let url = API + this.state.data.bin;
        let params = this._verifyData();
        req.open("PUT", url, true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    alert("Success, data edited");
                } else {
                    alert("Error - data not updated.  Server status: " + req.status);
                }
            }
        };
        console.log("data editied: ", params);
        req.send(params);
    }

    _verifyData() {
        const d = this.state.data;
        console.log("data: ", d);
        const invalid = "Error: Invalid Data - ";
        let finalData = {};
        if (d.bin.length !== 23) {
            alert(invalid + "incorrect data length");
            return false;
        }
        finalData["bin"] = d.bin;
        if (d.pitches !== "") {
            console.log("d.pitches", d.pitches);
            finalData["pitches"] = d.pitches.split(",");
        }
        finalData["multi"] = d.multi;
        if (JSON.stringify(d.other) !== JSON.stringify({})) {
            finalData["other"] = d.other;
        }
        return JSON.stringify(finalData);
    }


    handleSubmit(e) {
        switch (this.state.editType) {
            case "add":
                this.handleNewData(e);
                break;
            case "edit":
                this.handleEditData(e);
                break;
            case "view":
                console.log("Editing...");
                this.setState(function(s) {
                    return {buttonText: "Submit", editing: true, editType: "edit"};
                });
                break;
            default:
                alert("Unexpected edit state!!" + this.state.editType);
                break;
        }
        //TODO: something when a result returns
        e.preventDefault();
    }
    
    handleEditData() {
        this._editData();
    }

    handleEditDataChange(e) {
        const target = e.target;
        const val = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;
        const data = this.state.data;
        data[name] = val;
        this.forceUpdate();
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
        }

    }

    handleFingeringClick(i) {
        const keyState = this.state.data.bin;
        const newState = (keyState[i] == 0) ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        const data = this.state.data;
        data.bin = newKeyState;
        this.setState({data});
    }

    render() {
        //TODO: onClick and submit handlers for the "display" component

        return (
            <div className="edit">
                <Display
                    bin={this.state.data.bin}
                    data={this.state.data}
                    editing={this.state.editing}
                    editType={this.state.editType}
                    onFingerChange={this.handleNewData.bind(this)}
                    onFingerClick={this.handleFingeringClick.bind(this)}
                    onEditDataChange={this.handleEditDataChange.bind(this)}
                />
                <Button onClick={this.handleSubmit.bind(this)} text={this.state.buttonText} />
            </div>
        );
    }
}

