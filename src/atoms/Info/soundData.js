import React from 'react';
import styled from 'styled-components';
import Field, { CommentField } from './field';

const Form = styled.form.attrs({
    className: "pure-form pure-form-aligned"
})`
    float: left;
`;

export default class SoundData extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }

    render() {
        return (
            (this.props.selected) ? (
            <Form onSubmit={this.handleSubmit} >
                <Field
                    name="pitches"
                    type="text"
                    value={this.props.data.pitch || 'n/a'}
                    onChange={this.props.onChange}
                    editing={this.props.isEditing}
                />
                <Field
                    name="multi"
                    type="checkbox"
                    checked={this.props.data.multi}
                    onChange={this.props.onChange} 
                    editing={this.props.isEditing}
                />
                <CommentField
                    name="comments"
                    type="text"
                    value={this.props.data.comments || ['no comments']}
                    onChange={this.props.onChange} 
                    editing={this.props.isEditing}
                />
                <Field
                    name="other"
                    type="text"
                    value={this.props.data.other}
                    onChange={this.props.onChange}
                    editing={this.props.isEditing}
                />
            </Form>
            ) : null
        );
    }
}