import { UniqueConstraintError } from 'sequelize';
import { Usuario, GrupoLink } from '~/db';
import { Util as u } from '~/util';
import crypto from 'crypto';

const exclude = ['senha'];
const attributes = { exclude };

const campos = {
    nome: { validar: u.validarNome },
    senha: { validar: u.validarSenha, invalido: u.senhaInvalida },
    senhaAntiga: { validar: u.validarSenha, invalido: u.senhaInvalida },
    email: { validar: u.validarEmail },
    id: { },
};

const necessario = u.generateNecessario(campos);

const sessoesUsuario = {};
const sessoesAdmin = {};

function gerarToken() {
    return crypto.randomBytes(32).toString('hex');
}

let UsuarioController = {
    async admin(req, res, next) {
        const token = req.cookies['Token'];
        req.admin = sessoesAdmin[token];
        if (req.admin) {
            next();
        } else {
            u.erro(res, 'Não autenticado');
        }
    },

    async usuario(req, res, next) {
        const token = req.cookies['Token'];
        req.user = sessoesUsuario[token];
        if (sessoesAdmin[token] || req.user) {
            next();
        } else {
            u.erro(res, 'Não autenticado');
        }
    },

    async login(req, res) {
        let { email, senha, valido } = necessario(req, res, 'email', 'senha');
        if (!valido) return;

        const us = await Usuario.findOne({ where: { email }});
        if (us && await u.compararSenha(senha, us.senha)) {
            const token = gerarToken();
            sessoesUsuario[token] = us;
            res.cookie('Token', token);
            u.resposta(res, {});
        } else {
            u.erro(res, 'Credenciais incorretas');
        }
    },

    async listar(_req, res) {
        u.resposta(res, await Usuario.findAll({ attributes }));
    },

    async encontrar(req, res) {
        let { id, valido } = necessario(req, res, 'id');
        if (!valido) return;

        u.resposta(res, await Usuario.findByPk(id, { attributes }));
    },

    async registrar(req, res) {
        let { nome, email, senha, valido } = necessario(req, res, 'nome', 'email', 'senha');
        if (!valido) return;

        senha = await u.processarSenha(senha);

        try {
            const us = await Usuario.create({ nome, email, senha });
            await UsuarioController.encontrar({ body: { id: us.id }}, res);
        } catch (e) {
            if (e instanceof UniqueConstraintError) {
                return u.erro(res, 'Email já cadastrado');
            } else {
                console.log(e);
                return u.erro(res, 'Erro desconhecido');
            }
        }
    },

    async atualizar(req, res) {
        let { nome, email, valido } = necessario(req, res, 'nome', 'email', 'id');
        if (!valido) return;

        await Usuario.update({ nome, email }, { where: { id }});
        await UsuarioController.encontrar(req, res);
    },

    async atualizarSenha(req, res) {
        let { senhaAntiga, senha, valido } = necessario(req, res, 'senhaAntiga', 'senha', 'id');
        if (!valido) return;

        const us = await Usuario.findByPk(id);
        if (!(await u.compararSenha(us.senha, senhaAntiga))) {
            return u.erro(res, 'A senha antiga fornecida não é a correta');
        }

        await Usuario.update({ senha }, { where: { id }});
        await UsuarioController.encontrar(req, res);
    },

    async apagar(req, res) {
        let { id, valido } = necessario(req, res, 'id');
        if (!valido) return;

        await Usuario.destroy({ where: { id }});
        u.resposta(res, {});
    }
}

export { UsuarioController };
