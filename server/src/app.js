import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/auth.routes.js";

const PORT = process.env.PORT || 8081;
const COOKIE_SIGN = process.env.COOKIE_SIGN || 'firmascookieserver'
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SIGN));

app.use(
  cors({
    origin: "http://localhost:8081/", // Especifica el origen permitido
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permite que las cookies sean enviadas y recibidas
  })
);

app.use('/api/auth',authRouter)
app.listen(PORT,()=>{
    console.log(`Server rodando en PORT ${PORT}`)
})

