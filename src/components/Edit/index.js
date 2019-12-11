import React from 'react';

import Loader from 'react-loader-spinner';
import DeleteConfirmation from "./DeleteConfirmation";
import FingeringDisplay from '../FingeringDisplay';
import Info from '../Info';

import APIcalls from '../../api';
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
    width: calc(100% - 250px);
    padding: 0.5rem 0;
    text-align: center;
    background-color: dodgerblue;
    float: right;
`;

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bin: "00000000000000000000000",
            soundData: [],
            buttonText: 'Edit',
            found: true,
            errorMessage: 'oops',
            spinner: false,
            showDeleteConfirmation: false
        };
        this.soundIdToDelete = null;
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleDelete() {
        console.info('Edit/i id: ', this.soundIdToDelete);
        this.setState(
            () => ({showDeleteConfirmation: false}),
            () => {
                if (this.soundIdToDelete) {
                    APIcalls.sounds.delete(this.soundIdToDelete);
                } else {
                    alert('No Sound ID to delete');
                }
            }
        );
    }

    toggleDelete(v) {
        console.info('toggleDelete');
        this.setState(() => ({showDeleteConfirmation: v}));
    }

    handleDataChange(e) {
        const target = e.target;
        const name = target.name;
        const data = { bin: this.state.bin, soundData: this.state.soundData };
        data[name] = (target.type === 'checkbox') ? target.checked : target.value;
        this.forceUpdate();
    }

    handleFingeringClick(i) {
        this.setState(() => ({spinner: true}));
        const keyState = this.state.bin;
        const newState = (String(keyState[i]) === "0") ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        
        const _successState = soundData => this.setState(() => ({
            bin: soundData.query.id,
            soundData: soundData.data,
            buttonText: 'Edit',
            spinner: false,
            found: true 
        }));
        const _failureState = resp => this.setState(prevState => ({
            bin: prevState.bin,
            soundData: [],
            spinner: false,
            errorMessage: resp,
            found: false 
        }));

        this.setState(
            () => ({ bin: newKeyState}),
            () => APIcalls.sounds.read(this.state.bin)
                .then(d => {
                    var error = 'Error retrieving data';
                    if (typeof d === "undefined") {
                        error = 'No response';
                    } else if (typeof d.message === "undefined") {
                        error = 'Malformed response';
                    } else if (d.message.success !== false) {
                        _successState(d);
                        return;
                    } else if (d.message.error !== false) {
                        error = d.message.error;
                    }
                    _failureState(error);
                })
        );
    }

    render() {

        return (
            <EditWrapper>
                <DeleteConfirmation
                    className={this.state.showDeleteConfirmation ? "" : "hidden"}
                    onCancel={() => this.toggleDelete(false)}
                    onConfirm={this.handleDelete}
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
                        editType={this.state.editType}
                        onChange={this.handleDataChange.bind(this)}
                        handleConfirmDelete={id => {
                            this.toggleDelete.call(this, true);
                            this.soundIdToDelete = id;
                        }}
                    />
                    <NotFound found={this.state.found} children={this.state.errorMessage} />
                </div>
            </EditWrapper>
        );
    }
}

export default Edit;
