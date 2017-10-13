import React from 'react';
import './index.css';

class Field extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.editing = this.props.editing;
    }

    render() {
        const d = this.props;
        if (this.editing) {
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
        } else {
            let value = d.value || d.checked;
            return (
                <div className=" ">
                    <div className="label">
                        {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
                    </div>
                    <div id={d.name}>{value}</div>
                </div>
            );
        }
    }
}

export default class Info extends React.Component {

    constructor(props) {
        super();
        this.props = props;
        this.editing = (this.props.editType !== "none");
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


    render() {
        let openDiv, closingDiv;
        if (this.editing) {
            openDiv = <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit} >;
            closingDiv = </form>;
        } else {
            openDiv = <div>;
            closingDiv = </div>;
        }
        return (
            <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit} >
                <Field name="pitches" type="text"     value={this.props.pitches} onChange={this.props.onChange} editing={this.editing} />
                <Field name="multi"   type="checkbox" checked={this.props.multi} onChange={this.props.onChange} editing={this.editing} />
                <Field name="audio"   type="text"     value={this.props.audio}   onChange={this.props.onChange} editing={this.editing} />
                <Field name="other"   type="text"     value={this.props.other}   onChange={this.props.onChange} editing={this.editing} />
            </form>
        );
    }
}
