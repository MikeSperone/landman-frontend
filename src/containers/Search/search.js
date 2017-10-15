import React from 'react';
import $ from 'jquery';

import FingeringDisplay from '../../components/FingeringDisplay';
import Info from '../../components/Info';

export default class Search extends React.Component {

    constructor(props) {
        super();
        this.state = {
            keyState: "00000000000000000000000",
            data: null,
            editType: "search"
        };
    }

    handleEditClick() {
        this.setState({editType: "edit"});
        $('#edit-btn').addClass("hidden");
        $('#submit-btn').removeClass("hidden");
    }

    handleSearchClick(i) {
        const keyState = this.state.keyState;
        const newState = (keyState[i] == 0) ? "1" : "0";
        const newKeyState = keyState.substr(0, i) + newState + keyState.substr(i + 1);
        this.setState({keyState: newKeyState});
        console.log(this.state.keyState);
    }

    handleSearch(e) {
        console.log("searching...");
        const url = "http://api.mikesperone.com/landman/v1/alto/" + this.state.keyState;
        var req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.send();
        if (req.status === 200) {
            var b = JSON.parse(req.responseText).bin;
            console.log("found!", b);
            $('#not-found').text("");
            $('#edit-btn').removeClass("hidden");
        } else {
            console.log("not found :(");
            $('#not-found').text("Not Found");
            $('#edit-btn').addClass("hidden");
        }
        //  
        //TODO: something when a result returns
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form className="pure-form pure-form-aligned" onSubmit={this.handleSearch.bind(this)} >
                    <FingeringDisplay editType={this.state.editType} bin={this.state.keyState} onClick={this.handleSearchClick.bind(this)}/>
                </form>
                <Info data={this.state.data} editType={this.state.editType} />
                <div id="not-found"></div>
                <button id="edit-btn" className="pure-button button-primary" onClick={this.handleEdit.bind(this)}>Edit</button>
            </div>
        );
    }
}

