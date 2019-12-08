import xhr from './xhr';
import { user } from '.';
import { Actions } from './user/permissions';

const crud = {

    user: {},

    auth: function(action) {
        return user.isAuthorizedFor(action);
    },

    create: function(endpoint, formData) {
        if (this.auth(Actions.CREATE)) {
            return xhr("POST", endpoint, formData);
        } else {
            return new Promise((_, rej) => rej({message: { error: 'Invalid authorization' }}));
        }
    },

    read: function(endpoint) {
        console.info('GET ' + endpoint);
        return xhr("GET", endpoint);
    },

    update: function(endpoint, params) {
        if (this.auth(Actions.UPDATE)) {
            return xhr("PUT", endpoint, params);
        } else {
            return new Promise((_, rej) => rej({message: { error: 'Invalid authorization' }}));
        }
    },

    delete: function(endpoint) {
        if (this.auth(Actions.DELETE)) {
            return xhr("DELETE", endpoint);
        } else {
            return new Promise((_, rej) => rej({message: { error: 'Invalid authorization' }}));
        }
    },

    upload: function(endpoint, formData, progressCallback) {
        // TODO: authorization issues, and callback goes to xhr updates thing
        if (this.auth(Actions.CREATE)) {
            return xhr("POST", endpoint, formData, { onprogress: progressCallback });
        } else {
            return new Promise((_, rej) => rej({message: { error: 'Invalid authorization' }}));
        }
    }
};

export default crud;
