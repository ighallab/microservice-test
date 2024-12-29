import {Router, Response, Request} from "express";
import {AuthController} from "../controllers/authController/auth.controller";
import {container} from "../inversify.config";
import {extendToken, tokenValidate} from "../middleware/token.validate";
import {requestValidator} from "../middleware/validator.middleware";

const authRouter: Router = Router();
const authController: AuthController = container.get(AuthController);

authRouter.post('/login',requestValidator('login'),(req: Request, res: Response)=>{
    let result: string | null = authController.login(req.body.email,req.body.password);
    if(result){
        res.status(200).send(result);
    }else{
        res.status(400).send({"msg":"Invalid Access to the API!!"});
    }
});

authRouter.post('/validate',tokenValidate,(req: Request, res: Response)=>{
    res.status(200).send({"msg":"Welcome to the API!!"});
});

authRouter.post('/token/extend',tokenValidate, extendToken,(req: Request, res: Response)=>{
    if(res.locals.extendedToken){
        res.status(200).send({"msg":"Welcome to the API!!",token:res.locals.extendedToken});
    }else{
        res.status(401).send({"msg":"Error Happened, please try again!!"});
    }
});

authRouter.post('/register',requestValidator('register'),(req: Request, res: Response)=>{
    res.status(200).send({"msg":"Registered Successfully... Welcome to the API!!"});
});

export default authRouter;