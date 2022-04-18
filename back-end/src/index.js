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

(async () => {
    await db.sync({ logging: console.log });
    app.listen(c.BACKEND_PORT);
})();
