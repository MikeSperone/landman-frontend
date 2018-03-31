import React from 'react';
import Field from './field';

export default class SoundData extends React.Component {
    constructor(props) {
        super(props);
        this.props = { ...props };
        this.data = this.props.data;
    }

    render() {
        return (
            (this.props.selected) ? (
            <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit} >
                <Field
                    name="pitches"
                    type="text"
                    value={this.props.data.pitch || 'n/a'}
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
                    name="comments"
                    type="text"
                    value={this.props.data.comments || ['no comments']}
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
            ) : null
        );
    }
}

