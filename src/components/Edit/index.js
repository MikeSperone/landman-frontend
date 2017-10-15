import React from 'react';

import Display from "../Display";

import { API } from '../../constants';
import Button from '../../atoms/Button'; 

export default class Edit extends React.Component {

    constructor(props) {
        super();
        this.data = props.data || {};
        this.data.bin = props.data.bin || "00000000000000000000000";
        this.editType = props.editType || "view";
        this.state = {
            editType: this.editType,
            data: this.data
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
        switch (this.state.editType) {
            case "add":
                this.handleNewData(e);
                break;
            case "edit":
                this.handleEditData(e);
                break;
            case "view":
                console.log("Editing...");
                this.setState({editType: "edit"});
                break;
            case "default":
                console.log("Unexpected edit state!!");
                break;
        }
        //TODO: something when a result returns
        e.preventDefault();
    }

    handleEditDataChange(e) {
        const target = e.target;
        const val = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;
        this.setState({data:{[name]: val}});
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
        const editing = (this.state.editType !== "view");
        //TODO: onClick and submit handlers for the "display" component

        return (
            <div className="edit">
                <Display
                    bin={this.state.data.bin}
                    data={this.state.data}
                    editType={this.state.editType}
                    onFingerChange={this.handleNewData.bind(this)}
                    onFingerClick={this.handleFingeringClick.bind(this)}
                    onEditDataChange={this.handleEditDataChange.bind(this)}
                />
                <Button onClick={this.handleSubmit.bind(this)} text={(editing) ? "Submit" : "Edit"} />
            </div>
        );
    }
}

