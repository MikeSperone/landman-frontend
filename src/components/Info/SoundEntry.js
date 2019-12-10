import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './index.css';
import AudioPlayer from '../AudioPlayer';
import SoundData from './SoundData';
import Comments from '../Comments';

import APIcalls from '../../api';
import { Actions, user } from '../../api';


const SoundEntryWrapper = styled.div`
    border-bottom: 1px solid black;
    clear: both;
`;

class SoundEntry extends React.Component {
    constructor(props) {
        super(props);
        const soundData = this.props.soundData;
        const commentData = soundData && soundData.comments;
        this.soundID = soundData && soundData.id; 
        this.author = soundData && soundData.author;
        this.hasSoundData = Boolean(this.soundID);
        this.createAudioURL();
        this.state = {
            buttonText: 'Edit',
            soundData,
            commentData,
            name: soundData && soundData.name,
            isEditing: false,
            selected: false,
            loaded: (this.props.isNew) ? 0 : 100
        };

        this.bindFunctions();
    }

    bindFunctions() {
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    createAudioURL() {
        this.audioFileUrl = this.props.soundData ?
            'audio/' + this.props.soundData.fingering_id + '.' + this.props.name + '.mp3' :
            '';
    }

    handleClick(e) {
        if (this.hasSoundData) {
            return this.setState(prevState => ({selected: !prevState.selected}));
        }

        // if there is no soundData, this leads to an "Add new data",
        // which is restricted to logged in users with access
        if (this.props.permissions.create) {
            this.setState(
                prevState => ({selected: !prevState.selected}),
                () => {
                    this.setState(
                        prevState => {
                            return (prevState.selected) ?
                                { isEditing: true } :
                                prevState;
                        }
                    );
                }
            );
        } else {
            alert('Insufficient permissions to create');
        }
    }

    _stopEditing() {
        console.info('editing done');
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
        const hasAccess = user.hasAccess(Actions.UPDATE, this.author.id);
        if (hasAccess.access) {
            this.setState(() => ({ buttonText: "Edit", isEditing: true }));
        } else {
            alert(hasAccess.message);
        }
    }

    updateProgress(ProgressEvent) {
        this.setState(() => ({
            // percentage loaded
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
        }));
    }

    handleSelectedFile(selectedFile, name) {
        this.setState(() => ({ name }));

        const data = new FormData();
        data.append('audio_file', selectedFile, selectedFile.name);
        data.append('name', name);
        data.append('fingering_id', this.props.fingering_id);

        APIcalls.sounds.upload(data, this.updateProgress);
    }

    render() {
        console.log("rendering: ", this.props.soundData);
        return (
            <SoundEntryWrapper>
                <AudioPlayer
                    bin={ this.props.fingering_id}
                    name={ this.state.name || 'Add new sound...' }
                    src={ this.audioFileUrl || '' }
                    audioLoaded={this.state.loaded}
                    isEditing={ this.state.isEditing }
                    isNew={ this.props.new }
                    selected={ this.state.selected }
                    handleClick={ this.handleClick.bind(this) }
                    handleSelectedFile={ this.handleSelectedFile }
                />
                {this.state.selected && this.state.loaded ? (
                    <div>
                        <SoundData
                            data={this.state.soundData || {fingering_id: this.props.fingering_id}}
                            name={this.state.name}
                            isEditing={this.state.isEditing}
                            permissions={this.props.permissions}
                            isNew={this.props.new}
                            audioLoaded={this.state.loaded}
                            handleEdit={this.handleEdit.bind(this)}
                            handleUpdate={this.handleUpdate}
                            handleCancel={this.handleCancel}
                        />
                        <Comments
                            commentData={this.state.commentData || []}
                            sound_id={this.soundID}
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
    handleConfirmDelete: PropTypes.func,
    soundData: PropTypes.object,
    permissions: PropTypes.object
};

export default SoundEntry;
