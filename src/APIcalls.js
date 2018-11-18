import $ from 'jquery';

//const API_URL = "https://api.mikesperone.com/landman/v1/alto/";
const API_URL = "http://159.203.187.114/landman/v1/alto/";
const APIcalls = {
    errIntro: "Error: Invalid Data - ",
    readyStateChange: (req, successCallback, failureCallback) => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                successCallback();
            } else {
                failureCallback();
            }
        }
    },

    search: (bin, successCallback, failCallback=()=>{}) => {
        $.getJSON(
            API_URL + bin,
            d => successCallback(d)
        ).fail(e => {
            console.log("server error");
            console.log("e: ", e);
            failCallback();
        });
    },

    addNewData: data => {
        const params = this._verifyData(data);
        if (params === false) return;

        APIcalls.addNewData(params);
        let req = new XMLHttpRequest();
        let url = API_URL;
    
        req.open("POST", url, true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = this.readyStateChange(
            req,
            () => {
                alert("Success, new data added");
                window.location.reload();
            },
            () => alert("Server error: " + req.status)
        );
        console.log("Data added: ", params);
        req.send(params);
    
    },

    updateData: function(data, successCallback) {
        console.log("data", data);
        let req = new XMLHttpRequest();
        let url = API_URL + data.bin + '/' + data.soundID;
        let params = this._verifySoundData(data);
        req.open("PUT", url, true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = this.readyStateChange(
            req,
            () => {
                alert("Success, data edited");
                successCallback();
                this.setState(() => (
                    {buttonText: "Edit", isEditing: false, editType: "view"}
                ));
            }, () => {
                    alert("Error - data not updated.  Server status: " + req.status);
            }
        );
        console.log("data editied: ", params);
        req.send(JSON.stringify(params));
    },

    deleteEntry: data => {
        alert('TODO: make this delete work');
        let req = new XMLHttpRequest();
        let url = API_URL + data.bin;
        let params = this._verifyData(data);
        req.open("DELETE", url, true);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = this.onReadyStateChange(
            () => alert('DELETED! (maybe not yet - until this works)'),
            () => alert('NOT deleted')
        );
        req.send(params);
    },

    _verifySoundData: function(data) {
        console.log("data: ", data);
        let finalData = {};
        if (this._validateBin(data.bin)) {
            finalData["bin"] = data.bin;
        } else {
            return;
        }
        if (data.name) {
            finalData['name'] = data.name;
        } else {
            return alert("Error: missing required value 'name'");
        }
        finalData['multi'] = Boolean(data.multi);
        if (data.pitch) {
            finalData['pitch'] = data.pitch;
        }
        if (data.description) {
            finalData['description'] = data.description;
        }
        return finalData;
    },

    _validateBin: function(bin) {
        if (bin.length !== 23) {
            alert(this.errIntro + "incorrect data length")
            return false;
        }
        if (typeof bin !== "string") {
            alert(this.errIntro + "invalid type " + typeof bin + " should be of type string");
            return false;
        }
        return bin;
    },
    _verifyData: function(data) {
        console.log("data: ", data);
        let finalData = {};
        if (this._validateBin(data.bin)) {
            finalData["bin"] = data.bin;
        } else {
            return;
        }
        if (data.sounds) {
            finalData["sounds"] = [];
            data.sounds.forEach(sound => {
                const newSound = {};
                if (sound.pitches && sound.pitches.length) {
                    newSound["pitch"] = sound.pitch.split(",");
                }
                newSound["multi"] = sound.multi;
                newSound["comments"] = sound.comments;
                finalData["sounds"].push(newSound);
            });
        }
        if (JSON.stringify(data.other) !== JSON.stringify({})) {
            finalData["other"] = data.other;
        }
        return JSON.stringify(finalData);
    }
};

export default APIcalls;
