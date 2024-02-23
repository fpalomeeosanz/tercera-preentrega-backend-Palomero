export class CreateContactDto{
    constructor(contact){
        this.fullName = `${contact.firts_name} ${contact.last_name}`;
        this.name = contact.firts_name;
        this.lastName = contact.last_name;
        this.telefono = contact.telefono;
        this.email = contact.email;
        this.password = contact.password;
    }
}

export class GetContactoDTO{
    constructor(contactDB){
        this.fullName = contactDB.fullName;
        this.telefono = contactDB.telefono;
        this.email = contactDB.email
    }
}