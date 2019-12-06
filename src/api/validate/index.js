import { fingerSanitize, fingerValidation } from './fingers';
import { soundSanitize, soundValidation } from './sounds';
import { commentSanitize, commentValidation } from './comments';

const sanitizeAndValidate = fn => data => {
    const sanitizedData = fn.sanitize(data);
    return fn.validation(sanitizedData) && sanitizedData;
};

const fingers = sanitizeAndValidate({ fingerSanitize, fingerValidation });
const sounds = sanitizeAndValidate({ soundSanitize, soundValidation });
const comments = sanitizeAndValidate({ commentSanitize, commentValidation });

export {
    fingers,
    sounds,
    comments
};
