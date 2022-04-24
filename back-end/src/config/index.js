import { env } from "process";

let vars = [
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'DB_DIALECT',
    'DB_HOST',

    'BACKEND_PORT',
    'BASE_URL_BACKEND',
    'BASE_URL_FRONTEND',

    'TEST_MODE'
];

let c = {};

for (const nome of vars) {
    c[nome] = env[nome];
}

export default c;
