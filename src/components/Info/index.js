import React from 'react';
import './index.css';

export default class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.d = this.props.data;
    }

    _multiphonic(m) {
        if (m) return <div>multiphonic</div>;
    }
    _other(o) {
        if (o) return <div>{o.toString()}</div>
    }

    render() {
        return (
            <div>
                <div className="info">
                    <div><b>pitches:</b> {this.d.pitches.toString()}</div>
                    {this._multiphonic(this.d.multi)}
                    {this._other(this.d.other)}
                </div>
                <div className="buttons">
                    <button className="pure-button pure-button-primary">Edit</button>
                    <button className="pure-button button-delete">Delete</button>
                </div>
            </div>
        );
    }
}
