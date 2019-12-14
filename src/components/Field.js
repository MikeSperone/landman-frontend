import React from 'react';
import styled from 'styled-components';
import colors from '../colors';

const FormWrapper = styled.div`
    display: flex;
    clear: both;
    overflow: auto;
    margin: 0;
    border-bottom: 1px solid grey;
`;

const Label = styled.div`
    display: ${props =>
        props.name ? 'block' : 'none'
    };
    float: left;
    padding: 0.5rem;
    width: 80px;
    border-right: 1px solid ${colors.blue_1};
`;
const Value = styled.div`
    flex-grow: 1;
    padding: 0.5rem;
    float: left;
`;

class Form extends React.Component {

    handleChange(e) {
        this.props.handleEdit(this.props.name, e.target.value, e.target.checked);
    }

    render () {
        return (
            <FormWrapper>
                <label htmlFor={this.props.name}>
                    {this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}
                </label>
                <input
                    id={this.props.name}
                    name={this.props.name}
                    type={this.props.type}
                    value={this.props.value}
                    checked={this.props.checked}
                    onChange={this.handleChange.bind(this)}
                />
            </FormWrapper>
        );
    }
}

function setLabel(name) {
    return (typeof name === "string")
        ?  name.charAt(0).toUpperCase() + name.slice(1)
        : '';
}

const Disp = props => {
    const name = setLabel(props.name);
    return (
        <FormWrapper>
            <Label name={name}>
                {name}
            </Label>
            <Value id={props.name}>{props.value}</Value>
        </FormWrapper>
    );
};

const Field = props => {
    if (props.editing) {
        return <Form { ...props }/>;
    } else if (props.value || props.checked) {
        let checked = props.checked ? props.checked.toString() : "false";
        let value = props.value || checked;
        return <Disp value={value} { ...props } />;
    } else {
        return null;
    }
};

export default Field;
