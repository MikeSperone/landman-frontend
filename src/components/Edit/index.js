import React from 'react';

import Display from "../Display";

import { API } from '../../constants';
import Button from '../../atoms/Button';
import $ from 'jquery';
import './index.css';

export default class Edit extends React.Component {

    constructor(props) {
        super();
        this.data = props.data;
        this.state = {
            editType: props.editType || "view",
            editing: (props.editType !== "view"),
            data: this.data
        };
        this.state.buttonText = this.state.editing ? "Submit" : "Edit";
        console.log("starting edit type: ", this.state.editType);
    }

    _searchOrAdd(bin) {
        const url = API.fingerings + bin;
        console.log("url: ", url);
        $.getJSON(
            url,
            d => this.setState({data:d, buttonText: 'Edit'},
                () => {
                    $('#not-found').text('');
                }
            )
        ).fail(e => {
            console.log("no match");
            this.setState({data:{}, buttonText: 'Add', editType: 'add'}, () => {
                $('#not-found').text('Not Found');
                //TODO: clear sound data
                //TODO: activate submit/edit
            });
        });
    }

    _addNewData(params) {
        let req = new XMLHttpRequest();
        let url = API;

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
                    this.setState(function(s) {
                        return {buttonText: "Edit", editing: false, editType: "view"};
                    });
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
        if (d.pitches && d.pitches.length) {
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
                console.log("Adding...");
                this.handleNewData(e);
                break;
            case "edit":
                console.log("Editing...");
                this.handleEditData(e);
                break;
            case "view":
                console.log("Viewing...");
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

    handleCancel() {
        //TODO: cancel
        alert("TODO: make this button cancel out of editing");
    }

    handleDelete() {
        //TODO: confirmation of delete
        alert("TODO: make this button confirm deletion of entry");
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
        const params = this._verifyData();
        if (params === false) return;
        this._addNewData(params);

    }

    handleFingeringClick(i) {
        const keyState = this.state.data.bin;
        const newState = (keyState[i] == 0) ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        const data = this.state.data;
        data.bin = newKeyState;
        this.setState({data},() => this._searchOrAdd(this.state.data.bin));
    }

    handleBrowseClick(n) {
        // I think I will have to change the db id's to be sequential numbers
        // and instead, here use the id to get the next db value.
        const currentDecimalBin = parseInt(this.state.data.bin, 2);
        const newDecimalBin = currentDecimalBin + n;
        const newBin = newDecimalBin.toString(2);
        const newBinString = Array(23 - newBin.length).join("0") + newBin;
        //TODO: get newBinString
    }

    render() {

        return (
            <div className="edit">
                <Button className="left" onClick={this.handleBrowseClick.bind(this, -1)} text="<" />
                <Display
                    bin={this.state.data.bin}
                    data={this.state.data}
                    editing={this.state.editing}
                    editType={this.state.editType}
                    onFingerChange={this.handleNewData.bind(this)}
                    onFingerClick={this.handleFingeringClick.bind(this)}
                    onEditDataChange={this.handleEditDataChange.bind(this)}
                />
                <div>
                    <Button className="editOrSubmit" onClick={this.handleSubmit.bind(this)} text={this.state.buttonText} />
                    <Button className={(this.state.editType === "edit") ? "cancel" : "cancel hidden"} onClick={this.handleCancel.bind(this)} text="Cancel" />
                    <Button className={(this.state.editType === "edit") ? "delete" : "delete hidden"} onClick={this.handleDelete.bind(this)} text="Delete" />
                </div>
                <Button className="right" onClick={this.handleBrowseClick.bind(this, 1)} text=">" />
            </div>
        );
    }
}

