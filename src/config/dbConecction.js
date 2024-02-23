import mongoose from "mongoose";
import { options } from "./config.js";

export const dbConecction = async () => {
    try {
        await mongoose.connect(options.mongo.url);
        console.log('Conectado a la BDD :D');
    } catch (error) {
        console.log(`Hubo un error al tratar de conectar a la BD el error: ${error}`);
    }
}
