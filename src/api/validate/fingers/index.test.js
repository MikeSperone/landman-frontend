import { fingerSanitize, fingerValidation } from '.';

describe('fingering sanitizing', () => {
    const mockData = {
        fingering_id: "10000000000000000000000 ",
    };
    test('trims value', () => {
        expect(fingerSanitize(mockData)).toEqual({
            fingering_id: "10000000000000000000000",
        });
    });
});

describe('fingering validations', () => {
    test('validates all correct data', () => {

        const mockData = {
            fingering_id: "10000000000000000000000",
        };
        expect(fingerValidation(mockData)).toBe(true);

    });

    test('fails on incorrect length', () => {

        const mockData = {
            fingering_id: "110000000000000000000000", // too many numbers
        };
        expect(fingerValidation(mockData)).toBe(false);

    });

    test('fails on invalid characters', () => {

        const mockData = {
            fingering_id: "10000b000000000000000000", // too many numbers
        };
        expect(fingerValidation(mockData)).toBe(false);

    });

});
