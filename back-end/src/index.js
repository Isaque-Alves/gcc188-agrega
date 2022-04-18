import { db } from '~/db';
import express from 'express';
import router from '~/routes';
import cookieParser from 'cookie-parser';
import c from '~/config';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);

async function iniciar() {
    await db.sync({ logging: console.log, force: c.TEST_MODE == "Y" });
    app.listen(parseInt(c.BACKEND_PORT));
    return app;
}

export default iniciar;
