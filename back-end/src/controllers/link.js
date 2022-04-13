import { Link } from '~/db';
import { Util as u } from '~/util';

let LinkController = {
    async encontrar(req, res) {
        u.resposta(res, await Link.findOne(req.r));
    },

    async criar(req, res) {
        const gl = await Link.create(req.r);
        u.resposta(res, gl);
    },

    async atualizar(req, res) {
        let { nome, url, id, gid, lid } = req.r;
        await Link.update({ nome, url }, { where: { id, gid, lid }});
    },

    async apagar(req, res) {
        await Link.destroy({ where: req.r });
        u.resposta(res, {});
    },

    async listar(req, res) {
        const links = await Link.findAll({ where: req.r });
        u.resposta(res, links);
    },

    async linkProprio(req, res, next) {
        const link = await Link.findOne({ where: req.r });
        if (link) {
            next();
        } else {
            u.erro(res, "Acesso negado");
        }
    }
}

export { LinkController };
