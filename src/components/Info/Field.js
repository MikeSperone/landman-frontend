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
    display: ${props =>
        props.name ? 'block' : 'none'
    };
    float: left;
    margin: 1rem 0.5rem;
    width: 75px;
`;
const Value = styled.div`
    float: left;
    margin: 1rem 0.5rem;
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
    } else if (props.value || props.checked) {
        let checked = props.checked ? props.checked.toString() : "false";
        let value = props.value || checked;
        return <Disp value={value} { ...props } />;
    } else {
        return null;
    }
};

const CommentField = props => {
    console.log("props.value: ", props.value);
    return (null);
};

/*
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
*/

export default Field;
export { CommentField };
