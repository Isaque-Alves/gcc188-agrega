import { db } from '~/db';
import express from 'express';
import router from '~/routes';
import cookieParser from 'cookie-parser';
import c from '~/config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(cors());
app.use(router);

async function iniciar() {
    await db.sync({ force: c.TEST_MODE === "Y" });
    const server = app.listen(parseInt(c.BACKEND_PORT));
    return { app, server };
}

const appserver = iniciar();

export default appserver;
