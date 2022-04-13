import { env } from 'process';

let c = {
    DB_NAME: 'agrega',
    DB_USER: 'root',
    DB_PASSWORD: '',
    DB_DIALECT: 'mysql',
    DB_HOST: 'localhost',
};

Object.keys(c).map((k) => {
    c[k] = env[k] || c[k];
});

export default c;