import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.div.attrs({
    className: "pure-control-group"
})`
    padding: 1rem;
    display: block;
    clear: both;
`;
const Comment = ({className, children}) => <div className={className}>{children}</div>;
const CommentBox = styled(Comment)`
    background-color: ${props => (props.name % 2) ? 'white' : '#ccc'};
    border-bottom: solid 1px grey;
`;
const Label = styled.div`
    display: ${props =>
        props.name ? 'block' : 'none'
    };
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

function setLabel(name) {
    return (typeof name === "string")
        ?  name.charAt(0).toUpperCase() + name.slice(1) + ":"
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
    } else if (props.value) {
        let checked = props.checked ? props.checked.toString() : "false";
        let value = props.value || checked;
        return <Disp checked={checked} value={value} { ...props } />;
    } else {
        return null;
    }
};

const CommentField = props => {
    console.log("props.value: ", props.value);
    return (
        <FormWrapper>
            <h3>Comments</h3>
            {props.value.map((v, ind) => (
                <CommentBox
                    key={ind}
                    name={ind}
                >{v}</CommentBox>
            ))}
        </FormWrapper>
    );
};

export default Field;
export { CommentField };