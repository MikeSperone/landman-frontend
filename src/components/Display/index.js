import React from 'react';
import FingeringDisplay from '../FingeringDisplay';
import Info from '../Info';

export default class Display extends React.Component {
    constructor(props) {
        super();
        this.data = props.data;
    }

    render() {
        return (
            <div> 
                <FingeringDisplay bin={this.data.bin} />
                <Info data={this.data} editType="none" />
            </div>
        );
    }
}
