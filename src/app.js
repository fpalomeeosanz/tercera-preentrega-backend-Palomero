import express from "express";
import handlebars  from "express-handlebars";

import { options } from "./config/config.js";
import { cartsRouter } from "./routes/carts.routes.js"
import { usersRouter } from "./routes/users.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { contactsRouter } from "./routes/contacts.routes.js";

import { __dirname }  from "./utils.js";
import  dotenv  from "dotenv";

import MongoStore from "connect-mongo";
import { generateToken, authToken } from "./config/JWT.utils.js";
import { dbConecction } from "./config/dbConecction.js";

import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import session from "express-session";
import { authRouter } from "./routes/auth.routes.js";

const app = express();
const PORT = options.server.port;

const users = [];

dotenv.config();

dbConecction();

const httpServer = app.listen(PORT, () => console.log(`servidor funcionando en puerto: ${PORT} `));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(`${__dirname}/public`));


app.use("/", viewsRouter);
app.use("/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/contacts", contactsRouter);

initializePassport();
app.use(session({
    store: MongoStore.create({
        mongoUrl: options.mongo.url
    }),
    secret:"fpalomerosanz",
    resave:false,
    saveUninitialized:false
}));


app.use(passport.initialize());
app.use("/api/sessions", sessionsRouter);

app.post(`/register`, (req,res) => {

    const {name, email, password} = req.body;
    const exists = users.find(user => user.email === email);
    if(exists) return res.status(400).send({status:"error", error: "User alredy exists"});

    const user = {
        name,
        email,
        password
    }
    users.push(user);
    const access_token = generateToken(user);
    res.send({status:"success", access_token})
})
app.post(`/login`, (req,res) => {

    const {email, password} = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if(!user) return res.status(400).send({staus:"error", error: "Invalid crdentials"});

    const access_token = generateToken(user);
    res.send({status:"success", access_token});
})
app.get(`/current`, authToken, (req,res) => {
    res.send({status:"success", payload:req.user});
})
