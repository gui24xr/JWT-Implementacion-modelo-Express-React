import { usersService } from "./users.service.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/token.js";

export const authService = {
  createUserAndGenerateToken: (email, userName, password) => {
    try {
      const newUser = usersService.createUser(email, userName, password);
      const token = jwt.sign({ userId:newUser.id }, TOKEN_SECRET, {
        expiresIn: "1h",
      });
      return {
        user: newUser,
        token: token,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  authenticateUserAndGenerateToken: (email, password) => {
    try {
      if (!usersService.checkCredentials(email, password))
        throw new Error("Credenciales no validas...");
      const foundUser = usersService.getUserByEmail(email);
      const token = jwt.sign({ userId:foundUser.id }, TOKEN_SECRET, {
        expiresIn: "1h",
      });
      return {
        user: foundUser,
        token: token,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },


  
};
