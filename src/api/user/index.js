import {
    Actions,
    Roles,
} from './permissions';

export default class User {
    constructor() {
        this._loggedIn = false;
        this.token = 'woof';
        this.id = null;
        this.email = '';
        this._role = Roles.READ_ONLY;
    }

    get permissionsLevel() {
        return this._role;
    }

    set permissionsLevel(x) {
        this._role = x;
    }

    get permissions() { 
        return Roles.properties[this._role].permissions;
    }

    get isLoggedIn() {
        return this._loggedIn;
    }

    isAuthorizedFor(action, contentAuthor=this.id) {
        // contentAuthor set to self by default
        // so by not passing in the author, you are
        // saying content Authorization is not needed

        if (!this.isLoggedIn) return false;

        if (!this.permissions.includes(action)) return false;

        if (contentAuthor !== this.id && [Actions.UPDATE, Actions.DELETE].includes(action)) {
            // this indicates user must be a moderator
            return this.permissions.includes(Actions.MODERATE_DATA);
        }

        return true;
    }

    getAccess() {
        return {
            create: this.hasAccess(Actions.CREATE).access,
            update: this.hasAccess(Actions.UPDATE).access,
            delete: this.hasAccess(Actions.DELETE).access
        }
    }

    hasAccess(action, author=this.id) {

        if (!this.isLoggedIn) {
            
            return {
                access: false,
                message: "You must be logged in to " + Actions.properties[action].name
            };
        }

        if (!this.isAuthorizedFor(action, author)) {
            return {
                access: false,
                message: `You do not have permission to ${Actions.properties[action].name}.\nIf you believe this is an error, please contact an administrator.`
            };
        }
        return { access: true };

    }

    login(token, { username, email, id, permissionsLevel }) {
        this.token = token;
        this.email = email;
        this.id = id;
        this.username = username;
        this.permissionsLevel = permissionsLevel;
        this._loggedIn = true;
        return this.isLoggedIn;
    }
}
