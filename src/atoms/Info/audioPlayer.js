import React from 'react';
import styled from 'styled-components';

const Audio = styled.audio`
    vertical-align: middle;
`;

const AudioPlayerWrapper = styled.div`
    padding: 1rem;
`;

const AudioName = styled.span`
    background-color: SteelBlue;
    padding: 0.5rem 1rem;
`;

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.audio = props.audio;
        this.audioSrc = "http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg";
    }

    render() {
        const bgColor = this.props.selected ? 'LightSteelBlue' : 'LightGrey';
        return (
            <AudioPlayerWrapper style={{backgroundColor: bgColor}}>
                <AudioName>{this.props.name}</AudioName>
                <Audio controls="controls">
                    <source src={this.audioSrc} />
                    Your browser does not support the <code>audio</code> element.
                </Audio>
            </AudioPlayerWrapper>
        );
    }
}

export default AudioPlayer;
