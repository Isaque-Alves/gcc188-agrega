import { db } from "~/db";

(async () => {
    await db.sync({ alter: true, logging: console.log });
})();
