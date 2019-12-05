import fingerData from '../fingers';
const SOUND_DATA = {
    name: {
        type: 'string',
        length: {
            min: 4,
            max: 255 
        },
        clean: n => n.replace(/\s+/, '_').replace('"', '').replace('\'', '')
    },
    fingering_id: fingerData['fingering_id'],
    pitches: {
        type: 'string',
        length: {
            min: 2,
            max: 32
        },
        test: p => {
            // should be cleaned first before testing
            // should be in the form <pitch_letter><sharp_or_flat_or_blank><octave>,
            const pitchArray = p.split(',');
            pitchArray.forEach(arr => {
                if (!arr[0].toUpperCase().match(/[A-G]/)) return false;
                if (arr.length === 3) {
                    if (!arr[1].match(/[b#]/)) return false;
                    if (!arr[2].match(/[-0-9]/)) return false;
                } else {
                    if (!arr[1].match(/[-0-9]/)) return false;
                }
            });
            return p;
        },
        clean: n => n.toUpperCase().replace(/\s+/, '')
    },
    description: {
        type: 'string',
        length: {
            min: 4,
            max: 511 
        }
    },
    multiphonic: {
        type: 'boolean',
    },
    kientzy_id: {
        type: 'number',
    }
};

export default SOUND_DATA;
