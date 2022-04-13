import bcrypt from 'bcrypt';

let Util = {
    __necessario(req, res, campos, requeridos) {
        const r = { valido: true };
        const t = () => true;
        const v = Util.campoInvalido;
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
            r[nome] = c;
        }
        return r;
    },

    generateNecessario(campos) {
        return (req, res, ...requeridos) => Util.__necessario(req, res, campos, requeridos);
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
    }
}

export { Util };
