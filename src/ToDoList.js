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
        if(this._checkAdd(item)){
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
        
        console.log(nbItems)
        console.log(item)

        if (nbItems >= 10 || nbItems < 0 ) {
            return "Vous ne pouvez avoir que 10 items";
        }
        if (nbItems == 8) {
            EmailSenderService.send(this.user.email ,"Vous ne pouvez plus qu'ajouter 2 items");
        }
        
        // Check Nom de l'item
        if(!item.name || this.getList().includes(item.name)){
            return "Le nom de cet item n'est pas unique";
        }

        // Check Content de l'item
        if(!item.content || item.content.split().length > 1000){
            return "Cet item contient trop de caractère";
        }

        // Check Date de création
        if(!item.createdAt || DateTime.fromJSDate(this.getList().at(-1).createdAt).diffNow('minutes').minutes < - 30){
            return "Vous avez déjà envoyé un item dans les 30 minutes";
        }

    }

    checkNbrList() {
        if (this.user.list > 1) {
            return false
            //throw "Un utilisateur ne peut avoir qu'une seule ToDoList";
        }

    }

    getList(){
        const items = [
            {
                name: 'Le nom',
                content: 'Le contenu',
                createdAt: 1639392693,
            }
        ]
        return items;
    }
}