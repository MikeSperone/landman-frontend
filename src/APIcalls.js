// const API_URL = "http://api.mikesperone.com/landman";
const BASE_URL = "http://localhost:3000";
const API_URL = BASE_URL + "/v1/alto/";
const LOGIN_URL = BASE_URL + "/users/login";

var token = 'woof';
var permissionsLevel = '8';
function tokens() {

    var _token;

    function set(t) {
        _token = t;
    }

    function get() {
        return _token;
    }
    return {
        set,
        get
    };
}

function xhr(type, url, data, options={}) {
    console.log('xhr ' + type);
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open(type, url, true);
        if (!(data instanceof FormData)) {
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        } else if (type === "PUT") {
            req.setRequestHeader("Content-type", "application/json");
        }
        if (type !== "GET" && !url.match('users/login')) {
            // authorization needed
            if (token === 'woof') return (reject({status: 401}));
            req.setRequestHeader("Authorization", "Bearer " + token);
        }
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    return resolve(JSON.parse(req.responseText));
                } else if (req.status === 401) {
                    alert('you must be logged in to complete this action');
                } else if (req.status === 400) {
                    return reject(JSON.parse(req.responseText));
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

    login: (email, password) => {
        return new Promise(resolve => {
            xhr("POST", LOGIN_URL, 'email='+email+'&password='+ password)
                .then(d => {
                    if (typeof d !== "undefined") {
                        if (d.token) token = d.token;
                        permissionsLevel = (d.user && d.user.permissionsLevel) ?
                            d.user.permissionsLevel :
                            8;
                    }
                    resolve(d);
                });
        });
    },

    search: bin => xhr("GET", API_URL + bin),

    createData: function(data) {
        if (permissionsLevel >= 4) {
            return new Promise((resolve, reject) => reject({ error: "Incorrect permissions" }));
        }
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
        // TODO: handle checking if this is the users' submitted data
        // if (ownContent && user.permissionsLevel === 5)
        if (permissionsLevel >= 3) {
            console.error('incorrect permissions');
            return new Promise((_, reject) => reject({ error: 'incorrect permissions' }));
        }
        let params = JSON.stringify(this._verifyUpdateData(data));
        return xhr("PUT", API_URL + data.bin + '/' + data.soundID, params);
    },

    deleteEntry: function(data) {
        // TODO: make this delete work
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
