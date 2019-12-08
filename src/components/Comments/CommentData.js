import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Field from '../Field';
import Button from '../Button';
import APIcalls from '../../api';


const ButtonSection = styled.div`
    float: right;
    margin: 2rem;
`;

const Form = styled.form.attrs({
    className: "pure-form pure-form-aligned"
})`
    float: left;
`;

class CommentData extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = this.props.data;

        this.getUpdates = this.getUpdates.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getUpdates() {
        return {
            // The following data is required, and can not change
            id: this.props.data.id,
            sound_id: this.props.data.sound_id,
            // This is required even if it has not changed
            comment: this.state.comment,
            // TODO: update backend to allow this, similar to how sound entry did it
            // user_id: this.state.author.id,
            user_id: this.state.user_id,
        }
    }

    handleEdit(name, value, checked) {
        this.setState(prevState => { prevState[name] = value || checked; });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState(
            () => ({name: this.props.name}),
            () => {
                console.info('CommentData state: ', this.state)
                if (this.props.isNew) {
                    APIcalls.sounds.create(this.state)
                        .then(this.props.handleUpdate);
                } else {
                    const updatedData = this.getUpdates();

                    APIcalls.sounds.update(updatedData)
                        .then(this.props.handleUpdate);
                }
            }
        );
    }

    render() {
        var submitButtonClass = 'pure-button submit ';
        submitButtonClass += this.props.isEditing ? '' : 'hidden ';
        submitButtonClass += this.props.audioLoaded ? '' : 'pure-button-disabled ';

        return (
            <div id="commentDataSection">
                <Form onSubmit={this.handleSubmit}>
                    <Field
                        name="comment"
                        type="text"
                        value={decodeURIComponent(this.state.comment|| '')}
                        editing={this.props.isEditing}
                        handleEdit={this.handleEdit}
                    />
                    <Field
                        name="author"
                        type="text"
                        value={decodeURIComponent(/*this.state.author.username // TODO: update adonis backend to allow this*/this.state.user_id || 'unknown')}
                        editing={false}
                        handleEdit={this.handleEdit}
                    />
                    <input
                        className={submitButtonClass}
                        type="submit"
                        value="Submit"
                    />
                    <ButtonSection>
                        <Button
                            className={(this.props.isEditing || !this.props.permissions.update) ? "edit hidden" : "edit"}
                            onClick={this.props.handleEdit}
                            text={this.props.isNew ? "Add" : "Edit"}
                        />
                        <Button
                            className={(this.props.isEditing) ? "cancel" : "cancel hidden"}
                            onClick={this.props.handleCancel}
                            text="Cancel"
                        />
                        <Button
                            className={(this.props.isEditing && this.props.permissions.delete) ? "delete" : "delete hidden"}
                            onClick={this.props.handleConfirmDelete}
                            text="Delete"
                        />
                    </ButtonSection>
                </Form>
            </div>
        );
    }

}
CommentData.propTypes = {
    isEditing: PropTypes.bool,
    new: PropTypes.bool,
    audioLoaded: PropTypes.number,
    data: PropTypes.object,
    handleEdit: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleCancel: PropTypes.func,
    handleConfirmDelete: PropTypes.func,
    commentData: PropTypes.object
};
export default CommentData;

