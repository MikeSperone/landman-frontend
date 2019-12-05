const DATA_VALIDATION = {
    sound_id: {
        type: 'number',
    },
    comment: {
        type: 'string',
        clean: function(c) {
            c = c.replace('"', '');
            c = c.trim();
            return c;
        }
    }
};

export default DATA_VALIDATION;
