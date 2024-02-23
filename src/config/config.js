import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

export const options = {
    server: {
        port: PORT
    },
    mongo: {
        url: MONGO_URI
    },
    key: { 
        pass: PRIVATE_KEY
    }
};