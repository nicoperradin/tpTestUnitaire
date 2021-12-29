import { DateTime } from 'luxon';
import { ApiEmailValidator } from '../src/ApiEmailValidator';
import { User } from '../src/User';
import { ToDoList } from '../src/ToDoList';

describe('test user functions', () => {

    it('should be a good user validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        apiEmailValidator.check = jest.fn((email) => true)
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            password: 'password',
            apiEmailValidator
        })
        expect(
            user.isValid()
        ).toBe(true);
    });

    it('should be a bad user validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        apiEmailValidator.check = jest.fn((email) => true)
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            password: 'pass',
            apiEmailValidator
        })
        expect(user.isValid()).toBe(false);
    });
})    
