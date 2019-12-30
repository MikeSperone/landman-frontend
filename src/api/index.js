import User from './user';
import { Actions } from './user/permissions';
import * as validate from './validate/index.js';
import crud from './crud';
import xhr from './xhr';

// import { incomingValidations, incomingTransformation, validateUserData } from './validate.js';
import { validateUserData } from './validate.js';
const API_URL = process.env.REACT_APP_DATABASE_URL;
console.info('API_URL: ', API_URL);

const api = {
    FINGERS: API_URL + '/alto-sax/',
    COMMENTS: API_URL + '/comments',
    LOGIN: API_URL + '/login',
    SOUNDS: API_URL + '/sounds/',
    AUDIO_UPLOAD: API_URL + '/sounds/upload',
}
Object.freeze(api);


const user = new User();

function objectToFormData(validatedData) {
    var formData = new FormData();
    Object.entries(validatedData).forEach(([k, v]) => {
        formData.append(k, v);
    });
    return formData;
}

const APIcalls = {

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
        return new Promise((resolve, reject) => {
            xhr("POST", api.LOGIN, 'm='+email+'&s='+ password)
                .then(d => {
                    // if (!validateResponse(d)) return resolve({});
                    const data = d.data;
                    if (validateUserData(data)) {
                        user.login(data.access_token.token, data.user);
                        if (user.isLoggedIn) {
                            crud.userEmail = user.email;
                            resolve(data);
                        } else {
                            reject({
                                message: {
                                    error: 'Invalid User',
                                    success: false
                                },
                                data: {}
                            });
                        };
                    }
                });
        });
    },

    comments: {
        create: data => {
            const validatedData = validate.comments(data);
            if (!validatedData) return alert('Invalid data');
            console.info('validatedData: ', validatedData);

            const formData = objectToFormData(validatedData);
            return crud.create(api.COMMENTS, formData);
        },
        read: sound_id => crud.read(api.COMMENTS + '?sound_id=' + sound_id),
        update: data => {
            const validatedData = validate.comments(data);
            if (!validatedData) return alert('Invalid data');
            const params = JSON.stringify(validatedData);
            return crud.update(api.COMMENTS + '/' + data.id, params)
        },
        delete: id => crud.delete(api.COMMENTS, id)
    },
    fingers: {
        read: bin => crud.read(api.FINGERS + bin)
    },
    sounds: {

        create: function(data) {

            const validatedData = validate.sounds(data);
            if (!validatedData) return alert('Invalid data');

            const formData = objectToFormData(validatedData);

            crud.create(api.SOUNDS, formData)
                .then(() => {
                    alert("Success, new data added");
                    window.location.reload();
                })
                .catch(status => alert("Server error: " + status));

        },
        read: bin => new Promise((resolve, reject) => { 
            crud.read(api.FINGERS + bin)
                .then(d => {
                    console.info('read sound data - d: ', d);
                    return resolve(d);
                    // if (incomingValidations.search(d)) {
                    //     return resolve(incomingTransformation.search(d));
                    // } else {
                    //     return reject('Invalid data from the database.');
                    // }
                });
        }),
        update: function(data) {
            const validatedData = validate.sounds(data);
            if (!validatedData) return alert('Invalid data');
            const params = JSON.stringify(validatedData);
            return crud.update(api.SOUNDS + data.id, params);
        },
        delete: function(id) {
            if (id === undefined) return alert('ID is undefined');
            return crud.delete(api.SOUNDS + id);
        },
        upload: function(formData, callback) {
            return crud.upload(api.AUDIO_UPLOAD, formData, callback);
        }
    },

    _verifyData: function(data) {
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
                newSound["multiphonic"] = sound.multiphonic;
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
export { API_URL, Actions, user };
