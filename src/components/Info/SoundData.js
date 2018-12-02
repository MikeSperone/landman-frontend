import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Field from './Field';
import Button from '../Button';
import APIcalls from '../../APIcalls';

const AddNewAudio = props => (
    <div className={ "upload" }>
        <input type="file" accept="audio/*" name="" id="" onChange={e => props.handleSelectedFile(e.target.files[0]) } />
        <div> {props.loaded ? Math.round(props.loaded,2) : 100 } %</div>
    </div>
);

AddNewAudio.propTypes = {
    handleSelectedFile: PropTypes.func.isRequired,
    loaded: PropTypes.bool
};

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

    handleSelectedFile(file) {
        this.setState(() => ({audio: file}));
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
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    {this.props.isNew && this.props.isEditing ? (
                        <AddNewAudio
                            handleSelectedFile={this.handleSelectedFile.bind(this)}
                            { ...this.props }
                        />
                    ) : null
                    }
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
