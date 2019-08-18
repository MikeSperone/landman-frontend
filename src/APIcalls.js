// const API_URL = "http://api.mikesperone.com/landman";
const BASE_URL = "http://localhost:3000";
const API_URL = BASE_URL + "/v1/alto/";
const LOGIN_URL = BASE_URL + "/users/login";

const PERMISSIONS = {
    create: [0, 1, 2, 3],
    update: [0, 1, 2],
    delete: [0]
};
const user = {
    token: 'woof',
    permissionsLevel: '8'
};

function userHasAccess(action) {
    if (user.token === 'woof') {
        alert("You must be logged in to " + action);
        return;
    }

    if (!PERMISSIONS[action].includes(user.permissionsLevel)) {
        alert(`You do not have permission to ${action}.\nIf you believe this is an error, please contact an administrator.`);
    }
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
            if (user.token === 'woof') {
                alert('Not logged in');
                return reject({status: 401});
            }
            req.setRequestHeader("Authorization", "Bearer " + user.token);
        }
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    return resolve(JSON.parse(req.responseText));
                } else if (req.status === 401) {
                    alert('you must be logged in to complete this action');
                } else if (req.status === 400) {
                    alert('Authorization Issue');
                } else {
                    console.log('unhandled response status', req.status);
                    return reject(JSON.parse(req.responseText));
                }
            }
        };
        req.send(data);
    });
}

const APIcalls = {
    errorMsg: (msg) => "Error: Invalid Data - " + msg,

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
            xhr("POST", LOGIN_URL, 'm='+email+'&s='+ password)
                .then(d => {
                    if (typeof d !== "undefined") {
                        if (d.token) user.token = d.token;
                        user.permissionsLevel = (d.user && d.user.permissionsLevel) ?
                            d.user.permissionsLevel :
                            8;
                    }
                    resolve(d);
                });
        });
    },

    search: bin => xhr("GET", API_URL + bin),

    createData: function(data) {
        if (!PERMISSIONS.create.includes(user.permissionsLevel)) {
            this.errorMsg('You do not have access to complete this action');
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
        if (!PERMISSIONS.update.includes(user.permissionsLevel)) {
            this.errorMsg('You do not have access to complete this action.');
            return new Promise((_, reject) => reject({ error: 'incorrect permissions' }));
        }
        let params = JSON.stringify(this._verifyUpdateData(data));
        return xhr("PUT", API_URL + data.bin + '/' + data.soundID, params);
    },

    deleteEntry: function(data) {
        if (!PERMISSIONS.delete.includes(user.permissionsLevel)) {
            this.errorMsg('You do not have access to complete this action.');
            return new Promise((_, reject) => reject({ error: 'incorrect permissions' }));
        }
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
            alert(this.errorMsg("bin data does not match"));
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
            return this.errorMsg("missing required value 'name'");
        }
        return finalData;
    },

    _validateBin: function(bin) {
        var errors = [];
        if (bin.length !== 23) {
            errors.push("incorrect data length");
        }
        if (typeof bin !== "string") {
            errors.push("invalid type " + typeof bin + " should be of type string");
        }
        if (errors.length) {
            errors.forEach(e => alert(this.errorMsg(e)));
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
export { API_URL, userHasAccess };
