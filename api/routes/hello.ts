import {Express} from "express";

const helloRoute = (app: Express) => {
    // @ts-ignore
    let get = app.get('/hello', (req, res) => {


        return res.status(200).send('Hello world !');

    });
}

export default helloRoute;