import { UsuarioController as UC } from '~/controllers/usuario';
import { GrupoLinkController as GC } from '~/controllers/grupo';
import { LinkController as LC } from '~/controllers/link';
import { Util as u } from '~/util';

import express from 'express';

const router = express.Router();
const usrRouter = express.Router();
const admRouter = express.Router();

const usrGrpRouter = express.Router({mergeParams: true});
const usrLnkRouter = express.Router({mergeParams: true});

router.post('/login', u.requer('email', 'senha'), UC.login);
router.post('/registrar', u.requer('nome', 'email', 'senha'), UC.registrar);

router.get('/usuario/:id/grupos', u.requerParam, GC.listar);
router.get('/grupo/:gid', u.requerParam, GC.encontrar);
router.get('/grupo/:gid/links', u.requerParam, LC.listar);
router.get('/link/:lid', u.requerParam, LC.encontrar);

router.use('/usuario', UC.usuario, u.requer('id'), usrRouter);
{
    // /usuario
    usrRouter.get('/', UC.encontrar);
    usrRouter.put('/', u.requer('nome', 'email'), UC.atualizar, UC.encontrar);
    usrRouter.put('/senha', u.requer('senha', 'senhaAntiga'), UC.atualizarSenha, UC.encontrar);

    // /usuario/grupos
    usrRouter.get('/grupos', GC.listar);
    // /usuario/grupo
    usrRouter.post('/grupo', u.requer('nome'), GC.criar);
    usrRouter.use('/grupo/:gid', u.requerParam, GC.grupoProprio, usrGrpRouter);
    {
        // /usuario/grupo/:gid
        usrGrpRouter.get('/', GC.encontrar);
        usrGrpRouter.put('/', u.requer('nome'), GC.atualizar, GC.encontrar);
        usrGrpRouter.delete('/', GC.apagar);

        // /usuario/grupo/:gid/links
        usrGrpRouter.get('/links', LC.listar);
        // /usuario/grupo/:gid/link
        usrGrpRouter.post('/link', u.requer('nome', 'url'), LC.criar);
    }

    usrRouter.use('/link/:lid', u.requerParam, LC.linkProprio, usrLnkRouter);
    {
        // /usuario/link/:lid
        usrLnkRouter.get('/', LC.encontrar);
        usrLnkRouter.put('/', u.requer('nome', 'url'), LC.atualizar);
        usrLnkRouter.delete('/', LC.apagar);
    }
}

router.use('/admin', UC.admin, admRouter);
{
    // admRouter.post('/login', UC.adminLogin);
    // /admin/usuarios
    admRouter.get('/usuarios', UC.listar);

    // /admin/usuario/:id
    admRouter.use('/usuario/:id', usrRouter);
}

export default router;
