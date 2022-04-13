import { UniqueConstraintError } from 'sequelize';
import { GrupoLink } from '~/db';
import { Util as u } from '~/util';

let GruposController = {
    async todos(_req, res) {
        u.resposta(res, await GrupoLink.findAll({ attributes: { exclude }}));
    },

    async encontrar(req, res) {
        let { id } = u.camposNecessarios(req, ['id']);
        u.resposta(res, await GrupoLink.findByPk(id, { attributes: { exclude }}));
    },

    async registrar(req, res) {
        let { nome } = u.camposNecessarios(req, ['nome']);

        if (!u.validarNome(nome)) {
            return u.campoInvalido(res, 'nome');
        }

        try {
            const us = await GrupoLink.create({ nome });
            await GrupoLinkController.encontrar({ body: { id: us.id }}, res);
        } catch (e) {
            console.log(e);
            return u.requisicaoInvalidaMsg(res, 'Erro desconhecido');
        }
    },

    async atualizar(req, res) {
        let { nome } = u.camposNecessarios(req, ['nome']);

        if (!u.validarNome(nome)) {
            return u.campoInvalido(res, 'nome');
        }

        await GrupoLink.update({ nome }, { where: { id }});
        await GrupoLinkController.encontrar(req, res);
    },

    async deletar(req, res) {
        let { id } = u.camposNecessarios(req, ['id']);

        await GrupoLink.destroy({ where: { id }});
        u.resposta(res, {});
    }
}

export { GrupoLinkController };
