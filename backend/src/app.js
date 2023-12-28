import express from "express";
import cors from "cors";
import usuarioRouter from './routers/usuarioRouter.js';
import medicoRouter from './routers/medicoRouter.js';
import mantenedorRouter from './routers/mantenedorRouter.js';
import citaRouter from './routers/citaRouter.js';
import authRouter from './routers/authRouter.js';
import mailRouter from './routers/mailRouter.js';
import pagoRouter from './routers/pagoRouter.js';
const whiteList=['http://localhost:4200','http://pacheco.chillan.ubiobio.cl:81'];
const app = express();

// middleware

app.use(cors({origin:whiteList}));
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-kev. x-client-token. x-client-secret, Authorization");
    next()
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(usuarioRouter);
app.use(medicoRouter);
app.use(mantenedorRouter);
app.use(citaRouter);
app.use(authRouter);
app.use(mailRouter);
app.use(pagoRouter);

export default app;