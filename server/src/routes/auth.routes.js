import express from 'express'
import { authControllers } from '../controllers/auth.controllers.js';
import passport from '../config/passport.js'

export const router = express.Router()

router.post("/register", authControllers.register);
router.post("/login",  authControllers.login);
router.get("/verify", passport.authenticate("jwt",{session:false}),authControllers.verifyToken);
router.post("/logout", passport.authenticate("jwt",{session:false}), authControllers.logout);