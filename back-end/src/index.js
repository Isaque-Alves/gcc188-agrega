import { db } from '~/db';
import express from 'express';
import router from '~/routes';

const app = express();

app.use(express.json());
app.use(router);

(async () => {
    await db.sync({ alter: true, logging: console.log });
    app.listen(3000);
})();
