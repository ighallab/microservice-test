import * as soap from 'soap';
import * as fs from 'fs';
import * as path from 'path';
import {injectable} from "inversify";

@injectable()
class SoapClient {
    private wsdlUrl: string = '';
    private client: soap.Client | null = null;

    constructor() {}


    // initialize the SOAP client with the provided WSDL URL or file
    private async initializeClient(): Promise<soap.Client> {
        if (!this.client) {
            let wsdlContent: string;
            // Check if path to a file or a URL
            if (this.wsdlUrl.startsWith('http') || this.wsdlUrl.startsWith('https')) {
                wsdlContent = this.wsdlUrl;
            } else {
                // read the file content
                wsdlContent = fs.readFileSync(path.resolve(this.wsdlUrl), 'utf8');
            }
            this.client = await soap.createClientAsync(wsdlContent);
        }
        return this.client;
    }

    //method to invoke a SOAP service method
    public async callService(methodName: string, args: any): Promise<any> {
        try {
            const client = await this.initializeClient();
            return new Promise((resolve:any, reject:any) => {
                client[methodName](args, (err:any, result:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (error: any) {
            console.log("before error");
            throw new Error(`SOAP service call failed: ${error.message}`);
        }
    }

    //method to get the available methods and their input parameters from the WSDL
    public async getMethods(): Promise<any> {
        try {
            const client = await this.initializeClient();
            const serviceDescription = client.describe();

            const methods: { [methodName: string]: any } = {};

            // Loop through the services and ports to find methods
            for (const serviceName in serviceDescription) {
                const service = serviceDescription[serviceName];
                for (const portName in service) {
                    const port = service[portName];
                    for (const methodName in port) {
                        const method = port[methodName];
                        methods[methodName] = method.input;
                    }
                }
            }

            return methods;
        } catch (error: any) {
            throw new Error(`Failed to retrieve methods from WSDL: ${error.message}`);
        }
    }

    public setWSDLUrl(url: string) {
        this.wsdlUrl = url;
    }
    public getWSDLUrl(url: string) {
        this.wsdlUrl = url;
    }
}

export {SoapClient};
