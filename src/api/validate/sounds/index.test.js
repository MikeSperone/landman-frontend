import { soundSanitize, soundValidation } from '.';

describe('sound data sanitation', () => {
    const mockData = {
        name: "Cool Name",
        fingering_id: "10000000000000000000000",
        pitches: "G4",
        description: "Cool sound, but this is just a test.",
        multiphonic: 1,
        kientzy_id: 1
    };
    describe('name', () => {
        test('spaces to underscores', () => {
            expect(soundSanitize(mockData).name).toBe('Cool_Name');
        });
        test('trim', () => {
            mockData.name = "      ok ";
            expect(soundSanitize(mockData).name).toBe('ok');
        });
    });
    describe('pitches', () => {
        test('trim', () => {
            mockData.pitches= "G4, A# 4 ";
            expect(soundSanitize(mockData).pitches).toBe('G4,A#4');
        });

    });
    describe('description', () => {
    });
    describe('multiphonic', () => {
        test('make a boolean', () => {
            expect(soundSanitize(mockData).multiphonic).toBe(true);
        });
    });
});

describe('sound data validations', () => {

    test('validates all correct data', () => {
        const mockData = {
            name: "Test",
            fingering_id: "10000000000000000000000",
            pitches: "G4",
            description: "Cool sound, but this is just a test.",
            multiphonic: false,
            kientzy_id: 1
        };
        expect(soundValidation(mockData)).toBe(true);

    });

    test('fails on incorrect fingering value', () => {
        const mockData = {
            name: "Test",
            fingering_id: "12000000000000000000000",
            pitches: "G4",
            description: "Cool sound, but this is just a test.",
            multiphonic: false,
            kientzy_id: 1
        };
        expect(soundValidation(mockData)).toBe(false);
    });

    test('passes with uppercase flat', () => {
        const mockData = {
            name: "one",
            fingering_id: "10001000000000000000000",
            pitches: "GB4",
            description: "Cool sound, but this is just a test.",
            multiphonic: false,
            kientzy_id: 1
        };
        expect(soundValidation(mockData)).toBe(true);
    });
        
    test('fails on name too short', () => {
        const mockData = {
            name: "one",
            fingering_id: "10001000000000000000000",
            pitches: "G4",
            description: "Cool sound, but this is just a test.",
            multiphonic: false,
            kientzy_id: 1
        };
        expect(soundValidation(mockData)).toBe(false);
    });
    test('fails on incorrect type', () => {
        const mockData = {
            name: "Test",
            fingering_id: "12000000000000000000000",
            pitches: 64,
            description: "Cool sound, but this is just a test.",
            multiphonic: false,
            kientzy_id: 1
        };
        expect(soundValidation(mockData)).toBe(false);
    });

    describe('fails on pitches customTest', () => {
        test('incorrect separator', () => {
            const mockData = {
                name: "Test",
                fingering_id: "10000000000000000000000",
                pitches: "G4;A2",
                description: "Cool sound, but this is just a test.",
                multiphonic: false,
                kientzy_id: 1
            };
            expect(soundValidation(mockData)).toBe(false);

        });

        test('missing octave', () => {
            const mockData = {
                name: "Test",
                fingering_id: "10000000000000000000000",
                pitches: "A#",
                description: "Cool sound, but this is just a test.",
                multiphonic: false,
                kientzy_id: 1
            };
            expect(soundValidation(mockData)).toBe(false);

        });
        test('incorrect value', () => {
            const mockData = {
                name: "Test",
                fingering_id: "10000000000000000000000",
                pitches: "Af2",
                description: "Cool sound, but this is just a test.",
                multiphonic: false,
                kientzy_id: 1
            };
            expect(soundValidation(mockData)).toBe(false);

        });
    });
});
