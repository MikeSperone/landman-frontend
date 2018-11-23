import React from 'react';

import Loader from 'react-loader-spinner';
import DeleteConfirmation from "./DeleteConfirmation";
import FingeringDisplay from '../../atoms/FingeringDisplay';
import Info from '../../atoms/Info';

import APIcalls from '../../APIcalls';
import styled from 'styled-components';
import './index.css';

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
                    return {buttonText: "Submit", editType: "edit"};
                });
                break;
            default:
                alert("Unexpected edit state!! \"" + this.state.editType + "\"");
                break;
        }
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


    handleDataChange(e) {
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
            loaded: 0
        };
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
            bin: prevState.bin,
            soundData: [],
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
                        bin={this.state.bin}
                        handleClick={this.handleFingeringClick.bind(this)}
                    />
                    <Info
                        soundData={this.state.soundData}
                        bin={this.state.bin}
                        handleNewEntry={this.newEntry.bind(this)}
                        editType={this.state.editType}
                        onChange={this.handleDataChange.bind(this)}
                        handleConfirmDelete={this.confirmDelete.bind(this)}
                    />
                </div>
                <NotFound found={this.state.found} children={"Not Found"} />
            </div>
        );
    }
}

export default Edit;