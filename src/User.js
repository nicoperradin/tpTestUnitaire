import { DateTime } from 'luxon'

export class User {
    constructor({ email, firstName, lastName, birthDate, apiEmailValidator }) {
        Object.assign(this, { email, firstName, lastName, birthDate: new Date(birthDate), apiEmailValidator })
    }
    
    isValid() {
        return !!(this.firstName && this.lastName && this.apiEmailValidator.check(this.email) && this._checkAge())
    }

    _checkAge(requiredAge = 13) {
        return DateTime.fromJSDate(this.birthDate).diffNow('years').years < -requiredAge;
    }
}

export function test() {
    
}
