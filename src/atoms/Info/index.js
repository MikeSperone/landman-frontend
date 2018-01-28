import React from 'react';
import './index.css';
import Field from './field';
import { API } from '../../constants';

class SoundEntry extends React.Components {
    constructor(props) {
        super(props);
        this.state = {data: null};
    }

    componentWillMount() {
        const url = API.soundData;
        $.getJSON(url + props.sound, (d) => this.setState({data:d}));
    }

    render() {
        <div>
            <div>{props.sound}</div>
        </div>
    }
};

const listSoundsData = (data) => {
    if (data.sounds) {
        return (
            data.sounds.map((d) => {
                console.log("d: ", d);
                return <SoundEntry sound={d} key={d} />;
            })
        );
    }
};

const Info = (props) => (
    <div> { listSoundsData(props.data) } </div>
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
