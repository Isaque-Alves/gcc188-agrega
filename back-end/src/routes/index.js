import { UsuarioController as UC } from '~/controllers/usuario';
import express from 'express';

const router = express.Router();
// Usuários
router.get('/usuarios', UC.todos);
router.post('/usuarios', UC.registrar);
router.get('/usuarios/:id', UC.encontrar);
router.put('/usuarios/:id', UC.atualizar);
router.put('/usuarios/:id/senha', UC.atualizarSenha);
router.delete('/usuarios/:id', UC.deletar);

export default router;
