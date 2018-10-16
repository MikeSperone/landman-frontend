import { API } from '../../constants';
import $ from 'jquery';

const APIcalls = {
    searchOrAdd: (bin, successCallback, failCallback=()=>{}) => {
        const url = API.fingerings + bin;
        console.log("url: ", url);
        $.getJSON(
            url,
            d => successCallback(d)
        ).fail(e => {
            console.log("no match");
            failCallback();
        });
    },

    addNewData: params => {
        let req = new XMLHttpRequest();
        let url = API.fingerings;
    
        req.open("POST", url, true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 201) {
                    alert("Success, new data added");
                    window.location.reload();
                } else {
                    alert("Server error: " + req.status);
                }
            }
        };
        console.log("Data added: ", params);
        req.send(params);
    
    },

    submitData: (data, successCallback) => {
        let req = new XMLHttpRequest();
        let url = API + data.bin;
        let params = this._verifyData(data);
        req.open("PUT", url, true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    alert("Success, data edited");
                    successCallback();
                    this.setState(() => (
                        {buttonText: "Edit", isEditing: false, editType: "view"}
                    ));
                } else {
                    alert("Error - data not updated.  Server status: " + req.status);
                }
            }
        };
        console.log("data editied: ", params);
        req.send(params);
    },

    _verifyData: data => {
        console.log("data: ", data);
        const invalid = "Error: Invalid Data - ";
        let finalData = {};
        if (data.bin.length !== 23) {
            alert(invalid + "incorrect data length");
            return false;
        }
        finalData["bin"] = data.bin;
        if (data.pitches && data.pitches.length) {
            finalData["pitches"] = data.pitches.split(",");
        }
        finalData["multi"] = data.multi;
        if (JSON.stringify(data.other) !== JSON.stringify({})) {
            finalData["other"] = data.other;
        }
        return JSON.stringify(finalData);
    }
};

export default APIcalls;