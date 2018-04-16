import React from 'react';
import './index.css';
import $ from 'jquery';
import { API } from '../../constants';
import SoundData from './soundData';
import AudioPlayer from './audioPlayer';

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
        this.setState((prevState) => ({selected: !prevState.selected}));
    }

    render() {
        console.log("rendering: ", this.state.data);
        return (
            <div onClick={this.handleClick.bind(this)}>
                <AudioPlayer
                    audio={this.state.data.soundID}
                    name={this.sound}
                    selected={this.state.selected}
                />
                <SoundData
                    selected={this.state.selected}
                    data={this.state.data}
                />
            </div>
        );
    }
}

function listSoundsData(sounds) {
    return (
        sounds.map((d) => {
            return (
                d ? (
                    <SoundEntry sound={d} key={d} />
                ) : null
            );
        })
    );
};

const Info = (props) => (
        <div className="info"> { props.data.sounds ? listSoundsData(props.data.sounds) : null } </div>
);

export default Info;
