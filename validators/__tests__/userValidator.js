import {validateLogInUser} from "../userValidator";

describe('Test Login User Validator', () => {
    test('Pass case', (done) => {
        const passCase = {email: "lamnguyen@gmail.com", password: "123456"};
        expect(validateLogInUser(passCase)).toEqual(expect.objectContaining({
            status: true,
            message: []
        }));
        done();
    });
});

describe('Test Register User Validator', () => {
    test('Pass case', (done) => {
        const passCase = {email: "lamnguyen@gmail.com", password: "123456", name: "Lam"};
        expect(validateLogInUser(passCase)).toEqual(expect.objectContaining({
            status: true,
            message: []
        }));
        done();
    });
});