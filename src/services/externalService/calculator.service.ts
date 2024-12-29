import {inject, injectable} from "inversify";
import {SoapClient} from "../../clients/soap.client";

@injectable()
class CalculatorService {

    constructor(@inject(SoapClient) private soapClient: SoapClient) {
        this.soapClient.setWSDLUrl("http://www.dneonline.com/calculator.asmx?WSDL");
    }

    public calculatorServiceMethods(): Promise<any> {
        return this.soapClient.getMethods();
    }

    public addNumbers(intA: number,intB: number):Promise<number> {
        return this.soapClient.callService('Add',{intA:intA, intB:intB});
    }

    public subtractNumbers(intA: number,intB: number):Promise<number> {
        return this.soapClient.callService('Add',{intA:intA, intB:intB});
    }

    public multipleNumbers(intA: number,intB: number):Promise<number> {
        return this.soapClient.callService('Multiply',{intA:intA, intB:intB});
    }

    public divideNumbers(intA: number,intB: number):Promise<number> {
        return this.soapClient.callService('Divide',{intA:intA, intB:intB});
    }
}

export {CalculatorService};