import React from 'react';

import Loader from 'react-loader-spinner';
import DeleteConfirmation from "./DeleteConfirmation";
import FingeringDisplay from '../../atoms/FingeringDisplay';
import Info from '../../atoms/Info';

import APIcalls from './APIcalls';
import Button from '../../atoms/Button';
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

const NotFound = styled.div`
    display: ${props => props.found ? 'none' : 'block'};
`;

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bin: "00000000000000000000000",
            soundData: [],
            isEditing: false,
            buttonText: 'Edit',
            found: true,
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
        e.preventDefault();
        this.setState(() => ({ isEditing: true, buttonText: "Add", editType: 'add' }), APIcalls.addNewData(this.state.data));
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
        const data = { bin: this.state.bin, soundData: this.state.soundData };
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

    handleFingeringClick(i) {
        console.log('handleFingeringClick');
        this.setState(() => ({spinner: true}));
        const keyState = this.state.bin;
        const newState = (String(keyState[i]) === "0") ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        
        const _successState = resp => this.setState(() => ({
            bin: resp.bin,
            soundData: resp.soundData,
            buttonText: 'Edit',
            spinner: false,
            found: true 
        }));
        const _failureState = () => this.setState(prevState => ({
            buttonText: 'Add',
            bin: prevState.bin,
            soundData: [],
            editType: 'add',
            spinner: false,
            found: false 
        }));
        const successCallback = d => {
            console.log('success! ', d.response);
            if (d.response) {
                console.log('d.response.soundData: ', d.response.soundData);
                _successState(d.response);
            }
            else _failureState();
        };
        const failCallback = _failureState;
        this.setState(() => ({ bin: newKeyState}), () => APIcalls.search(this.state.bin, successCallback, failCallback));
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
                <div> 
                    <FingeringDisplay
                        editing={this.state.editType === 'add' || this.state.editType === 'search'}
                        editType={this.state.editType}
                        bin={this.state.bin}
                        handleClick={this.handleFingeringClick.bind(this)}
                    />
                    <Info
                        soundData={this.state.soundData}
                        handleNewEntry={this.newEntry.bind(this)}
                        isEditing={this.state.isEditing}
                        editType={this.state.editType}
                        onChange={this.handleEditDataChange.bind(this)}
                    />
                </div>
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
                <NotFound found={this.state.found} children={"Not Found"} />
            </div>
        );
    }
}

export default Edit;