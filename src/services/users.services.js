import { UsersDB } from "../persistencia/users.js"

const usersDB = new UsersDB();
  
class UsersService{
    static getUsers = () =>{
        const users = usersDB.get();
        return users;
    }
    static saveUSer = (user) =>{
        const result = usersDB.save(user);
        return result;
    }
};

export { UsersService };