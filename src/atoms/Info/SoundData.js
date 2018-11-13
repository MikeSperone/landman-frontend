import React from 'react';
import styled from 'styled-components';
import Field, { CommentField } from './field';

const Form = styled.form.attrs({
    className: "pure-form pure-form-aligned"
})`
    float: left;
`;

const SoundData = props => {

    const { data } = props;
    return (
        (props.selected) ? (
            <Form onSubmit={this.handleSubmit} >
                <Field
                    name="pitches"
                    type="text"
                    value={data.pitch || 'n/a'}
                    onChange={props.onChange}
                    editing={props.isEditing}
                />
                <Field
                    name="multi"
                    type="checkbox"
                    checked={Boolean(data.multi)}
                    onChange={props.onChange} 
                    editing={props.isEditing}
                />
                <CommentField
                    name="comments"
                    type="text"
                    value={data.comments || ['no comments']}
                    onChange={props.onChange} 
                editing={props.isEditing}
                />
                <Field
                    name="other"
                    type="text"
                    value={props.data.other}
                    onChange={props.onChange}
                    editing={props.isEditing}
                />
            </Form>
        ) : null
    );
};

export default SoundData;