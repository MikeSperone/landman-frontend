const Actions = {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
    DELETE: 4,
    COMMENT: 5,
    MODERATE_COMMENTS: 6,
    MODERATE_DATA: 7,
    ADMIN: 8,
    SUPER: 9,
    READ_ONLY: 10,
    properties: {
        1: {name: 'create'},
        2: {name: 'read'},
        3: {name: 'update'},
        4: {name: 'delete'},
        5: {name: 'comment'},
        6: {name: 'moderate comments'},
        7: {name: 'moderate data'},
        8: {name: 'admin'},
        9: {name: 'super admin'},
        10: {name: 'read only'}
    }
};

const cruc = [Actions.CREATE, Actions.READ, Actions.UPDATE, Actions.COMMENT]; 
const modPermissions = [Actions.MODERATE_COMMENTS, Actions.MODERATE_DATA, Actions.DELETE, ...cruc];

const Roles = {
    SUPER_ADMIN: 0,
    ADMIN: 1,
    MODERATOR: 2,
    DATA_MOD: 3,
    COMMENT_MOD: 4,
    NORMAL_USER: 5,
    COMMENTER: 6,
    RESERVED: 7,
    READ_ONLY: 8,
    properties: {
        0: { name: 'super admin', permissions: [Actions.SUPER, Actions.ADMIN, ...modPermissions]},
        1: { name: 'admin', permissions: [Actions.ADMIN, ...modPermissions] },
        2: { name: 'moderator', permissions: modPermissions },
        3: { name: 'data moderator', permissions: [Actions.MODERATE_DATA, Actions.DELETE, ...cruc] },
        4: { name: 'comment moderator', permissions: [Actions.MODERATE_COMMENTS, ...cruc] },
        5: { name: 'normal use', permissions: cruc },
        6: { name: 'commenter', permissions: [Actions.COMMENT] },
        7: { name: 'reserved', permissions: [Actions.READ_ONLY] },
        8: { name: 'read only', permissions: [Actions.READ_ONLY] }
    }
};
const RolesMap = Object.entries(Roles)
    .reduce((newObj, [key, val]) => {
            newObj[val] = key;
            return newObj;
        }, {});

if (Object.freeze) {
    Object.freeze(Actions);
    Object.freeze(Roles);
    Object.freeze(RolesMap);
};

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
        console.info('role; ', this._role);
        console.info('properties: ', Roles.properties);
        return Roles.properties[this._role].permissions;
    }

    get isLoggedIn() {
        return this._loggedIn;
    }

    isAuthorizedFor(action, contentAuthor=this.email) {
        // contentAuthor set to self by default
        // so by not passing in the author, you are
        // saying content Authorization is not needed

        if (!this.isLoggedIn) return false;

        if (!this.permissions.includes(action)) return false;

        if (contentAuthor !== this.email && [Actions.UPDATE, Actions.DELETE].includes(action)) {
            // this indicates user must be a moderator
            return this.permissions.includes(Actions.MODERATE_DATA);
        }

        return true;
    }

    login(token, { username, email, id, permissionsLevel }) {
        this.token = token;
        this.email = email;
        this.id = id;
        this.username = username;
        this.permissionsLevel = permissionsLevel;
        this._loggedIn = true;
    }
}

export { Actions };
