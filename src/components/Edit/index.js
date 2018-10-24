import React from 'react';
import Loader from 'react-loader-spinner';

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

const Spinner = styled.div`
    position: absolute;
    left: calc(50vw - 150px);
    z-index: 9999;
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
            spinner: false,
            showDeleteConfirmation: false
        };
        console.log("starting edit type: ", this.state.editType);
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
    }

    handleAdd(e) {
        this.setState(() => ({ isEditing: true, buttonText: "Add", editType: 'add' }), APIcalls.addNewData(this.state.data));
        e.preventDefault();
    }

    handleCancel() {
        this.setState(() => ({ buttonText: "Edit", isEditing: false, editType: 'search' }));
    }

    handleDelete() {
        this.setState(
            () => ({showDeleteConfirmation: false}),
            () => APIcalls.deleteEntry()
        );
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

    newEntry() {
        return {
            updateProgress: ProgressEvent => this.loaded = (ProgressEvent.loaded / ProgressEvent.total*100),
            handleUpload: () => {
                const data = new FormData()
                data.append('file', this.selectedFile, this.selectedFile.name)

                APIcalls.upload(data, this.updateProgress)
                    .then(res => {
                        console.log(res.statusText);
                    });

            },
            handleSelectedFile: event => this.selectedFile = event.target.files[0],
            selectedFile: null,
            loaded: 0
        };
    }

    handleSubmit() {
        APIcalls.submitData();
    }

    spinner(isOn) {
        this.setState(state => ({ spinner: isOn }));
    }

    handleFingeringClick(i) {
        const keyState = this.state.data.bin;
        const newState = (String(keyState[i]) === "0") ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        const data = this.state.data;
        data.bin = newKeyState;
        this.spinner(true);
        const successCallback = d => this.setState(
            {data:d, buttonText: 'Edit'},
            () => {
                this.spinner(false);
                $('#not-found').text('');
            }
        );
        const failCallback = () => this.setState(prevState => ({
            buttonText: 'Add',
            data: { bin: prevState.data.bin },
            editType: 'add'
        }), () => {
            this.spinner(false);
            $('#not-found').text('Not Found');
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
                <Spinner className={this.state.spinner ? "spinner" : "spinner hidden"}>
                    <Loader 
                        type="Bars"
                        color="#00BFFF"
                        height="300"	
                        width="300"
                    />
                </Spinner>
                <Display
                    bin={this.state.data.bin}
                    data={this.state.data}
                    isEditing={this.state.isEditing}
                    editType={this.state.editType}
                    onNewEntry={this.newEntry.bind(this)}
                    onFingerChange={APIcalls.addNewData.bind(this)}
                    onFingerClick={this.handleFingeringClick.bind(this)}
                    onEditDataChange={this.handleEditDataChange.bind(this)}
                />
                <ButtonSection>
                    <Button
                        className={(this.state.isEditing) ? "edit hidden" : "edit"}
                        onClick={this.handleEdit.bind(this)}
                        text={this.state.buttonText}
                    />
                    <Button
                        className={(this.state.isEditing) ? "submit" : "submit hidden"}
                        onClick={this.handleSubmit.bind(this)}
                        text="Submit"
                    />
                    <Button
                        className={(this.state.isEditing) ? "cancel" : "cancel hidden"}
                        onClick={this.handleCancel.bind(this)}
                        text="Cancel"
                    />
                    <Button
                        className={(this.state.isEditing) ? "delete" : "delete hidden"}
                        onClick={this.confirmDelete.bind(this)}
                        text="Delete"
                    />
                </ButtonSection>
            </div>
        );
    }
}
