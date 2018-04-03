import React from 'react';
import $ from 'jquery';

import { API } from '../../constants';
import Button from '../../atoms/Button';
import Display from '../../components/Display';
import Edit from '../../components/Edit';

export default class Search extends React.Component {

    constructor(props) {
        super();
        this.state = {
            data: '00000000000000000000000',
            editType: 'search',
            keyState: '00000000000000000000000',
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
        this.setState({keyState: newKeyState}, i => this.handleSearch(i));
    }

    handleSearch(i) {
        const url = API.fingerings + this.state.keyState;
        console.log('url: ', url);
        $('#searching').removeClass('hidden');
        var req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.send();
        if (req.status === 200) {
            console.log('response: ', req.responseText);
            var b = JSON.parse(req.responseText).bin;
            $('#not-found').text('');
            $('#edit-btn').removeClass('hidden');
            this.setState({data:this.state.keyState});
        } else {
            $('#not-found').text('Not Found');
            $('#edit-btn').addClass('hidden');
        }
        //  
        $('#searching').addClass('hidden');
        //TODO: something when a result returns
        console.log('i: ', i);
        // e.preventDefault();
    }

    render() {
        return (
            <div>
                <Edit
                    data={{bin: "00000000000000000000000"}}
                    editType='search'
                />
                <Display
                    bin={this.state.keyState}
                    data={this.state.data}
                    editType={'search'}
                    onEditDataChange={() => alert('this does nothing')}
                    onFingerClick={this.handleSearchClick.bind(this)}
                />
                <div id="not-found"></div>
                <Button id="edit-btn" onClick={this.handleSearch.bind(this)} text="Edit" />
            </div>
        );
    }
}

