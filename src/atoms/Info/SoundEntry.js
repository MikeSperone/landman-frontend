import React from 'react';
import styled from 'styled-components';
import './index.css';
import $ from 'jquery';
import { API } from '../../constants';
import SoundData from './soundData';
import AudioPlayer from './audioPlayer';

const SoundEntryWrapper = styled.div`
    border-bottom: 1px solid black;
    clear: both;
`;

class SoundEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: {}, selected: false, loaded: 0};
        this.sound = props.sound || (props.new && "Add New Sound...");
    }

    componentWillMount() {
        const url = API.soundData;
        console.log("url", url);
        $.getJSON(
            url + this.sound,
            (d) => this.setState({data:d})
        );
    }

    handleClick() {
        this.setState(prevState => ({selected: !prevState.selected}));
    }

    render() {
        console.log("rendering: ", this.state.data);
        return (
            <SoundEntryWrapper>
                <AudioPlayer
                    handleClick={this.handleClick.bind(this)}
                    audio={this.state.data.soundID}
                    name={this.sound}
                    isEditing={this.props.isEditing}
                    isNew={this.props.new}
                    selected={this.state.selected}
                    handleNewEntry={this.props.handleNewEntry}
                />
                <SoundData
                    data={this.state.data}
                    isEditing={this.props.isEditing}
                    selected={this.state.selected}
                />
            </SoundEntryWrapper>
        );
    }
}

export default SoundEntry;