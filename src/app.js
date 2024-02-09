import { Express } from "express";
import { options } from "./config/config.js"
import { usersRouter } from "./routes/users.routes.js";
import { productsRouter } from "./routes/products.routes.js";

const app = express();
const PORT = options.server.port;

app.use(express.json());

app.listen(PORT, () => console.log(`servidor funcionando en puerto: ${PORT} `));

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);