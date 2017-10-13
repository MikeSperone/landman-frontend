import React from 'react';
import $ from 'jquery';

import FingeringDisplay from '../../components/FingeringDisplay';
import Info from '../../components/Info';

export default class Search extends React.Component {

    constructor(props) {
        super();
        this.state = {
            keyState: "00000000000000000000000",
            data: null
        };
    }

    handleClick(i) {
        const keyState = this.state.keyState;
        const newState = (keyState[i] == 0) ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        this.setState({keyState: newKeyState});
        console.log(this.state.keyState);
    }

    handleSubmit(e) {
        console.log("searching...");
        const url = "http://api.mikesperone.com/landman/v1/alto/" + this.state.keyState;
        $.getJSON(url, (d) => this.setState({data:d}));
        //TODO: something when a result returns
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit.bind(this)} >
                    <FingeringDisplay editing bin={this.state.keyState} onClick={this.handleClick.bind(this)}/>
                </form>
                <Info data={this.state.data} editType="none" />
            </div>
        );
    }
}

