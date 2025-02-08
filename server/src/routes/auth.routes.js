import express from 'express'
import { authControllers } from '../controllers/auth.controllers.js';
import { processToken } from '../../middlewares/processToken.js';


export const router = express.Router()

router.post("/register", authControllers.register);
router.post("/login",  authControllers.login);
router.get("/verify", processToken,authControllers.verifyToken);
router.post("/logout", processToken, authControllers.logout);