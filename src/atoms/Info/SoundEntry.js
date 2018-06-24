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
        this.state = {data: {}, selected: false};
        this.sound = props.sound;
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
            <SoundEntryWrapper onClick={this.handleClick.bind(this)}>
                <AudioPlayer
                    audio={this.state.data.soundID}
                    name={this.sound}
                    selected={this.state.selected}
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