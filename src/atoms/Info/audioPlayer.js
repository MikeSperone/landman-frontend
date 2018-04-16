import React from 'react';

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.audio = props.audio;
        this.audioSrc = "http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg";
    }

    render() {
        const classNames = 'audio-player audio-' + (this.props.selected ? 'selected' : 'unselected');
        return (
            <div className={classNames}>
                <span className="audio-name">{this.props.name}</span>
                <audio controls="controls">
                    <source src={this.audioSrc} />
                    Your browser does not support the <code>audio</code> element.
                </audio>
            </div>
        );
    }
}

export default AudioPlayer;
