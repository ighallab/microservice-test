import express, {Application} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {routes} from "./routes/routes";
import config from "config";

const app: Application = express();
// const configurations: any = config.get("server");
process.env.NODE_ENV = process.env.NODE_ENV || 'development';



/*
*   parse body plain to json body in Request Object
* */
app.use(bodyParser.json());

/*
*   Cross Origin
* */
app.use(cors());

/*
*   Register App Routes
* */
app.use('/api',routes);

app.listen(4444,()=>{
    console.log(
        `Server running on URL : http://localhost:4444`);
});