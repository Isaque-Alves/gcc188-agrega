import { UniqueConstraintError } from 'sequelize';
import { Usuario, GrupoLink } from '~/db';
import { Util as u } from '~/util';
import crypto from 'crypto';

const attributes = { exclude: ['senha'] };

const sessoesUsuario = {};
const sessoesAdmin = {};

function gerarToken() {
    return crypto.randomBytes(32).toString('base64');
}

let UsuarioController = {
    async admin(req, res, next) {
        const token = req.header('Authorization');
        req.admin = sessoesAdmin[token];
        if (req.admin) {
            next();
        } else {
            u.erro(res, 'Não autenticado');
        }
    },

    async usuario(req, res, next) {
        const token = req.header('Authorization');
        req.user = sessoesUsuario[token];
        if (sessoesAdmin[token] || req.user) {
            next();
        } else {
            u.erro(res, 'Não autenticado');
        }
    },

    async naoAdmin(req, res, next) {
        if (!req.admin) {
            next();
        } else {
            u.erro(res, 'Não autenticado');
        }
    },

    async login(req, res) {
        let { email, senha } = req.r;

        const [us] = await Usuario.findAll({ where: { email }});
        if (us) {
            /* if (!us.verificado) {
                u.erro(res, 'Sua conta ainda não foi verificada');
            } else */ if (await u.compararSenha(senha, us.senha)) {
                const token = gerarToken();
                sessoesUsuario[token] = us;
                u.resposta(res, { token });
            }
        } else {
            u.erro(res, 'Credenciais incorretas');
        }
    },

    async listar(_req, res) {
        u.resposta(res, await Usuario.findAll({ attributes }));
    },

    async encontrar(req, res) {
        u.resposta(res, await Usuario.findByPk(req.r.id, { attributes }));
    },

    async registrar(req, res) {
        req.r.senha = await u.processarSenha(req.r.senha);

        try {
            await Usuario.create(req.r);
            u.resposta(res, {});
        } catch (e) {
            if (e instanceof UniqueConstraintError) {
                return u.erro(res, 'Email já cadastrado');
            } else {
                console.log(e);
                return u.erro(res, 'Erro desconhecido');
            }
        }
    },

    async atualizar(req, res, next) {
        let { nome, email, id } = req.r;

        await Usuario.update({ nome, email }, { where: { id }});
        next();
    },

    async atualizarSenha(req, res, next) {
        let { id, senha, senhaAntiga } = req.r;

        const us = await Usuario.findByPk(id);
        if (!(await u.compararSenha(us.senha, senhaAntiga))) {
            return u.erro(res, 'A senha antiga fornecida não é a correta');
        }

        senha = await u.processarSenha(senha);
        await Usuario.update({ senha }, { where: { id }});
        next();
    },

    async apagar(req, res) {
        await Usuario.destroy({ where: req.r });
        u.resposta(res, {});
    }
}

export { UsuarioController };
