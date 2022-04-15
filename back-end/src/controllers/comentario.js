import { Comentario } from '~/db';
import { Util as u } from '~/util';

let ComentarioController = {
    async criar(req, res) {
        u.resposta(res, await Comentario.create(req.r));
    },

    async encontrar(req, res) {
        u.resposta(res, await Comentario.findByPk(req.r.cid));
    },

    async atualizar(req, res, next) {
        let { texto, cid } = req.r;
        await Comentario.update({ texto }, { where: { cid }});
        next();
    },

    async apagar(req, res) {
        await Comentario.destroy({ where: req.r });
        u.resposta(res, {});
    },

    async listar(req, res) {
        u.resposta(res, await Comentario.findAll({ where: req.r }));
    },

    async comentarioProprio(req, res, next) {
        const link = await Comentario.findAll({ where: req.r });
        if (link) {
            next();
        } else {
            u.erro(res, "Acesso negado");
        }
    }
}

export { ComentarioController };