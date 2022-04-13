import { UsuarioController as UC } from '~/controllers/usuario';
import express from 'express';

const router = express.Router();
const uRouter = express.Router({ mergeParams: true });
const admRouter = express.Router();

router.post('/login', UC.login);
router.post('/registrar', UC.registrar);

router.use('/usuario', UC.usuario, uRouter);
uRouter.get('/', UC.encontrar);
uRouter.put('/', UC.atualizar);
uRouter.put('/senha', UC.atualizarSenha);

router.use('/admin', UC.admin, admRouter);
// admRouter.post('/login', UC.adminLogin);
admRouter.get('/usuarios', UC.todos);
admRouter.get('/usuarios/:id', UC.encontrar);
admRouter.delete('/usuarios/:id', UC.deletar);

export default router;
