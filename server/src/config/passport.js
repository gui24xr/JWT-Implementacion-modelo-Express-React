import passport from 'passport'
import jwt from 'passport-jwt'
import GitHubStrategy from "passport-github2"
import { TOKEN_SECRET } from './token.js'
import { usersService } from '../Service/users.service.js'

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.signedCookies['token']
    }
    console.log('Token: token en cookie extractor: ', token)
    return token;
}

passport.use("jwt", new jwt.Strategy({
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: TOKEN_SECRET
}, async (jwt_payload, done) => {
    try{
        //Si llego a aca entonces ya pasport agarro la cookie, comprono y extrajo el token y puso en jwtPayload la info del token
        console.log('Pase por el calback de passport y este es el payload: ', jwt_payload)
        //De la info del token tomo userID que es lo que me interesa para buscar el user en la DB
        const foundUser = usersService.getUserById(jwt_payload.userId)
        return done(null, foundUser);
    }catch(error){
        console.log('Erroe en ballbackd: ', error)
        return done(error);
    }
}))


export default passport