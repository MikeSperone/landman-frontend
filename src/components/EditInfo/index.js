import React from 'react';
import './index.css';


export default class EditInfo extends React.Component {

    constructor(props) {
        super();
        this.props = props;
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
                    onChange={d.onChange}
                />
            </div>

        );
    }

    render() {
        return (
            <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit} >
                {this.formField({name:"pitches", type:"text", value:this.props.pitches, onChange:this.props.onChange}) }
                {this.formField({name:"multi", type: "checkbox", checked: this.props.multi,onChange:this.props.onChange }) }
                {this.formField({ name: "audio", type: "text", value: this.props.audio, onChange: this.props.onChange }) }
                {this.formField({ name: "other", type: "text", value: this.props.other, onChange: this.props.onChange }) }
            </form>
        );
    }
}
