import { Container } from 'inversify';
import {JwtService}  from "./services/authService/jwt.service";
import {AuthController} from "./controllers/authController/auth.controller";
import {SoapClient} from "./clients/soap.client";
import {CalculatorService} from "./services/externalService/calculator.service";
const container = new Container();

// Registering the classes with Inversify
container.bind<JwtService>(JwtService).toSelf();
container.bind<AuthController>(AuthController).toSelf();
container.bind<SoapClient>(SoapClient).toSelf();
container.bind<CalculatorService>(CalculatorService).toSelf();

export { container };
