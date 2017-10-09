import React from 'react';
import './index.css';


export default class EditInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pitches: '',
            multi: false,
            audio: '',
            other: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const val = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: val});
    }

    handleSubmit(e) {
        console.log("Submitted");
        e.preventDefault();
    }

    formField(d) {
        return (
            <div className="pure-control-group">
                <label htmlFor={d.name}>
                    {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
                </label>
                <input 
                    id={d.name}
                    name={d.name}
                    type={d.type}
                    value={d.value}
                    checked={d.checked}
                    onChange={this.handleChange}
                />
            </div>

        );
    }

    render() {
        return (
            <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit} >
                {this.formField({name:"pitches", type:"text", value:this.state.pitches})}
                {this.formField({name:"multi", type: "checkbox", checked: this.state.multi }) }
                {this.formField({ name: "audio", type: "text", value: this.state.audio }) }
                {this.formField({ name: "other", type: "text", value: this.state.other }) }
                <div className="pure-controls">
                    <input type="submit" className="pure-button pure-button-primary" value="Submit" />
                </div>
            </form>
        );
    }
}
