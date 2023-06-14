import {Application, Request, Response} from "express";
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import http from 'http';

const app: Application = express();

app.use(bodyParser.json());

app.route('/api/login')
    .post(loginRoute);

const RSA_PRIVATE_KEY = fs.readFileSync('src/private.key');

export function loginRoute(req: Request, res: Response) {

    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
       const userId = '1';

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: userId
            })

          // send the JWT back to the user
          // TODO - multiple options available
          res.cookie("SESSIONID", jwtBearerToken, {httpOnly:false, secure:false});
          res.sendStatus(200);
    }else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
}

const server = http.createServer(app);
server.listen(3000);