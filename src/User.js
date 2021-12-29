import { DateTime } from 'luxon'

export class User {
    constructor({ email, firstName, lastName, birthDate, password, apiEmailValidator }) {
        Object.assign(this, { email, firstName, lastName, birthDate: new Date(birthDate), password, apiEmailValidator })
    }
    
    isValid() {
        return !!(this.firstName && this.lastName && this.apiEmailValidator.check(this.email) && this._checkAge() && this._checkPassword())
    }

    _checkAge(requiredAge = 13) {
        return DateTime.fromJSDate(this.birthDate).diffNow('years').years < -requiredAge;
    }

    _checkPassword(min = 8, max = 40) {
        return (this.password.length >= min && this.password.length <= max);
    }
}

export function test() {
    
}
