import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Field from './Field';
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
        console.info('SoundData state: ', this.state);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEdit(name, value, checked) {
        this.setState(prevState => { prevState[name] = value || checked; });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.isNew) {
            APIcalls.createData(this.state);
        } else {
            APIcalls.updateData(this.state).then(d => {
                d.response && d.response.updated && this.props.handleUpdate();
            });
        }
    }

    render() {
        return (
            <div id="soundDataSection">
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
                        value={decodeURIComponent(this.state.author || 'unknown')}
                        editing={false}
                        handleEdit={this.handleEdit}
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
                            text={this.props.isNew ? "Add" : "Edit"}
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
