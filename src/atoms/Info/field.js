import React from 'react';

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const d = this.props;
        if (this.props.editing) {
            return (
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
        } else {
            let checked = d.checked ? d.checked.toString() : "false";
            let value = d.value || checked;
            return (
                <div className="dataItem">
                    <div className="label">
                        {d.name.charAt(0).toUpperCase() + d.name.slice(1) + ":"}
                    </div>
                    <div id={d.name} className="value">{value}</div>
                </div>
            );
        }
    }
}

