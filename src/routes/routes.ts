import {Router} from "express";
import authRouter from "./auth.route";
import {tokenValidate} from "../middleware/token.validate";
import {calculatorRoutes} from "./calculator.route";
import {requestValidator} from "../middleware/validator.middleware";


const routes: Router = Router();

//Authentication route [Login/Register/Validate]
routes.use('/auth', authRouter);

//calculator service routes
routes.use('/calculator', tokenValidate, requestValidator('calculator'), calculatorRoutes);

export {routes};