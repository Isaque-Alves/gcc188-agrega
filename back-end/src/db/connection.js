import { Sequelize } from 'sequelize';
import c from '~/config';

const db = new Sequelize(c.DB_NAME, c.DB_USER, c.DB_PASSWORD, { dialect: c.DB_DIALECT, host: c.DB_HOST, logging: c.TEST_MODE !== "Y" });

export default db;
