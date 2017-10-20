import React from 'react';
import $ from 'jquery';

import { API } from '../../constants';
import Button from '../../atoms/Button';
import Display from '../../components/Display';

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
        const url = API + this.state.keyState;
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
                <Display
                    onFingerClick={this.handleSearch.bind(this)}/>
                <div id="not-found"></div>
                <Button id="edit-btn" onClick={this.handleSearch.bind(this)} text="Edit" />
            </div>
        );
    }
}

