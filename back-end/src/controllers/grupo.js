import { GrupoLink } from "~/db";
import { Util as u } from "~/util";

let GrupoLinkController = {
    async encontrar(req, res) {
        u.resposta(res, await GrupoLink.findByPk(req.r.gid));
    },

  async criar(req, res) {
    u.resposta(res, await GrupoLink.create(req.r));
  },

  async atualizar(req, res, next) {
    let { id, gid, nome } = req.r;

    await GrupoLink.update({ nome }, { where: { id, gid } });
    next();
  },

  async apagar(req, res) {
    await GrupoLink.destroy({ where: req.r });
    u.resposta(res, {});
  },

  async listar(req, res) {
    u.resposta(res, await GrupoLink.findAll({ where: req.r }));
  },

  async grupoProprio(req, res, next) {
    const [grupo] = await GrupoLink.findAll({ where: req.r });
    if (grupo) {
      next();
    } else {
      u.erro(res, "Acesso negado");
    }
  },
};

export { GrupoLinkController };
