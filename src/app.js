import express from "express";
import { engine } from "express-handlebars";
import { options } from "./config/config.js";
import { usersRouter } from "./routes/users.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { mongoose } from "mongoose";
import  dotenv  from "dotenv";
import  __dirname  from "./utils.js";

const app = express();
const PORT = options.server.port;


const users = [];

const config = dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;
const connection = mongoose.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true, 
}).then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`servidor funcionando en puerto: ${PORT} `));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"))

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

