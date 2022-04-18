import iniciar from '~/index';
import request from 'supertest';
import { expect } from 'chai';

var app;

before(async function() {
    this.timeout(10000);
    app = await iniciar();
})

describe('Testes', function() {
    it('registra um usuário', async function() {
        const res = await request(app)
            .post('/registrar')
            .send({ nome: 'Usuario Teste', email: 'usuario@example.com', senha: 'teste123' })
        expect(res.status).to.equal(200);
    })

    it('registra outro usuário', async function() {
        const res = await request(app)
            .post('/registrar')
            .send({ nome: 'Segundo Usuario Teste', email: 'usuario2@example.com', senha: 'teste1234' })
        expect(res.status).to.equal(200);
    })

    let token, token2;

    it('loga como usuário', async function() {
        const res = await request(app)
            .post('/login')
            .send({ email: 'usuario@example.com', senha: 'teste123' });
        expect(res.body).to.have.property('token');
        token = res.body.token;
    })

    it('loga como outro usuário', async function() {
        const res = await request(app)
            .post('/login')
            .send({ email: 'usuario2@example.com', senha: 'teste1234' });
        expect(res.body).to.have.property('token');
        token2 = res.body.token;
    })

    it('verifica se dados estão corretos', async function() {
        const res = await request(app)
            .get('/usuario')
            .set('Authorization', token)
            .send();
        expect(res.body).to.include.all.keys('id', 'nome', 'email');
        expect(res.body).to.not.have.key('senha');
        expect(res.body.id).to.equal(1);
        expect(res.body.nome).to.equal('Usuario Teste');
        expect(res.body.email).to.equal('usuario@example.com');
    })

    let gid, gid2;
    it('cria um grupo de links', async function() {
        const res = await request(app)
            .post('/usuario/grupo')
            .set('Authorization', token)
            .send({ nome: 'grupo de teste' })
        expect(res.body).to.include.all.keys('id', 'gid', 'nome');
        gid = res.body.gid;
    })

    it('cria outro grupo de links', async function() {
        const res = await request(app)
            .post('/usuario/grupo')
            .set('Authorization', token)
            .send({ nome: 'segundo grupo de teste' })
        expect(res.body).to.include.all.keys('id', 'gid', 'nome');
        gid2 = res.body.gid;
    })

    it('lista grupos de links', async function() {
        const res = await request(app)
            .get('/usuario/grupos')
            .set('Authorization', token)
            .send()
        expect(res.body).to.have.lengthOf(2);
    })

    it('edita nome do grupo de links', async function() {
        const res = await request(app)
            .put(`/usuario/grupo/${gid2}`)
            .set('Authorization', token)
            .send({ nome: 'grupo de teste, mas editado' })
        expect(res.body).to.include.all.keys('id', 'gid', 'nome');
        expect(res.body.nome).to.equal('grupo de teste, mas editado')
    })

    it('deleta grupo de links', async function() {
        const res = await request(app)
            .delete(`/usuario/grupo/${gid2}`)
            .set('Authorization', token)
            .send()
        expect(res.status).to.equal(200)
    })

    let lid, lid2;
    it('adiciona link a um grupo de links', async function() {
        const res = await request(app)
            .post(`/usuario/grupo/${gid}/link`)
            .set('Authorization', token)
            .send({ nome: 'google', url: 'https://google.com' })
        expect(res.body).to.include.all.keys('id', 'gid', 'lid', 'nome', 'url');
        lid = res.body.lid;
    })

    it('adiciona outro link a um grupo de links', async function() {
        const res = await request(app)
            .post(`/usuario/grupo/${gid}/link`)
            .set('Authorization', token)
            .send({ nome: 'facebook', url: 'https://facebook.com' })
        expect(res.body).to.include.all.keys('id', 'gid', 'lid', 'nome', 'url');
        lid2 = res.body.lid;
    })

    it('tenta criar link inválido', async function() {
        const res = await request(app)
            .post(`/usuario/grupo/${gid}/link`)
            .set('Authorization', token)
            .send({ nome: 'asdf', url: 'javascript:void(0)' })
        expect(res.status).to.equal(400);
    })

    it('lista links', async function() {
        const res = await request(app)
            .get(`/usuario/grupo/${gid}/links`)
            .set('Authorization', token)
            .send()
        expect(res.status).to.equal(200);
        expect(res.body).to.have.lengthOf(2);
    })

    it('apaga link', async function() {
        const res = await request(app)
            .delete(`/usuario/link/${lid2}`)
            .set('Authorization', token)
            .send()
        expect(res.status).to.equal(200);
    })

    it('tenta apagar link do outro usuário', async function() {
        const res = await request(app)
            .delete(`/usuario/link/${lid}`)
            .set('Authorization', token2)
            .send()
        expect(res.status).to.equal(400);
    })

    let cid, cid2;
    it('comenta em um link', async function() {
        const res = await request(app)
            .post(`/usuario/link/${lid}/comentario`)
            .set('Authorization', token)
            .send({ texto: 'lorem ipsum' })
        expect(res.status).to.equal(200);
        expect(res.body).to.contain.all.keys('id', 'lid', 'cid', 'texto');
        expect(res.body.texto).to.equal('lorem ipsum');
        cid = res.body.cid;
    })

    it('outro usuário comenta em um link', async function() {
        const res = await request(app)
            .post(`/usuario/link/${lid}/comentario`)
            .set('Authorization', token2)
            .send({ texto: 'dolor sit amet' })
        expect(res.status).to.equal(200);
        expect(res.body).to.contain.all.keys('id', 'lid', 'cid', 'texto');
        expect(res.body.texto).to.equal('dolor sit amet');
        cid2 = res.body.cid;
    })

    it('lista comentários', async function() {
        const res = await request(app)
            .get(`/link/${lid}/comentarios`)
            .send()
        expect(res.status).to.equal(200);
        expect(res.body).to.have.lengthOf(2);
    })

    it('edita comentário do usuário', async function() {
        const res = await request(app)
            .put(`/usuario/link/${lid}/comentario/${cid}`)
            .set('Authorization', token)
            .send({ texto: 'lorem ipsum!' })
        expect(res.status).to.equal(200);
        expect(res.body).to.contain.all.keys('id', 'lid', 'cid', 'texto');
        expect(res.body.texto).to.equal('lorem ipsum!');
    })

    it('tenta editar comentário de outro usuário', async function() {
        const res = await request(app)
            .put(`/usuario/link/${lid}/comentario/${cid}`)
            .set('Authorization', token2)
            .send({ texto: 'lorem ipsum?' })
        expect(res.status).to.equal(400);
    })
})
