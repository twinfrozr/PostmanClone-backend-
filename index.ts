import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors"
const collectionRoute = require('./routes/collection')
const requestRoute = require('./routes/requests')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const app: Express = express();

// app.use((req,res,next)=>{
//   res.append('Access-Control-Allow-Origin',['*']);
//   res.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers','Content-Type');
//   next();
// })
const corsConfig:any = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
app.use(cors());

const port = process.env.PORT || 3000;

dotenv.config();
// const app: Express = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json())
app.use('/collection',collectionRoute )
app.use('/requests', requestRoute)
app.use('/user',userRoute)
app.use('/auth',authRoute)


app.get('/', (req: Request, res: Response) => {
  res.send('Server running!');
});



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});


