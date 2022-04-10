import bcrypt from 'bcrypt';

let Util = {
    camposNecessarios(req, campos) {
        const c = { valido: true };
        for (var campo in campos) {
            if (req.body[campo] === undefined) c.valido = false;
            c[campo] = req.body[campo] || req.params[campo];
        }
        return c;
    },

    async processarSenha(s) {
        const c = { valido: true };
        if (!Util.validarSenha(s)) {
            c.valido = false;
            return;
        }
        const senha = await bcrypt.hash(s, 10);
        c.senha = senha;
        return c;
    },

    async compararSenha(s, hash) {
        return await bcrypt.compare(s, hash);
    },

    campoFaltando(res) {
        Util.requisicaoInvalidaMsg(res, 'Campo necessário não fornecido');
    },

    senhaInvalida(res) {
        Util.requisicaoInvalidaMsg(res, 'Nova senha fornecida é inválida');
    },

    campoInvalido(res, campo) {
        Util.requisicaoInvalida(res);
        res.json(res, { tipo: 'campoInvalido', campo });
    },

    requisicaoInvalida(res) {
        res.status(400);
    },

    requisicaoInvalidaMsg(res, msg) {
        Util.requisicaoInvalida(res);
        Util.msg(res, msg);
    },

    msg(res, msg) {
        res.json({ tipo: 'msg', msg });
    },

    resposta(res, dados) {
        if (Array.isArray(dados)) {
            for (let d of dados) {
                delete d.senha;
            }
        }
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
