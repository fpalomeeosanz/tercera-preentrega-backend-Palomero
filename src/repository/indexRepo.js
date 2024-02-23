import { ContactRepository } from "../repository/contact.repository.js";
import contactMongo  from "../DAO/models/contact.model.js"


export const contactService = new ContactRepository(contactMongo);