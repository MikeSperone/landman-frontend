import { validate, sanitize } from '../validate';

const sanitize_functions = {
    sound_id: i => i,
    comment: c => c.replace('"', ''),
};
const DATA_VALIDATION = {
    sound_id: {
        type: 'number',
    },
    comment: {
        type: 'string',
        length: {
            min: 2,
            max: 511
        }
    }
};

const commentValidation = validate(DATA_VALIDATION);
const commentSanitize = sanitize(sanitize_functions);
export {
    commentValidation,
    commentSanitize
}
