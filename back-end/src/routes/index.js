import { UsuarioController as UC } from '~/controllers/usuario';
import { GrupoLinkController as GC } from '~/controllers/grupo';
import { LinkController as LC } from '~/controllers/link';
import { ComentarioController as CC } from '~/controllers/comentario';
import { Util as u } from '~/util';

import express from 'express';

const router = express.Router();
const usrRouter = express.Router();
const admRouter = express.Router();

const usrGrpRouter = express.Router({mergeParams: true});
const usrLnkRouter = express.Router({mergeParams: true});

const cmtRouter = express.Router({mergeParams: true});
const lnkRouter = express.Router({mergeParams: true});

router.post('/login', u.requer('email', 'senha'), UC.login);
router.post('/registrar', u.requer('nome', 'email', 'senha'), UC.registrar);

router
    .get('/usuario/:id/grupos', u.requerParam, GC.listar)
    .get('/grupo/:gid', u.requerParam, GC.encontrar)
    .get('/grupo/:gid/links', u.requerParam, LC.listar)
    .use('/link/:lid', u.requerParam, lnkRouter);

lnkRouter
    .get('/', LC.encontrar)
    .get('/comentarios', CC.listar)
    .post('/comentario', UC.usuario, u.requer('texto'), CC.criar)
    .use('/comentario/:cid', UC.usuario, u.requer('id'), u.requerParam, CC.comentarioProprio, cmtRouter);

cmtRouter
    .put('/', UC.naoAdmin, u.requer('texto'), CC.atualizar)
    .delete('/', CC.apagar);

router.use('/usuario', UC.usuario, u.requer('id'), usrRouter);

// /usuario
usrRouter
    .get('/', UC.encontrar)
    .put('/', u.requer('nome', 'email'), UC.atualizar, UC.encontrar)
    .put('/senha', u.requer('senha', 'senhaAntiga'), UC.atualizarSenha, UC.encontrar)
    // /usuario/grupos
    .get('/grupos', GC.listar)
    // /usuario/grupo
    .post('/grupo', u.requer('nome'), GC.criar)
    .use('/grupo/:gid', u.requerParam, GC.grupoProprio, usrGrpRouter)
    .use('/link/:lid', u.requerParam, LC.linkProprio, usrLnkRouter);

usrGrpRouter
    // /usuario/grupo/:gid
    .get('/', GC.encontrar)
    .put('/', u.requer('nome'), GC.atualizar, GC.encontrar)
    .delete('/', GC.apagar)
    // /usuario/grupo/:gid/links
    .get('/links', LC.listar)
    // /usuario/grupo/:gid/link
    .post('/link', u.requer('nome', 'url'), LC.criar);

// /usuario/link/:lid
usrLnkRouter
    .get('/', LC.encontrar)
    .put('/', u.requer('nome', 'url'), LC.atualizar)
    .delete('/', LC.apagar);

router.use('/admin', UC.admin, admRouter);

// /admin/usuarios
admRouter
    .get('/usuarios', UC.listar)
    // /admin/usuario/:id
    .use('/usuario/:id', u.requerParam, usrRouter);

export default router;
