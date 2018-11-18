import React from 'react';
import styled from 'styled-components';
import Field, { CommentField } from './field';
import Button from '../Button';
import APIcalls from '../../APIcalls';

const ButtonSection = styled.div`
    float: right;
    margin: 2rem;
`;

const Form = styled.form.attrs({
    className: "pure-form pure-form-aligned"
})`
    float: left;
`;

class SoundData extends React.Component {

    constructor(props) {
        super(props);
        const { data } = this.props;
        this.state = data;
    }
    
    handleEdit(name, value, checked) {
        this.setState(prevState => { prevState[name] = value || checked; });
    }
    
    render() {
        const { data } = this.props;
        return (
            <div id="soundDataSection">
                <Form onSubmit={e => { e.preventDefault(); APIcalls.updateData(this.state); }} >
                    <Field
                        name="pitch"
                        type="text"
                        value={this.state.pitch || 'n/a'}
                        editing={this.props.isEditing}
                        handleEdit={this.handleEdit.bind(this)}
                    />
                    <Field
                        name="multi"
                        type="checkbox"
                        checked={Boolean(this.state.multi)}
                        editing={this.props.isEditing}
                        handleEdit={this.handleEdit.bind(this)}
                    />
                    <Field
                        name="description"
                        type="text"
                        value={this.state.description || 'n/a'}
                        editing={this.props.isEditing}
                        handleEdit={this.handleEdit.bind(this)}
                    />
                    <CommentField
                        name="comments"
                        type="text"
                        value={data.comments || ['no comments']}
                        editing={this.props.isEditing}
                    />
                    <input
                        className={(this.props.isEditing) ? "submit" : "submit hidden"}
                        type="submit"
                        value="Submit"
                    />
                        <ButtonSection>
                            <Button
                                className={(this.props.isEditing) ? "edit hidden" : "edit"}
                                onClick={this.props.handleEdit}
                                text={"Edit"}
                            />
                            <Button
                                className={(this.props.isEditing) ? "cancel" : "cancel hidden"}
                                onClick={this.props.handleCancel}
                                text="Cancel"
                            />
                            <Button
                                className={(this.props.isEditing) ? "delete" : "delete hidden"}
                                onClick={this.props.handleConfirmDelete}
                                text="Delete"
                            />
                        </ButtonSection>
                    </Form>
                </div>
            );
    }
    
}
export default SoundData;                            