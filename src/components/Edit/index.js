import React from 'react';

import Display from "../Display";
import DeleteConfirmation from "./DeleteConfirmation";

import APIcalls from './APIcalls';
import Button from '../../atoms/Button';
import $ from 'jquery';
import styled from 'styled-components';
import './index.css';

const ButtonSection = styled.div`
    float: right;
    margin: 2rem;
`;

export default class Edit extends React.Component {

    constructor(props) {
        super();
        this.data = props.data;
        this.state = {
            buttonText: "Edit",
            data: this.data,
            editType: props.editType || "view",
            isEditing: false,
            showDeleteConfirmation: false
        };
        console.log("starting edit type: ", this.state.editType);
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

    _placeholder() {
        switch (this.state.editType) {
            case "view":
                console.log("Viewing...");
                this.setState(function(s) {
                    return {buttonText: "Submit", isEditing: true, editType: "edit"};
                });
                break;
            default:
                alert("Unexpected edit state!! \"" + this.state.editType + "\"");
                break;
        }
        //TODO: something when a result returns
    }

    handleAdd(e) {
        this.setState(() => ({ isEditing: true, buttonText: "Add", editType: 'add' }), this.handleNewData);
        e.preventDefault();
    }

    handleCancel() {
        this.setState(() => ({ buttonText: "Edit", isEditing: false, editType: 'search' }));
    }

    handleDelete() {
        alert('TODO: make this delete work');
    }

    confirmDelete() {
        this.setState(() => ({showDeleteConfirmation: true}));
    }

    handleEdit(e) {
        this.setState(() => ({ buttonText: "Edit", isEditing: true, editType: 'edit' }));
        e.preventDefault();
    }
        
    handleEditDataChange(e) {
        const target = e.target;
        const name = target.name;
        const data = this.state.data;
        data[name] = (target.type === 'checkbox') ? target.checked : target.value;
        this.forceUpdate();
    }

    handleNewData(e) {
        const params = APIcalls.verifyData(this.state.data);
        if (params === false) return;
        APIcalls.addNewData(params);
    }

    handleSubmit() {
        alert("submitting data");
        APIcalls.submitData();
    }

    handleFingeringClick(i) {
        const keyState = this.state.data.bin;
        const newState = (String(keyState[i]) === "0") ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        const data = this.state.data;
        data.bin = newKeyState;
        console.log("data: ", data);
        const successCallback = d => this.setState(
            {data:d, buttonText: 'Edit'},
            () => $('#not-found').text('')
        );
        const failCallback = this.setState(prevState => {
            $('#not-found').text('Not Found');
            alert("TODO: remove old results");
            // TODO: display all edit fields with editType 'add'
            return {
                buttonText: 'Add',
                data: { bin: prevState.data.bin },
                editType: 'add'
            };
        });
        this.setState({ data }, () => APIcalls.searchOrAdd(this.state.data.bin, successCallback, failCallback));
    }

    render() {

        return (
            <div className="edit">
                <DeleteConfirmation
                    className={this.state.showDeleteConfirmation ? "" : "hidden"}
                    onCancel={() => this.setState(() => ({showDeleteConfirmation: false}))}
                    onConfirm={this.handleDelete.bind(this)}
                />
                <Display
                    bin={this.state.data.bin}
                    data={this.state.data}
                    isEditing={this.state.isEditing}
                    editType={this.state.editType}
                    onFingerChange={this.handleNewData.bind(this)}
                    onFingerClick={this.handleFingeringClick.bind(this)}
                    onEditDataChange={this.handleEditDataChange.bind(this)}
                />
                <ButtonSection>
                    <Button className={(this.state.isEditing) ? "edit hidden" : "edit"} onClick={this.handleEdit.bind(this)} text={this.state.buttonText} />
                    <Button className={(this.state.isEditing) ? "submit" : "submit hidden"} onClick={this.handleSubmit.bind(this)} text="Submit" />
                    <Button className={(this.state.isEditing) ? "cancel" : "cancel hidden"} onClick={this.handleCancel.bind(this)} text="Cancel" />
                    <Button className={(this.state.isEditing) ? "delete" : "delete hidden"} onClick={this.confirmDelete.bind(this)} text="Delete" />
                </ButtonSection>
            </div>
        );
    }
}