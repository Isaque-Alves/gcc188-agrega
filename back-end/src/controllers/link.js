import { Link } from '~/db';
import { Util as u } from '~/util';

let LinkController = {
    async encontrar(req, res) {
        console.log(req.r);
        u.resposta(res, await Link.findByPk(req.r.lid));
    },

    async criar(req, res) {
        u.resposta(res, await Link.create(req.r));
    },

    async atualizar(req, res, next) {
        let { nome, url, id, lid } = req.r;
        await Link.update({ nome, url }, { where: { id, lid }});
        next();
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
        const [link] = await Link.findAll({ where: req.r });
        if (link) {
            next();
        } else {
            u.erro(res, "Acesso negado");
        }
    }
}

export { LinkController };
