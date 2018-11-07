import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './index.css';
import SoundData from './soundData';
import AudioPlayer from './audioPlayer';

const SoundEntryWrapper = styled.div`
    border-bottom: 1px solid black;
    clear: both;
`;

class SoundEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: false, loaded: 0};
        this.audio = (this.props.soundData && this.props.soundData.soundID) || 'audio-placeholder';
        this.sound = this.props.sound || (this.props.new && "Add New Sound...");
    }

    handleClick() {
        this.setState(prevState => ({selected: !prevState.selected}));
    }

    render() {
        console.log("rendering: ", this.props.soundData);
        return (
            <SoundEntryWrapper>
                <AudioPlayer
                    handleClick={this.handleClick.bind(this)}
                    audio={this.audio || ''}
                    name={(this.props.soundData && this.props.soundData.soundID) || ''}
                    isEditing={this.props.isEditing}
                    isNew={this.props.new}
                    selected={this.state.selected}
                    handleNewEntry={this.props.handleNewEntry}
                />
                <SoundData
                    data={this.props.soundData || {}}
                    isEditing={this.props.isEditing}
                    selected={this.state.selected}
                />
            </SoundEntryWrapper>
        );
    }
}

SoundEntry.propTypes = {
    isEditing: PropTypes.bool,
    new: PropTypes.bool,
    handleNewEntry: PropTypes.func,
    soundData: PropTypes.object
};

export default SoundEntry;