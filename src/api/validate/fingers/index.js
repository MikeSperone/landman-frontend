const DATA_VALIDATION = {
    fingering_id: {
        type: 'string',
        length: {
            min: 23,
            max: 23
        },
        test: bin => {
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

export default DATA_VALIDATION;
