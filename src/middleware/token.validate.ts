import {Response, Request, NextFunction} from 'express';
import {container} from "../inversify.config";
import {JwtService} from "../services/authService/jwt.service";

const tokenValidate:any = (
    req:Request,res:Response, next: NextFunction
)=>{

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send({ msg: "Authorization header missing" });
    }

    const token = authorizationHeader.split(' ')[1]; // "Bearer <token>"
    if (!token) {
        return res.status(401).send({ msg: "Token missing" });
    }

    try {
        const jwtService: JwtService = container.get(JwtService);
        const result =  jwtService.validateToken(token);
        if (!result) {
            return res.status(401).send({ msg: "Invalid token" });
        }
        return next();
    } catch (error: any) {
        console.error("Error validating token:", error);
        return res.status(500).send({ msg: "Internal server error" });
    }
}

const extendToken: any = (
    req:Request,res:Response, next: NextFunction
)=>{

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send({ msg: "Authorization header missing" });
    }

    const token = authorizationHeader.split(' ')[1]; // "Bearer <token>"
    if (!token) {
        return res.status(401).send({ msg: "Token missing" });
    }

    try {
        const jwtService: JwtService = container.get(JwtService);
        const result =  jwtService.extendTokenExpiry(token,'1h');
        if (!result) {
            return res.status(401).send({ msg: "Invalid token" });
        }
        //set tokens to res locals
        res.locals.extendedToken= result;
        return next();
    } catch (error: any) {
        console.error("Error Extending token:", error);
        return res.status(500).send({ msg: "Internal server error" });
    }
}

export {tokenValidate, extendToken};