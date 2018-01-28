import React from 'react';
import './index.css';
import Field from './field';
import $ from 'jquery';
import { API } from '../../constants';

class SoundEntry extends React.Component {
    constructor(props) {
        super(props);
        console.log("hi");
        this.state = {data: {}};
        this.sound = props.sound;
    }

    componentWillMount() {
        const url = API.soundData;
        $.getJSON(url + this.sound, (d) => this.setState({data:d}));
    }

    render() {
        //TODO: get this database API working
        console.log("rendering: ", this.sound.data);
        return <div>{this.sound}</div>;
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
// class OldInfo extends React.Component {
//     constructor(props) {
//         super(props);
//         this.props = props;
//         this.data = this.props.data;
//     }

//     render() {
//         return (
//             <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit} >
//                 <Field
//                     name="audio"
//                     type="text"
//                     value={this.props.data.soundID}
//                     onChange={this.props.onChange}
//                     editing={this.props.editing}
//                 />
//                 <Field
//                     name="multi"
//                     type="checkbox"
//                     checked={this.props.data.multi}
//                     onChange={this.props.onChange} 
//                     editing={this.props.editing}
//                 />
//                 <Field
//                     name="comments"
//                     type="text"
//                     value={this.props.data.audio}
//                     onChange={this.props.onChange} 
//                     editing={this.props.editing}
//                 />
//                 <Field
//                     name="other"
//                     type="text"
//                     value={this.props.data.other}
//                     onChange={this.props.onChange}
//                     editing={this.props.editing}
//                 />
//             </form>
//         );
//     }
// }
