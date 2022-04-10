import { Usuario } from '~/db';
import { Util as u } from '~/util';

let UsuarioController = {
    async todos(_req, res) {
        u.resposta(res, await Usuario.findAll());
    },

    async encontrar(req, res) {
        let { id, valido } = u.camposNecessarios(req, ['id']);
        if (!valido) {
            return u.campoFaltando(res);
        }
        u.resposta(res, await Usuario.findByPk(id));
    },

    async registrar(req, res) {
        let { nome, email, senha, valido } = u.camposNecessarios(req, ['nome', 'email', 'senha']);
        if (!valido) {
            return u.campoFaltando();
        }

        if (!u.validarNome(nome)) {
            return u.campoInvalido('nome');
        }

        if (!validarEmail(email)) {
            return u.campoInvalido('email');
        }

        ({ senha, valido } = u.processarSenha(senha));
        if (!valido) {
            return u.senhaInvalida();
        }

        u.resposta(res, await Usuario.create({ nome, email, senha }));
    },

    async atualizar(req, res) {
        let { nome, email, id, valido } = u.camposNecessarios(req, ['nome', 'email', 'id']);
        if (!valido) {
            return u.campoFaltando();
        }

        if (!u.validarNome(nome)) {
            return u.campoInvalido('nome');
        }

        if (!validarEmail(email)) {
            return u.campoInvalido('email');
        }

        await Usuario.update({ nome, email }, { where: { id }});
        UsuarioController.todos(req, res);
    },

    async atualizarSenha(req, res) {
        let { senhaAntiga, senha, id, valido } = u.camposNecessarios(req, ['senhaAntiga', 'senha', 'id']);
        if (!valido) {
            return u.campoFaltando();
        }

        ({ senha, valido } = u.processarSenha(senha));
        if (!valido) {
            return u.senhaInvalida();
        }

        const us = await Usuario.findByPk(id);
        if (!compararSenha(us.senha, senhaAntiga)) {
            return requisicaoInvalidaMsg('A senha antiga fornecida não é a correta');
        }

        await Usuario.update({ senha }, { where: { id }});
        UsuarioController.todos(req, res);
    },

    async deletar(req, res) {
        let { id, valido } = u.camposNecessarios(req, ['id']);
        if (!valido) {
            return u.campoFaltando();
        }

        await Usuario.destroy({ where: { id }});
        u.resposta(res, {});
    }
}

export { UsuarioController };
