import bcrypt from 'bcrypt';

let Util = {
    __necessario(req, res, campos, requeridos) {
        const r = { valido: true, c: {} };
        for (const nome of requeridos) {
            let attr = campos[nome];
            let c = req.body[nome] || req.params[nome];

            if (req.user) {
                c = c || req.user[nome];
            }
            if (req.admin) {
                c = c || req.admin[nome];
            }

            if (c == undefined) {
                r.valido = false;
                Util.campoFaltando(res);
                break;
            }
            if (!(attr.validar || t)(c)) {
                r.valido = false;
                (attr.invalido || v)(res, nome);
                break;
            }
            r.c[nome] = c;
        }
        return r;
    },

    generateNecessario(campos) {
        return (req, res, ...requeridos) => Util.__necessario(req, res, campos, requeridos);
    },

    requer(...c) {
        async function handler(req, res, next) {
            let valido = true;
            const t = () => true;
            const v = Util.campoInvalido;

            if (!req.r) {
                req.r = {};
            }

            for (const nome of c) {
                if (req.r[nome] != undefined) continue;

                let info = campos[nome];
                let campo = req.body[nome] || req.params[nome];

                if (req.user) {
                    campo = campo || req.user[nome];
                }
                if (req.admin) {
                    campo = campo || req.admin[nome];
                }

                if (campo == undefined) {
                    valido = false;
                    Util.campoFaltando(res, nome);
                    break;
                }
                if (!(info.validar || t)(campo)) {
                    valido = false;
                    (info.invalido || v)(res, nome);
                    break;
                }
                req.r[nome] = campo;
            }

            if (valido) {
                next();
            }
        }

        return handler;
    },

    async requerParam(req, res, next) {
        await Util.requer(...Object.keys(req.params))(req, res, next);
    },

    async processarSenha(s) {
        return await bcrypt.hash(s, 10);
    },

    async compararSenha(s, hash) {
        return await bcrypt.compare(s, hash);
    },

    campoFaltando(res) {
        Util.erro(res, 'Campo necessário não fornecido');
    },

    senhaInvalida(res) {
        Util.erro(res, 'A nova senha fornecida é inválida');
    },

    campoInvalido(res, campo) {
        Util.requisicaoInvalida(res);
        res.json({ tipo: 'campoInvalido', campo });
    },

    requisicaoInvalida(res) {
        res.status(400);
    },

    erro(res, msg) {
        Util.requisicaoInvalida(res);
        Util.msg(res, msg);
    },

    msg(res, msg) {
        res.json({ tipo: 'msg', msg });
    },

    resposta(res, dados) {
        res.json(dados);
    },

    validarNome(nome) {
        return nome.length > 0;
    },

    validarEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.match(regex);
    },

    validarSenha(senha) {
        if (!senha) return false;
        const tamanho = [...senha].length;
        return tamanho >= 6 && tamanho <= 50;
    },

    validarUrl(url) {
        let u;
        try {
            u = new URL(url);
        } catch (_) {
            return false;
        }

        return u.protocol === 'http:' || u.protocol === 'https:';
    }
}

const campos = {
    nome: { validar: Util.validarNome },
    senha: { validar: Util.validarSenha, invalido: Util.senhaInvalida },
    senhaAntiga: { validar: Util.validarSenha, invalido: Util.senhaInvalida },
    email: { validar: Util.validarEmail },
    url: { validar: Util.validarUrl },
    id: { },
    gid: { },
    lid: { },
    cid: { }
};

export { Util };
