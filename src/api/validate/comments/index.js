import { validate, sanitize } from '../validate';

const sanitize_functions = {
    id: i=> i,
    sound_id: i => i,
    comment: c => c.replace('"', ''),
};
const DATA_VALIDATION = {
    id: {
        type: 'number',
        customTest: i => i,
    },
    sound_id: {
        type: 'number',
        customTest: s => s,
    },
    comment: {
        type: 'string',
        length: {
            min: 2,
            max: 511
        },
        customTest: c => c
    }
};

const commentValidation = validate(DATA_VALIDATION);
const commentSanitize = sanitize(sanitize_functions);
export {
    commentValidation,
    commentSanitize
}
