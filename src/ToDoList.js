import { DateTime } from 'luxon'
import { EmailSenderService } from './EmailSenderService.js'

export class ToDoList {
    constructor(user, list) {
        this.user = user;
        this.list = list || [];
    }

    isValid() {
        return !!(this.checkNbrList())
    }

    add(item){
        if(this._checkAdd(item) == true){
            this.list.push(item);
            return 'Success !'
        } else {
            return this._checkAdd(item)
        }
    }
    remove(item){
        this.list.remove(item);
    }

    _checkAdd(item) {
        // Check Nombre d'items
        const nbItems = this.getList().length;

        if (nbItems >= 10 ) {
            return "Vous ne pouvez avoir que 10 items";
        }
        else if (nbItems == 8) {
            EmailSenderService.send(this.user.email ,"Vous ne pouvez plus qu'ajouter 2 items");
            return true;
        }
        
        // Check Nom de l'item
        if(!item.name || this.getList().filter(i => i.name == item.name).length > 0){
            return "Le nom de cet item n'est pas unique";
        }

        // Check Content de l'item
        if(!item.content || item.content.length > 1000){
            return "Cet item contient trop de caractère";
        }

        // Check Date de création
        if(nbItems != 0 && (!item.createdAt || item.createdAt - this.getList().at(-1).createdAt < 1800000)){
            return "Vous avez déjà envoyé un item dans les 30 minutes";
            //throw "Vous avez déjà envoyé un item dans les 30 minutes";
        }

        return true;

    }

    checkNbrList() {
        if (this.user.list > 1) {
            return false
            //throw "Un utilisateur ne peut avoir qu'une seule ToDoList";
        }

    }

    getList(){
        return this.list;
    }
}