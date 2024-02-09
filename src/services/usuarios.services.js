import { UsuariosDB } from "../persistencia/users.js"

const usuariosDB = new UsuariosDB();

class UsersService{
    static getUsers = () =>{
        const users = usuariosDB.get();
        return users;
    }
    static saveUSer = (user) =>{
        const result = usuariosDB.save(user);
        return result;
    }
};

export { UsersService };