import { sanitize, validate } from '../validate';

const sanitizeFunctions = {
    fingering_id: n => n.trim()
};
const VALIDATION_DATA = {
    fingering_id: {
        type: 'string',
        length: {
            min: 23,
            max: 23
        },
        customTest: bin => {
            var i = 0,
                length = 23;
            for (i; i < length; i++) {
                const n = bin[i];
                if (n !== '0' && n !== '1') return false;
            }
            return true;
        }
    },
};

const fingerValidation = validate(VALIDATION_DATA);
const fingerSanitize = sanitize(sanitizeFunctions);
export {
    VALIDATION_DATA as validationData,
    sanitizeFunctions,
    fingerValidation,
    fingerSanitize
}
