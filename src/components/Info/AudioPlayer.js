import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Audio = styled.audio`
    vertical-align: middle;
    width: calc(100% - 4rem);
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
        this.audioSrc = process.env.BASE_URL + '/audio/' + this.props.src;
        this.mimeType = this.getMimeTypeFromFilename();
    }

    getMimeTypeFromFilename() {
        const matchDot = this.props.src.match(/(?:\.([^.]+))?$/);
        if (!matchDot) return 'mpeg3';

        const extension = matchDot[1];
        switch (extension) {
            case 'aif':
            case 'aifc':
            case 'aiff':
                return 'x-aiff';
            case 'au':
            case 'snd':
                return "basic";
            case 'mp4':
                return 'mp4';
            case 'ogg':
                return 'ogg';
            case 'wav':
                return 'wav';
            case 'mpa':
            case 'mpg':
            case 'mp2':
            case 'mp3':
            default:
                return 'mpeg';
        }

    }

    render() {
        const bgColor = this.props.selected ? 'LightSteelBlue' : 'LightGrey';
        const { name, handleClick, isNew } = this.props;
        return (
            <AudioPlayerWrapper style={{backgroundColor: bgColor}}>
                <AudioName onClick={handleClick} >{name}</AudioName>
                {
                    isNew ? (
                        <Audio></Audio>
                    ) : (
                        <Audio controls="controls">
                            <source src={this.audioSrc} type={"audio/" + this.mimeType} />
                            Your browser does not support the <code>audio</code> element.
                        </Audio>
                    )
                }
            </AudioPlayerWrapper>
        );
    }
}

AudioPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    handleNewEntry: PropTypes.func,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    isNew: PropTypes.bool,
};

export default AudioPlayer;
