import passport from "passport";
import LocalStrategy  from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import userModel from "../DAO/models/user.model.js";

export const initializePassport = () => {
    
    passport.use("signupStrategy", new LocalStrategy(
        {
            usernameField:"email",
            passReqToCallback:true
        },
        async(req,username,password,done) => {
            try {
                const {name} = req.body;
                const user = await userModel.findOne({email:username});
                if(user){
                    return done(null,false)
                }
                //aca manejo los privilegios 
                //let rol='user';
                //if (username.endsWith("@parquetroquen.cl")) {
                //rol = "NivelDuende";
                //} 
                let rol='user';
                if (username.endsWith("@coder.com")) {
                    rol = "admin";
                }
                
                const newUser = {
                    name,
                    email:username,
                    password:createHash(password),
                    rol
                };

                const userCreated = await userModel.create(newUser);
                return done(null,userCreated)
            } catch (error) {
              return done(error);
            }
        }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField:"email"
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({email:username});
                if(!user){
                    return done(null, false);
                }
                
                if(!isValidPassword(password, user)) return done(null, false);
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    
    passport.serializeUser((user,done) => {
        done(null,user._id)
    });

    passport.deserializeUser(async(id,done) => { 
        const userDB = await userModel.findById(id);
        done(null, userDB)
    });
};