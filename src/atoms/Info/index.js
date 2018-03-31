import React from 'react';
import './index.css';
import $ from 'jquery';
import { API } from '../../constants';
import SoundData from './soundData';

const AudioPlayer = () => (
    <h3>AudioPlayer</h3>
);

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
        console.log("clicked");
        this.setState((prevState) => ({selected: !prevState.selected}));
    }

    render() {
        console.log("rendering: ", this.state.data);
        console.log("selected State: ", this.state.selected);
        return (
            <div onClick={this.handleClick.bind(this)}>
                <AudioPlayer name={this.sound}/>
                <div>{this.sound}</div>
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
        <div> { props.data.sounds ? listSoundsData(props.data.sounds) : null } </div>
);

export default Info;
