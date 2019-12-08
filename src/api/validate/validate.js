// function crossTests(data) {
//     return !!data.multiphonic === (data.pitches.split(',').length > 1);
// }

function test(testItem, valueToCheck) {

    const lengthCheck = !!testItem.length ?
        testItem.length.min <= valueToCheck.length && testItem.length.max >= valueToCheck.length :
        // if there's no length to check, this defaults to true
        true;

    return (
        typeof valueToCheck === testItem.type &&
        lengthCheck &&
        testItem.customTest(valueToCheck)
    );

}

function validateItem(testData, entry) {
    if (typeof testData !== "undefined") {
        return test(testData, entry);
    } else {
        alert('Invalid sound key');
        return false;
    }
}

const validate = testData => {
    return (data) => {
        console.info('data: ', data);
        let keys = Object.keys(data);
        return keys.every(k => {
            console.info('validating ' + k);
            const isValidated = validateItem(testData[k], data[k]);
            console.info('isValidated? ', isValidated);
            return isValidated;
        });
        // crossTests(data);
    }
}

const sanitize = testFunctions => {
    return data => {
        const keys = Object.keys(data);
        const cleanedData = {};
        const noop = v => v;

        keys.forEach(k => {
            const clean = testFunctions[k] || noop;
            // Trim all strings
            if (typeof data[k] === 'string') data[k] = data[k].trim();
            cleanedData[k] = clean(data[k]);
        });
        return cleanedData;
    }
};

export { validate, sanitize };
