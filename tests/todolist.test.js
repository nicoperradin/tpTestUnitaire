import { DateTime } from 'luxon';
import { ApiEmailValidator } from '../src/ApiEmailValidator';
import { User } from '../src/User';
import { ToDoList } from '../src/ToDoList';

describe('test todolist functions', () => {

    it('should be a good todolist validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        apiEmailValidator.check = jest.fn((email) => true)
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            apiEmailValidator
        })
        expect(
            user.isValid()
        ).toBe(true);
    });

    it('should be a good user validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            apiEmailValidator
        })

        const todolist = new ToDoList(user)
        let item = {
            name: 'TEST du nom',
            content: 'TEST du contenu',
            createdAt: Date.now(),
        }

        console.log(todolist.add(item));
        console.log(Date.now());
        expect(todolist.add(item)).toBe(true);
    });
})    
