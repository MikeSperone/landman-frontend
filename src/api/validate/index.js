import fingerData from './fingers';
import soundData from './sounds';
import commentData, from './comments';

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
            if (typeof testData !== "undefined") {
                const value = !!testData.clean ? testData.clean(v) : v;
                return test(testData, value);
            } else {
                alert('Invalid sound key');
                return false;
            }
        },
        all: function(data) {
            Object.entries(data).forEach(([k, v]) => {
                this.item(k, v);
            });
            crossTests();
        }
    };

};

export {
    fingers: validate(fingerData),
    sounds: validate(soundData),
    comments: validate(commentData)
};
