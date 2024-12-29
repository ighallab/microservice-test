import {Router, Request, Response} from "express";
import {CalculatorService} from "../services/externalService/calculator.service";
import {container} from "../inversify.config";


const calculatorRoutes: Router = Router();
const calculatorService: CalculatorService = container.get(CalculatorService);


calculatorRoutes.get("/info", (req: Request, res: Response) => {
    calculatorService.calculatorServiceMethods().then((result)=>{
        console.log("Info:  ",result);
        res.status(200).send({"msg":result});
    })
});

calculatorRoutes.post("/add", (req: Request, res: Response) => {
    calculatorService.addNumbers(req.body.intA, req.body.intB).then((result)=>{
        console.log("Add:  ",result);
        res.status(200).send({"msg":result});
    });
});

calculatorRoutes.post("/subtract", (req: Request, res: Response) => {
    calculatorService.subtractNumbers(req.body.intA, req.body.intB).then((result)=>{
        console.log("subtract:  ",result);
        res.status(200).send({"msg":result});
    });
});

calculatorRoutes.post("/multiply", (req: Request, res: Response) => {
    calculatorService.multipleNumbers(req.body.intA, req.body.intB).then((result)=>{
        console.log("multiply:  ",result);
        res.status(200).send({"msg":result});
    });
});

calculatorRoutes.post("/divide", (req: Request, res: Response) => {
    calculatorService.divideNumbers(req.body.intA, req.body.intB).then((result)=>{
        console.log("divide:  ",result);
        res.status(200).send({"msg":result});
    }).catch((err)=>{
        res.status(400).send({"msg":"invalid nominator"});
    });
});

export {calculatorRoutes};