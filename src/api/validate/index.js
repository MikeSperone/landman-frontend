import fingerData from './fingers';
import soundData from './sounds';
import commentData from './comments';

function crossTests(data) {
    return !!data.multiphonic === (data.pitches.split(',').length > 1);
}

function test(item, dataValue) {

    const lengthCheck = !!item.length ?
        item.length.min <= dataValue.length && item.length.max >= dataValue.length :
        // if there's no length to check, this defaults to true
        true;

    return (
        typeof dataValue === item.type &&
        lengthCheck &&
        item.test(dataValue)
    );

}

function validate(dataValidation) {
    return {
        item: function(datum) {
            const k = Object.keys(datum)[0];
            const v = datum[k];
            const testData = dataValidation[k];
            console.info('testData: ', testData);
            if (typeof testData !== "undefined") {
                const value = !!testData.clean ? testData.clean(v) : v;
                return test(testData, value);
            } else {
                alert('Invalid sound key');
                return false;
            }
        },
        all: function(data) {
            console.info('data: ', data);
            //TODO: fix validate data
            let cleanAndValidData = {};
            let keys = Object.keys(data);
            keys.forEach(k => {
                const entry = {};
                entry[k] = data[k];
                this.item(entry);
            });
            // Object.entries(data).forEach(([k, v]) => {
            //     this.item(k, v);
            // });
            // crossTests(data);
        }
    };

};

export default {
    fingers: validate(fingerData),
    sounds: validate(soundData),
    comments: validate(commentData)
};
