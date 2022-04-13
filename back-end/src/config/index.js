import { env } from 'process';

let c = {
    DB_NAME: 'agrega',
    DB_USER: 'root',
    DB_PASSWORD: '',
    DB_DIALECT: 'mysql',
    DB_HOST: 'localhost',

    BACKEND_PORT: 3001,
    BASE_URL_BACKEND: 'http://localhost:3001',
    BASE_URL_FRONTEND: 'http://localhost:3000'
};

Object.keys(c).map((k) => {
    c[k] = env[k] || c[k];
});

export default c;
