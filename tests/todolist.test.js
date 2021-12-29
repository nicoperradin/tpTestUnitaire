import { DateTime } from 'luxon';
import { ApiEmailValidator } from '../src/ApiEmailValidator';
import { User } from '../src/User';
import { ToDoList } from '../src/ToDoList';
import { EmailSenderService } from '../src/EmailSenderService';

describe('test todolist functions', () => {

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

    it('should be a good todolist add validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            password: 'password',
            apiEmailValidator
        })

        const todolist = new ToDoList(user)
        let now = Date.now()

        let item = {
            name: 'TEST du nom',
            content: 'TEST du contenu',
            createdAt: now,
        }
        todolist.add(item);

        expect(JSON.stringify(todolist.list)).toBe(JSON.stringify([item]));
    });

    it('should be a good todolist add two items validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            password: 'password',
            apiEmailValidator
        })

        const todolist = new ToDoList(user)
        let now = Date.now()
        let datelimite = now + 1850000;
        let item = {
            name: '1er item',
            content: 'contenu du 1er item',
            createdAt: now,
        }
        todolist.add(item);
        expect(JSON.stringify(todolist.list)).toBe(JSON.stringify([item]));

        let item2 = {
            name: '2ème item',
            content: 'contenu du 2ème item',
            createdAt: datelimite,
        }
        todolist.add(item2);
        expect(JSON.stringify(todolist.list)).toBe(JSON.stringify([item, item2]));
    });

    it('should be a bad todolist add two items validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            password: 'password',
            apiEmailValidator
        })

        const todolist = new ToDoList(user)
        let now = Date.now()
        let datelimite = Date.now();
        let item = {
            name: '1er item',
            content: 'contenu du 1er item',
            createdAt: now,
        }
        todolist.add(item);
        expect(JSON.stringify(todolist.list)).toBe(JSON.stringify([item]));

        let item2 = {
            name: '2ème item',
            content: 'contenu du 2ème item',
            createdAt: datelimite,
        }
        expect(todolist.add(item2)).toBe("Vous avez déjà envoyé un item dans les 30 minutes");
        expect(JSON.stringify(todolist.list)).toBe(JSON.stringify([item]));
    });

    it('should be a bad todolist add same items name validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            password: 'password',
            apiEmailValidator
        })

        const todolist = new ToDoList(user, [{name: '1er item',content: 'contenu du 1er item',createdAt: Date.now()}])

        let datelimite = Date.now() + 1850000;
        let item2 = {
            name: '1er item',
            content: 'contenu du 2ème item',
            createdAt: datelimite,
        }

        expect(todolist.add(item2)).toBe("Le nom de cet item n'est pas unique");
    });

    it('should be a bad todolist too long item content validation', () => {
        const apiEmailValidator = new ApiEmailValidator()
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            password: 'password',
            apiEmailValidator
        })

        const todolist = new ToDoList(user)
        
        let item = {
            name: '1er item',
            content: 'contenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er itemcontenu du 1er item',
            createdAt: Date.now(),
        }
        expect(todolist.add(item)).toBe("Cet item contient trop de caractère");
    });
    
    it('should send a email if the list already containt 8 items', () => {
        const apiEmailValidator = new ApiEmailValidator()
        const user = new User({
            email: 'alext77165@gmail.com',
            birthDate: DateTime.now().minus({ years: 20 }).toJSDate(),
            lastName: 'Trouvé',
            firstName: 'Alexandre',
            password: 'password',
            apiEmailValidator
        })
        
        const todolist = new ToDoList(user, [{name: 'test',content:'test',createdAt: Date.now()},{name: 'test',content:'test',createdAt: Date.now()},{name: 'test',content:'test',createdAt: Date.now()},{name: 'test',content:'test',createdAt: Date.now()},{name: 'test',content:'test',createdAt: Date.now()},{name: 'test',content:'test',createdAt: Date.now()},{name: 'test',content:'test',createdAt: Date.now()}])

        let datelimite = Date.now() + 1850000;
        let item = {
            name: '1er item',
            content: 'contenu du 1er item',
            createdAt: datelimite,
        }
        todolist.add(item);

        EmailSenderService.check = jest.fn((email) => true)
        EmailSenderService.check(user.email, "Vous ne pouvez plus ajouter que deux items.")
    });
})    
