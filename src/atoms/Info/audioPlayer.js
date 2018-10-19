import React from 'react';
import styled from 'styled-components';

const AddNewAudio = () => <div><p>Add a way to upload audio here.</p></div>;

const Audio = styled.audio`
    vertical-align: middle;
    width: calc(100% - 1rem);
    margin: 0.5rem;
`;

const AudioPlayerWrapper = styled.div`
    padding: 0.5rem;
`;

const AudioName = styled.span`
    display: inline-block;
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
            <AudioPlayerWrapper onClick={this.props.handleClick} style={{backgroundColor: bgColor}}>
                <AudioName>{this.props.name}</AudioName>
                {
                    this.props.isNew ? (
                        <AddNewAudio />
                    ) : (
                        <Audio controls="controls">
                            <source src={this.audioSrc} />
                            Your browser does not support the <code>audio</code> element.
                        </Audio>
                    )
                }
            </AudioPlayerWrapper>
        );
    }
}

export default AudioPlayer;
