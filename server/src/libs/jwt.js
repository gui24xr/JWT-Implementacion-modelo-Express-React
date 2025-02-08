import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config/token.js';


function createAccessToken(payload) {
  
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1h' })

}

function createExpiredToken() {
    return jwt.sign({}, TOKEN_SECRET, { expiresIn: '1s' })
}

function verifyAndDecodeToken(token){
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        console.log('Token decodeado: ', decoded)
        return decoded;
    } catch (error) {
       throw error
    }
}


export {
    createAccessToken,
    createExpiredToken,
    verifyAndDecodeToken
}