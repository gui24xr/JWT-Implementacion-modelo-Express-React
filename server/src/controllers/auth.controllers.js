import { authService } from "../Service/auth.service.js";
import { usersService } from "../Service/users.service.js";

export const authControllers = {

    register: async (req,res) =>{
        try{
            const { userName, email, password } = req.body;
            const {user,token} = authService.createUserAndGenerateToken(email,userName,password)
            res.cookie(process.env.TOKEN_COOKIE_NAME || 'token', token, {
                httpOnly: true,
                //secure: true,
                //sameSite: "none",
                signed: true
              });
          
              return res.status(200).json({user: user})

        }catch(error){
            res.status(500).json({ message: error.message })
        }
    },

    login:async(req,res)=>{
        try{
            const { email, password } = req.body;
            const {user,token} = authService.authenticateUserAndGenerateToken(email,password)
            res.cookie(process.env.TOKEN_COOKIE_NAME || 'token', token, {
                httpOnly: true,
                //secure: true,
                //sameSite: "none",
                signed: true
              });
          
              return res.status(200).json({user: user})
        }catch(error){
            res.status(500).json({ message: error.message })
        }
    },

    logout:async (req,res)=>{
        try{
             res.cookie(process.env.TOKEN_COOKIE_NAME || 'token', '', {
                expires: new Date(0), // Fecha en el pasado (1 de enero de 1970)
                httpOnly: true,
                secure: true, // Solo en HTTPS
                //sameSite: 'Strict',
                //path: '/', // Ruta de la cookie
              });
            return res.status(200).json({ message: "Sesion cerrada correctamente." })
        }catch(error){
            res.status(500).json({ message: error.message })
        }
    },

    verifyToken:async (req,res)=>{
        try{
            console.log('req.user en verify: ',req.user)
            const foundUser = usersService.getUserById(req.user.id)
            return res.status(200).json({
                user: foundUser,
                message: 'Token OK !!!'
            })
        }catch(error){
            res.status(500).json({ message: error.message })
        }
    },



    


}