import nodemailer from "nodemailer";
import { options } from "../config/config.js";

const adminEmail = options.gmail.adminAccount;
const adminPass = options.gmail.adminPass;

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:adminEmail,
        pass:adminPass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
})

export { transporter };

export const emailSender = async (emailUser, tipo) => {
    
app.post("/registro", async (req,res)=>{

    try {
        
        let emailTemplate = ``;
        if(tipo == "venta"){
            emailTemplate = `<div>
            <h1>Bienvenido!!</h1>
            <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
            <p>Ya puedes empezar a usar nuestros servicios</p>
            <a href="https://www.google.com/">Explorar</a>
            </div>`;
        }
        if(tipo == "registro"){
            emailTemplate = `<div>
            <h1>Te haz logueado con exito!</h1>
            <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
            <p>Ya eres parte de la comunidad</p>
            <a href="https://www.google.com/">Explorar</a>
            </div>`;
        }
        const contenido = await transporter.sendMail({
        
            from: "fpalomerosanz",
            to:emailUser,
            subject:"Registro exitoso",
            html: emailTemplate
        })
        console.log("Contenido", contenido);
        return "OK"

    } catch (error) {
        console.log(error.message);
        return "Fail XD"
    }

})};