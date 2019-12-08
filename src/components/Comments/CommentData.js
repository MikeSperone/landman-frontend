import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Field from '../Field';
import Button from '../Button';
import APIcalls from '../../api';
import { Actions, user } from '../../api';


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

        this.author = {
            id: this.props.user_id
        };
        this.bindFunctions();
    }

    bindFunctions() {
        this.getUpdates = this.getUpdates.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditMode = this.handleEditMode.bind(this);
        this.editingComplete = this.editingComplete.bind(this);
    }

    getUpdates() {
        return {
            id: this.props.data.id,
            comment: this.state.comment
        }
    }

    editingComplete() {
        this.setState(() => ({ buttonText: "Edit", isEditing: false }));
    }

    handleEditMode(e) {
        e.preventDefault();
        const hasAccess = user.hasAccess(Actions.UPDATE, this.author.id);
        if (hasAccess.access) {
            this.setState(() => ({ buttonText: "Edit", isEditing: true }));
        } else {
            alert(hasAccess.message);
        }
    }
    handleEdit(name, value, checked) {
        this.setState(prevState => { prevState[name] = value || checked; });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState(
            () => {
                if (this.props.isNew) {
                    APIcalls.comments
                        .create(this.state)
                        .then(this.editingComplete);
                } else {
                    const updatedData = this.getUpdates();

                    APIcalls.comments
                        .update(updatedData)
                        .then(this.editingComplete);
                }
            }
        );
    }

    render() {

        return (
            <div id="commentDataSection">
                <Form onSubmit={this.handleSubmit}>
                    <Field
                        name="comment"
                        type="text"
                        value={decodeURIComponent(this.state.comment|| '')}
                        editing={this.state.isEditing}
                        handleEdit={this.handleEdit}
                    />
                    <Field
                        name="author"
                        type="text"
                        value={decodeURIComponent(this.author.id || 'unknown')}
                        editing={false}
                        handleEdit={this.handleEdit}
                    />
                    <input
                        className={'pure-button submit ' + (this.state.isEditing ? '' : 'hidden ')}
                        type="submit"
                        value="Submit"
                    />
                </Form>
                <ButtonSection>
                    <Button
                        className={(this.state.isEditing || !this.props.permissions.update) ? "edit hidden" : "edit"}
                        onClick={this.handleEditMode}
                        text={this.props.isNew ? "Add" : "Edit"}
                    />
                    <Button
                        className={(this.state.isEditing) ? "cancel" : "cancel hidden"}
                        onClick={this.editingComplete}
                        text="Cancel"
                    />
                    <Button
                        className={(this.state.isEditing && this.props.permissions.delete) ? "delete" : "delete hidden"}
                        onClick={this.handleConfirmDelete}
                        text="Delete"
                    />
                </ButtonSection>
            </div>
        );
    }

}
CommentData.propTypes = {
    // isEditing: PropTypes.bool,
    new: PropTypes.bool,
    audioLoaded: PropTypes.number,
    data: PropTypes.object,
    handleConfirmDelete: PropTypes.func,
    commentData: PropTypes.object
};
export default CommentData;
