import { sanitizeFunctions as cleanFingers, validationData as fingerData } from '../fingers';
import { validate, sanitize } from '../validate';

const sanitize_functions = {
    name: n => n.replace(/\s+/g, '_').replace('"', '').replace('\'', ''),
    pitches: n => n.toUpperCase().replace(/\s+/g, ''),
    multiphonic: n => Boolean(n),
    ...cleanFingers
};

const DATA_TESTS = {
    name: {
        type: 'string',
        length: {
            min: 4,
            max: 255 
        },
        customTest: n => true,
    },
    fingering_id: fingerData['fingering_id'],
    pitches: {
        type: 'string',
        length: {
            min: 2,
            max: 32
        },
        customTest: p => {
            console.info('customTest - pitches');
            // should be cleaned first before testing
            // should be in the form <pitch_letter><sharp_or_flat_or_blank><octave>,
            const pitchArray = p.split(',');
            console.info('whole pitchArray: ', pitchArray);
            return pitchArray.every(arr => {
                console.info('testing pitch class: ', arr);
                if (!arr[0].toUpperCase().match(/[A-G]/)) return false;
                if (arr.length > 3) return false;
                if (arr.length === 3) {
                    if (!arr[1].match(/[bB#]/)) return false;
                    if (!arr[2].match(/[-0-9]/)) return false;
                } else {
                    if (!arr[1].match(/[-0-9]/)) return false;
                }
                return true;
            });
        },
    },
    description: {
        type: 'string',
        length: {
            min: 4,
            max: 511 
        },
        customTest: d => true
    },
    multiphonic: {
        type: 'boolean',
        customTest: m => true
    },
    kientzy_id: {
        type: 'number',
        customTest: k => true
    }
};

const soundValidation = validate(DATA_TESTS);
const soundSanitize = sanitize(sanitize_functions);
export {
    soundValidation,
    soundSanitize
}
