import React from 'react';
import FingeringDisplay from '../../atoms/FingeringDisplay';
import Info from '../Info';

export default class Display extends React.Component {
    constructor(props) {
        super();
        this.bin = props.bin;
        this.data = props.data;
        this.editType = props.editType;
    }

    render() {
        return (
            <div> 
                <form className="pure-form pure-form-aligned" onSubmit={this.handleSearch.bind(this)} >
                    <FingeringDisplay editType={this.state.editType} bin={this.state.keyState} onClick={this.handleSearchClick.bind(this)}/>
                </form>
                <Info data={this.data} editType={this.editType} />
            </div>
        );
    }
}
