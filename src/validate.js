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
    incomingTransformation,
    incomingValidations,
    validateUserData
};
