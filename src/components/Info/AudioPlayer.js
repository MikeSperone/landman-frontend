import React from 'react';
import Field from './Field';
import APIcalls from '../../APIcalls';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class AddNewAudio extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            entryName: ''
        }
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
    }

    handleEdit(name, value, checked) {
        this.setState(prevState => { prevState[name] = value || checked; });
    }

    handleSelectedFile(audioFile) {
        APIcalls.uploadAudio(audioFile, this.state.entryName, this.props.bin);
    }

    render() {
        return (
            <div className={ "upload" }>
                <Field
                    name="entryName"
                    type="text"
                    value={decodeURIComponent(this.state.entryName || '')}
                    editing={true}
                    handleEdit={this.handleEdit}
                />
                <input
                    type="file"
                    accept="audio/*"
                    name=""
                    id=""
                    onChange={
                        e => this.handleSelectedFile(e.target.files[0])
                    }
                />
                <div> {this.state.loaded ? Math.round(this.state.loaded,2) : 100 } %</div>
            </div>
        );
    }
}

AddNewAudio.propTypes = {
    handleSelectedFile: PropTypes.func.isRequired,
    bin: PropTypes.string.isRequired,
    entryName: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    handleEdit: PropTypes.func.isRequired,
    loaded: PropTypes.bool
};

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
        this.audioSrc = process.env.REACT_APP_BASE_URL + '/audio/' + this.props.src;
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
        return (
            <AudioPlayerWrapper style={{backgroundColor: bgColor}}>
                <AudioName onClick={this.props.handleClick} >{this.props.name}</AudioName>
                {
                    this.props.isEditing ?
                        this.props.isNew ? (
                            <AddNewAudio
                                bin={this.props.bin}
                                loaded={false}
                            />
                        ) : (
                            <Audio controls="controls">
                                <source src={this.audioSrc} type={"audio/" + this.mimeType} />
                                Your browser does not support the <code>audio</code> element.
                            </Audio>
                        )
                    : <audio></audio>
                }
            </AudioPlayerWrapper>
        );
    }
}

AudioPlayer.propTypes = {
    bin: PropTypes.string.isRequired,
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
