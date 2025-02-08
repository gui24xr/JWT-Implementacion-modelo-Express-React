
import { TOKEN_SECRET } from "../src/config/token.js";
import jwt from 'jsonwebtoken'
import { usersService } from "../src/Service/users.service.js";

function processToken(req,res,next) {
    try{
        const token = extractCookiesFromRequest(req)
        console.log(token)
        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }
        const decoded = verifyAndDecodeToken(token)
        const foundUser = checkAndGetUser(decoded.userId)
        req.user = foundUser
        console.log('Ahora req.user es: ', req.user)
        next()
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

function checkAndGetUser(userId){
  try{
    return usersService.getUserById(userId)
  }catch(error){
    throw error
  }
}

function verifyAndDecodeToken(token)  {
    try {
      const decoded = jwt.verify(token, TOKEN_SECRET);
      console.log("Token decodeado: ", decoded);
      return decoded;
    } catch (error) {
      throw error
    }
  }

  function extractCookiesFromRequest(request){
    console.log('Extrayendo cookie', request.signedCookies)
    const token =request.signedCookies['token']
    if (!token) return null
    console.log('token en cookie extractor: ',request.signedCookies['token'])
    return token
}

export {
    processToken
}