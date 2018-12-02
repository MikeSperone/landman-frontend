import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { API_URL } from '../../APIcalls';

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
    cursor: pointer;
`;

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.audioSrc = 'audio/' + this.props.src;
    }

    render() {
        const bgColor = this.props.selected ? 'LightSteelBlue' : 'LightGrey';
        const { name, handleClick, isNew } = this.props;
        return (
            <AudioPlayerWrapper onClick={handleClick} style={{backgroundColor: bgColor}}>
                <AudioName>{name}</AudioName>
                {
                    isNew ? (
                        <Audio></Audio>
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

AudioPlayer.propTypes = {
    handleClick: PropTypes.func,
    handleNewEntry: PropTypes.func,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    isNew: PropTypes.bool,
};

export default AudioPlayer;
