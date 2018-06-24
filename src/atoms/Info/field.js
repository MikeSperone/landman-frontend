import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div.attrs({
    className: "pure-control-group"
})`
    padding: 1rem;
    display: block;
    clear: both;
`;
const Label = styled.div`
    float: left;
    margin: 1rem 0.5rem;
    width: 60px;
`;
const Value = styled.div`
    float: left;
    margin: 1rem 0.5rem;
`;

const Form = d => (
    <FormWrapper>
        <label htmlFor={d.name}>
            {d.name.charAt(0).toUpperCase() + d.name.slice(1)}
        </label>
        <input
            id={d.name}
            name={d.name}
            type={d.type}
            value={d.value}
            checked={d.checked}
            onChange={d.onChange}
        />
    </FormWrapper>
);

const Disp = props => (
    <FormWrapper>
        <Label>
            {props.name.charAt(0).toUpperCase() + props.name.slice(1) + ":"}
        </Label>
        <Value id={props.name}>{props.value}</Value>
    </FormWrapper>
);

const Field = props => {
    if (props.editing) {
        return <Form { ...props }/>;
    } else if (props.value) {
        let checked = props.checked ? props.checked.toString() : "false";
        let value = props.value || checked;
        return <Disp checked={checked} value={value} { ...props } />;
    } else {
        return null;
    }
}

export default Field;
