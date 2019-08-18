import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './index.css';
import SoundData from './SoundData';
import AudioPlayer from './AudioPlayer';
import { Actions } from '../../user';
import { userHasAccess } from '../../APIcalls.js';


const SoundEntryWrapper = styled.div`
    border-bottom: 1px solid black;
    clear: both;
`;

class SoundEntry extends React.Component {
    constructor(props) {
        super(props);
        this.soundID = this.props.soundData && this.props.soundData.soundID; 
        this.author = this.props.soundData && this.props.soundData.author;
        this.hasSoundData = Boolean(this.soundID);
        this.name = this.soundID || 'Add new sound...';
        this.state = {
            buttonText: 'Edit',
            isEditing: false,
            selected: false,
            loaded: 0
        };
    }

    handleClick(e) {
        if (this.hasSoundData) {
            return this.setState(prevState => ({selected: !prevState.selected}));
        }

        // if there is no soundData, this leads to an "Add new data",
        // which is restricted to logged in users with access
        userHasAccess(Actions.CREATE) &&
            this.setState(prevState => ({selected: !prevState.selected}));
    }

    _stopEditing() {
        this.setState(() => ({ buttonText: "Edit", isEditing: false }));
    }

    handleCancel(e) {
        e.preventDefault();
        this._stopEditing();
    }

    handleUpdate() {
        this._stopEditing();
    }

    handleEdit(e) {
        e.preventDefault();
        userHasAccess(Actions.UPDATE, this.author) &&
            this.setState(() => ({ buttonText: "Edit", isEditing: true }));
    }

    render() {
        console.log("rendering: ", this.props.soundData);
        return (
            <SoundEntryWrapper>
                <AudioPlayer
                    name={this.name}
                    src={this.props.soundData && this.props.soundData.name || ''}
                    isEditing={this.state.isEditing}
                    isNew={this.props.new}
                    selected={this.state.selected}
                    handleClick={this.handleClick.bind(this)}
                    handleNewEntry={this.props.handleNewEntry}
                />
                {this.state.selected ? (
                    <div>
                        <SoundData
                            data={this.props.soundData || {bin: this.props.bin}}
                            isEditing={this.state.isEditing}
                            isNew={this.props.new}
                            handleEdit={this.handleEdit.bind(this)}
                            handleUpdate={this.handleUpdate.bind(this)}
                            handleCancel={this.handleCancel.bind(this)}
                        />
                    </div>
                ) : null}
            </SoundEntryWrapper>
        );
    }
}

SoundEntry.propTypes = {
    isEditing: PropTypes.bool,
    new: PropTypes.bool,
    handleNewEntry: PropTypes.func,
    handleConfirmDelete: PropTypes.func,
    soundData: PropTypes.object
};

export default SoundEntry;
