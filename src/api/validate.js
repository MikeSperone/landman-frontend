function response(resp) {
    if (!resp || !resp.message) {
        alert('error, malformed response');
        return false;
    }
    if (resp.message.error !== false) {
        alert((resp.message && resp.message.error) || 'Error logging in');
        return false;
    }
    return true;
}

const incomingTransformation = {
    create: function(data) {
        return data;
    },
    search: function(data) {
        return data;
    },
    update: function(data) {
        return data;
    },
    delete: function(data) {
        return data;
    }
};
const incomingValidations = {
    create: function(data) {
        return true;
    },
    search: function(data) {
        return true;
    },
    update: function(data) {
        return true;
    },
    delete: function(data) {
        return true;
    }
}

function isDefined(v) {
    const isIt = typeof v !== "undefined";
    if (!isIt) console.warn({ v });
    return isIt;
}
function validateUserData(d) {
    console.info(d);
    return isDefined(d) &&
        isDefined(d.access_token) &&
        d.access_token.type === "bearer" &&
        isDefined(d.access_token.token) &&
        isDefined(d.user) &&
        isDefined(d.user.permissionsLevel);
}

export {
    response,
    incomingTransformation,
    incomingValidations,
    validateUserData
};
