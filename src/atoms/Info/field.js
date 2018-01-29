import React from 'react';

const Form = d => (
    <div className="pure-control-group">
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
    </div>
);

const Disp = props => (
    <div className="dataItem">
        <div className="label">
            {props.name.charAt(0).toUpperCase() + props.name.slice(1) + ":"}
        </div>
        <div id={props.name} className="value">{props.value}</div>
    </div>
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
