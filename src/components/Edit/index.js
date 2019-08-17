import React from 'react';

import Loader from 'react-loader-spinner';
import DeleteConfirmation from "./DeleteConfirmation";
import FingeringDisplay from '../FingeringDisplay';
import Info from '../Info';

import APIcalls from '../../APIcalls';
import styled from 'styled-components';
import './index.css';

const EditWrapper = styled.div.attrs({
    className: 'edit'
})`
    position: relative;
`;

const Spinner = styled.div`
    position: absolute;
    left: calc(50vw - 150px);
    z-index: 9999;
`;

const NotFound = styled.div`
    display: ${props => props.found ? 'none' : 'block'};
    height: 10rem;
    width: 30rem;
    background-color: dodgerblue;
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
    }
    
    handleDelete() {
        this.setState(
            () => ({showDeleteConfirmation: false}),
            () => APIcalls.deleteEntry()
        );
    }

    toggleDelete(v) {
        this.setState(() => ({showDeleteConfirmation: v}));
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
        this.setState(
            () => ({ bin: newKeyState}),
            () => APIcalls.search(this.state.bin)
                .then(d => {
                    console.log('type of d', typeof d);
                    console.log('success! ', d.response);
                    if (d.response) _successState(d.response);
                    else _failureState();
                })
                // .catch(_failureState);
        );
    }

    render() {

        return (
            <EditWrapper>
                <DeleteConfirmation
                    className={this.state.showDeleteConfirmation ? "" : "hidden"}
                    onCancel={this.toggleDelete.bind(this, false)}
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
                        handleConfirmDelete={this.toggleDelete.bind(this, true)}
                    />
                </div>
                <NotFound found={this.state.found} children={"Not Found"} />
            </EditWrapper>
        );
    }
}

export default Edit;
