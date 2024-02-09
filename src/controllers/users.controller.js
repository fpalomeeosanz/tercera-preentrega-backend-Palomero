import { UsersService } from "../services/users.services.js";

class UsersController{
    static getUsers = (req, res) => {
        const users = UsersService.getUsers();
        res.json({status: "success", data: users});
    }
    static saveUser = (req, res) => {
        const {name, email, age} = req.body;
        const newUser = {
            name,
            email,
            age
        }
        const result = UsersService.saveUser(newUser);
        res.json({status: "succes", message: result})
    }
}

export { UsersController };