import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Field from '../Field';
import Button from '../Button';
import APIcalls from '../../api';


const SoundDataSection = styled.div`
   overflow: auto; 
`;

const ButtonSection = styled.div`
    float: right;
`;

const Form = styled.form.attrs({
    className: "pure-form pure-form-aligned"
})`
    width: 100%;
    float: left;
`;

class SoundData extends React.Component {

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
            fingering_id: this.props.data.fingering_id,
            // This is required even if it has not changed
            name: this.state.name,
            pitches: this.state.pitches,
            multiphonic: this.state.multiphonic,
            kientzy_id: this.state.kientzy_id,
            description: this.state.description,
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
                console.info('SoundData state: ', this.state)
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
        console.info('data: ', this.props.data);

        return (
            <SoundDataSection>
                <Form onSubmit={this.handleSubmit}>
                    <Field
                        name="pitches"
                        type="text"
                        value={decodeURIComponent(this.state.pitches || '')}
                        editing={this.props.isEditing}
                        handleEdit={this.handleEdit}
                    />
                    <Field
                        name="multiphonic"
                        type="checkbox"
                        checked={Boolean(this.state.multiphonic)}
                        editing={this.props.isEditing}
                        handleEdit={this.handleEdit}
                    />
                    <Field
                        name="description"
                        type="text"
                        value={decodeURIComponent(this.state.description || '')}
                        editing={this.props.isEditing}
                        handleEdit={this.handleEdit}
                    />
                    <Field
                        name="author"
                        type="text"
                        value={decodeURIComponent((this.state.author && this.state.author.username) || 'unknown')}
                        editing={false}
                        handleEdit={this.handleEdit}
                    />
                    <input
                        className={submitButtonClass}
                        type="submit"
                        value="Submit"
                    />
                </Form>
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
                        onClick={() => this.props.handleConfirmDelete(this.props.data.id)}
                        text="Delete"
                    />
                </ButtonSection>
            </SoundDataSection>
        );
    }

}
SoundData.propTypes = {
    isEditing: PropTypes.bool,
    new: PropTypes.bool,
    audioLoaded: PropTypes.number,
    data: PropTypes.object,
    handleEdit: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleCancel: PropTypes.func,
    handleConfirmDelete: PropTypes.func,
    soundData: PropTypes.object
};
export default SoundData;
