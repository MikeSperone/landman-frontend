// const API_URL = "http://api.mikesperone.com/landman/v1/alto/";
const API_URL = "http://localhost:3000/v1/alto/";
function xhr(type, url, data) {
    console.log('xhr ' + type);
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open(type, url, true);
        if (type === "PUT") {
            req.setRequestHeader("Content-type", "application/json");
        }
        if (type !== "GET") {
            // authorization needed
            const token = '1';
            req.setRequestHeader("Authorization", "Bearer " + token);
        }
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    console.log('200');
                    return resolve(JSON.parse(req.responseText));
                } else if (req.status === 401) {
                    alert('you must be logged in to complete this action');
                } else {
                    console.log('unhandled response status', req.status);
                    return reject(req.status);
                }
            }
        };
        req.send(data);
    });
}

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

    search: bin => xhr("GET", API_URL + bin),

    createData: function(data) {
        const params = this._verifyCreateData(data);
        if (params === false) return;

        var formData = new FormData();
        formData.append('audio', data.audio, data.audio.name);
        Object.entries(params).forEach(([k, v]) => {
            console.log('appending ' + k, ": " + v)
            formData.append(k, v);
        });

        for(var kv of formData.entries()) {
            console.log(kv);
        }

        xhr("POST", API_URL + "upload/" + params.bin, formData)
            .then(() => {
                alert("Success, new data added");
                window.location.reload();
            })
            .catch(status => alert("Server error: " + status));

    },

    updateData: function(data) {
        let params = JSON.stringify(this._verifyUpdateData(data));
        return xhr("PUT", API_URL + data.bin + '/' + data.soundID, params);
    },

    deleteEntry: function(data) {
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

    _verifyCreateData: function(data) {
        console.log("data: ", data);
        let finalData = {};
        if (this._validateBin(data.bin)) {
            finalData["bin"] = data.bin;
        } else {
            return;
        }
        finalData['multi'] = Boolean(data.multi);
        finalData['pitch'] = data.pitch || '';
        finalData['description'] = data.description || '';
        return finalData;
    },

    _verifyUpdateData: function(data) {
        var finalData = this._verifyCreateData(data);
        if (data.name) {
            finalData['name'] = data.name;
        } else {
            return alert("Error: missing required value 'name'");
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
export { API_URL };
