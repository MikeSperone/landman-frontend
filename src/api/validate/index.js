import { fingerSanitize, fingerValidation } from './fingers';
import { soundSanitize, soundValidation } from './sounds';
import { commentSanitize, commentValidation } from './comments';

const sanitizeAndValidate = fn => data => {
    const sanitizedData = fn.sanitize(data);
    return fn.validate(sanitizedData) && sanitizedData;
};

const fingers  = sanitizeAndValidate({ sanitize: fingerSanitize,  validate: fingerValidation });
const sounds   = sanitizeAndValidate({ sanitize: soundSanitize,   validate: soundValidation });
const comments = sanitizeAndValidate({ sanitize: commentSanitize, validate: commentValidation });

export {
    fingers,
    sounds,
    comments
};
