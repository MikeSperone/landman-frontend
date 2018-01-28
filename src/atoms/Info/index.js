import React from 'react';
import './index.css';

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const d = this.props;
        if (this.props.editing) {
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
            let checked = d.checked ? d.checked.toString() : "false";
            let value = d.value || checked;
            return (
                <div className="dataItem">
                    <div className="label">
                        {d.name.charAt(0).toUpperCase() + d.name.slice(1) + ":"}
                    </div>
                    <div id={d.name} className="value">{value}</div>
                </div>
            );
        }
    }
}

export default class Info extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.data = this.props.data;
    }

    render() {
        return (
            <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit} >
                <Field
                    name="pitches"
                    type="text"
                    value={this.props.data.pitches}
                    onChange={this.props.onChange}
                    editing={this.props.editing}
                />
                <Field
                    name="multi"
                    type="checkbox"
                    checked={this.props.data.multi}
                    onChange={this.props.onChange} 
                    editing={this.props.editing}
                />
                <Field
                    name="audio"
                    type="text"
                    value={this.props.data.audio}
                    onChange={this.props.onChange} 
                    editing={this.props.editing}
                />
                <Field
                    name="other"
                    type="text"
                    value={this.props.data.other}
                    onChange={this.props.onChange}
                    editing={this.props.editing}
                />
            </form>
        );
    }
}
