import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './index.css';
import SoundData from './SoundData';
import AudioPlayer from './AudioPlayer';


const SoundEntryWrapper = styled.div`
    border-bottom: 1px solid black;
    clear: both;
`;

class SoundEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: 'Edit',
            isEditing: false,
            selected: false,
            loaded: 0
        };
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({selected: !prevState.selected}));
    }
    
    handleCancel(e) {
        e.preventDefault();
        this.setState(() => ({ buttonText: "Edit", isEditing: false }));
    }

    handleEdit(e) {
        e.preventDefault();
        this.setState(() => ({ buttonText: "Edit", isEditing: true }));
    }

    render() {
        console.log("rendering: ", this.props.soundData);
        return (
            <SoundEntryWrapper>
                <AudioPlayer
                    handleClick={this.handleClick.bind(this)}
                    name={(this.props.soundData && this.props.soundData.soundID) || 'Add new sound...'}
                    isEditing={this.state.isEditing}
                    isNew={this.props.new}
                    selected={this.state.selected}
                    handleNewEntry={this.props.handleNewEntry}
                />
                {this.state.selected ? (
                    <div>
                        <SoundData
                            data={this.props.soundData || {bin: this.props.bin}}
                            isEditing={this.state.isEditing}
                            isNew={this.props.new}
                            handleEdit={this.handleEdit.bind(this)}
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