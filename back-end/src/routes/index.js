import { UsuarioController as UC } from '~/controllers/usuario';
import { GrupoLinkController as GC } from '~/controllers/grupos';
import express from 'express';

const router = express.Router();
const usrRouter = express.Router();
const admRouter = express.Router();

const usrGrpRouter = express.Router({mergeParams: true});

router.post('/login', UC.login);
router.post('/registrar', UC.registrar);

router.get('/usuario/:id/grupos', GC.listar);
router.get('/usuario/:id/grupo/:gid', GC.encontrar)

router.use('/usuario', UC.usuario, usrRouter);
usrRouter.get('/', UC.encontrar);
usrRouter.put('/', UC.atualizar);
usrRouter.put('/senha', UC.atualizarSenha);
usrRouter.get('/grupos', GC.listar);
usrRouter.post('/grupo', GC.criar);
usrRouter.use('/grupo/:gid', GC.grupoProprio, usrGrpRouter);
usrGrpRouter.get('/', GC.encontrar);
usrGrpRouter.put('/', GC.atualizar);
usrGrpRouter.delete('/', GC.apagar);

router.use('/admin', UC.admin, admRouter);
// admRouter.post('/login', UC.adminLogin);
admRouter.get('/usuarios', UC.listar);
admRouter.get('/usuario/:id', UC.encontrar);
admRouter.delete('/usuario/:id', UC.apagar);

export default router;
