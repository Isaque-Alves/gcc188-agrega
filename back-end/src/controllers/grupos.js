import { GrupoLink } from '~/db';
import { Util as u } from '~/util';

const campos = {
    nome: { validar: u.validarNome },
    id: { },
    gid: { }
};

const necessario = u.generateNecessario(campos);

let GrupoLinkController = {
    async encontrar(req, res) {
        let { id, gid, valido } = necessario(req, res, 'id', 'gid');
        if (!valido) return;

        u.resposta(res, await GrupoLink.findOne({ id, gid }));
    },

    async criar(req, res) {
        let { id, nome, valido } = necessario(req, res, 'id', 'nome');
        if (!valido) return;

        const gl = await GrupoLink.create({ id, nome })
        u.resposta(res, gl);
    },

    async atualizar(req, res) {
        let { id, gid, nome, valido } = necessario(req, res, 'id', 'gid', 'nome');
        if (!valido) return;

        await GrupoLink.update({ nome }, { where: { id, gid }});
        await GrupoLinkController.encontrar(req, res);
    },

    async apagar(req, res) {
        let { id, gid, valido } = necessario(req, res, 'id', 'gid');
        if (!valido) return;

        await GrupoLink.destroy({ where: { id, gid }});
        u.resposta(res, {});
    },

    async listar(req, res) {
        let { id, valido } = necessario(req, res, 'id');
        if (!valido) return;

        const grupos = await GrupoLink.findAll({ where: { id }});
        u.resposta(res, grupos);
    },

    async grupoProprio(req, res, next) {
        let { id, gid, valido } = necessario(req, res, 'id', 'gid');
        if (!valido) return;

        const grupo = await GrupoLink.findOne({ where: { id, gid }});
        if (grupo) {
            next();
        } else {
            u.erro(res, "Acesso negado");
        }
    }
}

export { GrupoLinkController };
