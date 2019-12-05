import User from './user';
import { Actions } from './user/permissions';
import * as validate from './validate/index.js';
import crud from './crud';
import xhr from './xhr';

import { incomingValidations, incomingTransformation, validateUserData } from './validate.js';
const BASE_URL = process.env.REACT_APP_BASE_URL;
// const API_URL = BASE_URL + "/v1/alto/";
const API_URL = "http://localhost:3333";
const API_URL_SOUNDS = API_URL + "/sounds";
// const LOGIN_URL = BASE_URL + "/users/login";
const LOGIN_URL = 'http://localhost:3333' + "/login";


const user = new User();

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
            xhr("POST", LOGIN_URL, 'm='+email+'&s='+ password)
                .then(d => {
                    // if (!validateResponse(d)) return resolve({});
                    const data = d.data;
                    if (validateUserData(data)) {
                        console.info(d);
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
        create: params => crud.create(API_URL + '/comments', params),
        read: sound_id => crud.read(API_URL + '/comments/?sound_id=' + sound_id),
        update: params => crud.update(API_URL + '/comments', params),
        delete: id => crud.delete(API_URL + '/comments', id)
    },
    fingers: {
        read: bin => crud.read(BASE_URL + '/alto-sax/' + bin)
    },
    sounds: {

        create: function(data) {

            var formData = new FormData();
            Object.entries(data).forEach(([k, v]) => {
                console.log('appending ' + k, ": " + v)
                formData.append(k, v);
            });

            crud.create(API_URL_SOUNDS, formData)
                .then(() => {
                    alert("Success, new data added");
                    window.location.reload();
                })
                .catch(status => alert("Server error: " + status));

        },
        read: bin => new Promise((resolve, reject) => { 
            crud.read(API_URL + '/alto-sax/' + bin)
                .then(d => {
                    console.info('read sound data - d: ', d);
                    return resolve(d);
                    if (incomingValidations.search(d)) {
                        return resolve(incomingTransformation.search(d));
                    } else {
                        return reject('Invalid data from the database.');
                    }
                });
        }),
        update: function(data) {
            const params = JSON.stringify(data);
            crud.update(API_URL_SOUNDS + data.bin + '/' + data.soundID, params);
        },
        delete: function(data) {
            alert('TODO: make this delete work');
            crud.delete(API_URL_SOUNDS + '/' + data.bin  + '/' + data.sound_id)
        },
        upload: function(file) {
            alert('TODO: upload');
        }
    },

    // TODO: fix this
    // uploadAudio: Sounds.upload,

    _verifyData: function(data) {
        console.log("verifying data: ", data);
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
export { API_URL, Actions, user };
