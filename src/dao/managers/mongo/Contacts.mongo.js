import  contactModel  from "../../models/contact.model";

export class ContactsMongo{
    constructor(){
        this.model = contactModel;
    }
    async get(){
        try {
            return await this.model.find()
        } catch (error) {
            throw new Error(`Hubo un error al obtener los usuarios error: ${error.message}`)
        }
    }
    async post(contact){
        try {
            const contactCreated = await this.model.create(contact);
            return contactCreated;
        } catch (error) {
            throw new Error(`Hubo un error al querer guardar un usuario error: ${error.message}`)
            
        }
    }
    async getById(id){
        try {
            const contact = await this.model.findById(id);
            if(!contact){
                throw new Error("No se encontro el usuario");
            }
            return contact;
        } catch (error) {
            throw new Error(`Hubo un error al querer nuscar un usuario error: ${error.message}`)
            
        }
    };

}