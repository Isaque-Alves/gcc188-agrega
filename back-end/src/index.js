import { db } from '~/db';
import express from 'express';
import router from '~/routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);

(async () => {
    await db.sync({ logging: console.log });
    app.listen(3000);
})();
