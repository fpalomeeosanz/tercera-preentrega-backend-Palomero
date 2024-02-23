import jwt from "jsonwebtoken";
import { options } from "../config/config.js"

const PRIVATE_KEY = options.key.pass;

const generateToken = (user) => {
    const token = jwt.sing({user}, PRIVATE_KEY, {expiresIn: `24h`})
    return token;
}

const authToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({
        error: "Not authenticated"
    })
    const token = authHeader.split(` `)[1];
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: "Not authorized"})
        req.user = credentials.user;
        next();
    })
}
export { generateToken, authToken }; 