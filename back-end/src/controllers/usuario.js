import { Usuario } from '~/db';
import { Util as u } from '~/util';

const exclude = ['senha'];

let UsuarioController = {
    async todos(_req, res) {
        u.resposta(res, await Usuario.findAll({ attributes: { exclude }}));
    },

    async encontrar(req, res) {
        let { id, valido } = u.camposNecessarios(req, ['id']);
        if (!valido) {
            return u.campoFaltando(res);
        }
        u.resposta(res, await Usuario.findByPk(id, { attributes: { exclude }}));
    },

    async registrar(req, res) {
        let { nome, email, senha, valido } = u.camposNecessarios(req, ['nome', 'email', 'senha']);
        if (!valido) {
            return u.campoFaltando(res);
        }

        if (!u.validarNome(nome)) {
            return u.campoInvalido(res, 'nome');
        }

        if (!u.validarEmail(email)) {
            return u.campoInvalido(res, 'email');
        }

        ({ senha, valido } = await u.processarSenha(senha));
        if (!valido) {
            return u.senhaInvalida(res);
        }

        const us = await Usuario.create({ nome, email, senha });
        await UsuarioController.encontrar({ body: { id: us.id }}, res);
    },

    async atualizar(req, res) {
        let { nome, email, id, valido } = u.camposNecessarios(req, ['nome', 'email', 'id']);
        if (!valido) {
            return u.campoFaltando(res);
        }

        if (!u.validarNome(nome)) {
            return u.campoInvalido(res, 'nome');
        }

        if (!u.validarEmail(email)) {
            return u.campoInvalido(res, 'email');
        }

        await Usuario.update({ nome, email }, { where: { id }});
        await UsuarioController.encontrar(req, res);
    },

    async atualizarSenha(req, res) {
        let { senhaAntiga, senha, id, valido } = u.camposNecessarios(req, ['senhaAntiga', 'senha', 'id']);
        if (!valido) {
            return u.campoFaltando(res);
        }

        ({ senha, valido } = await u.processarSenha(senha));
        if (!valido) {
            return u.senhaInvalida(res);
        }

        const us = await Usuario.findByPk(id);
        if (!compararSenha(us.senha, senhaAntiga)) {
            return requisicaoInvalidaMsg('A senha antiga fornecida não é a correta');
        }

        await Usuario.update({ senha }, { where: { id }});
        await UsuarioController.encontrar(req, res);
    },

    async deletar(req, res) {
        let { id, valido } = u.camposNecessarios(req, ['id']);
        if (!valido) {
            return u.campoFaltando(res);
        }

        await Usuario.destroy({ where: { id }});
        u.resposta(res, {});
    }
}

export { UsuarioController };
