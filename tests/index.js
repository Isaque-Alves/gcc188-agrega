import { expect } from 'chai';
import { Builder, By, Capabilities, Key } from 'selenium-webdriver';

const BASE = process.env.URL_FRONTEND;

function url(a) {
    return BASE + a;
}

const navegadores = [
    Capabilities.firefox()
]

for (const navegador of navegadores) {
    describe(`Testes de sistema para ${navegador.getBrowserName()}`, function() {
        this.timeout(5000);
        var driver;
        var nome, email, senha;

        before(async function() {
            this.timeout(100000);
            driver = new Builder().withCapabilities(navegador).build();
            await driver.get(BASE);
        })

        beforeEach(async function() {
            await driver.sleep(500);
        })

        it('registra um usuário', async function() {
            await driver.get(url('/registrar'));
            nome = navegador.getBrowserName();
            email = nome + '@example.com';
            senha = nome + '123';
            await driver.findElement(By.name('name')).sendKeys(nome);
            await driver.findElement(By.name('email')).sendKeys(email);
            await driver.findElement(By.name('password')).sendKeys(senha);
            await driver.findElement(By.name('confirmPassword')).sendKeys(senha, Key.RETURN);
        })

        it('loga no sistema', async function() {            
            expect(await driver.getCurrentUrl()).to.equal(url('/login'))
            await driver.get(url('/login'));
            await driver.findElement(By.name('email')).sendKeys(email);
            await driver.findElement(By.name('password')).sendKeys(senha, Key.RETURN);
        })
        
        var nomeGrupo;
        it('cria grupo de link', async function() {
            expect(await driver.getCurrentUrl()).to.equal(url('/home'))
            nomeGrupo = 'grupo ' + nome;
            await driver.findElement(By.name('nome')).sendKeys(nomeGrupo, Key.RETURN);

            await driver.sleep(500);
            var encontrado = await driver.findElement(By.id('nome-grupo')).getText() === nomeGrupo;
            expect(encontrado).to.be.true;
        })

        it('edita nome do grupo', async function() {
            await driver.findElement(By.id('editar')).click();
            const [_primeiro, e] = await driver.findElements(By.name('nome'));
            await e.clear();

            nomeGrupo = 'teste ' + nomeGrupo;
            await e.sendKeys(nomeGrupo, Key.RETURN);
            await driver.sleep(500);

            var encontrado = await driver.findElement(By.id('nome-grupo')).getText() === nomeGrupo;
            expect(encontrado).to.be.true;
        })

        var nomeGrupo2;
        it('cria outro grupo', async function() {
            nomeGrupo2 = 'grupo ' + nome + ' 2';
            await driver.findElement(By.name('nome')).sendKeys(nomeGrupo2, Key.RETURN);
            await driver.sleep(500);
            expect(await driver.findElements(By.id('nome-grupo'))).to.have.lengthOf(2);
        })

        it('apaga último grupo', async function() {
            const [_primeiro, e] = await driver.findElements(By.id('excluir'));
            await e.click();
            await driver.sleep(500);
            expect(await driver.findElements(By.id('nome-grupo'))).to.have.lengthOf(1);
        })

        var nomeLink, urlLink;
        it('adiciona link ao grupo', async function() {
            await driver.findElement(By.id('acessar')).click();
            await driver.sleep(500);
            nomeLink = 'teste link ' + nome;
            urlLink = 'http://example.com/' + nome;
            await driver.findElement(By.name('nome')).sendKeys(nomeLink);
            await driver.findElement(By.name('url')).sendKeys(urlLink, Key.RETURN);

            await driver.sleep(500);
            var encontrado = await driver.findElement(By.id('nome')).getText() === nomeLink;
            expect(encontrado).to.be.true;
        })

        it('edita atributos do link', async function() {
            nomeLink = 'teste link ' + nome + ' editado';
            urlLink = 'http://example.com/editado/' + nome;
            await driver.findElement(By.id('editar')).click();
            await driver.sleep(500);

            const [_primeiro, enome] = await driver.findElements(By.name('nome'));
            const [_primeiro1, eurl] = await driver.findElements(By.name('url'));
            await enome.clear();
            await eurl.clear();
            await enome.sendKeys(nomeLink);
            await eurl.sendKeys(urlLink, Key.RETURN);

            await driver.sleep(500);
            var encontrado = await driver.findElement(By.id('nome')).getText() === nomeLink;
            expect(encontrado).to.be.true;
        })

        var nomeLink2;
        it('adiciona outro link', async function() {
            nomeLink2 = 'teste link 2 ' + nome;
            urlLink = 'http://example.com/2/' + nome;
            await driver.findElement(By.name('nome')).sendKeys(nomeLink2);
            await driver.findElement(By.name('url')).sendKeys(urlLink, Key.RETURN);

            await driver.sleep(500);
            expect(await driver.findElements(By.id('nome'))).to.have.lengthOf(2);
        })

        it('apaga último link', async function() {
            const [_primeiro, e] = await driver.findElements(By.id('excluir'));
            await e.click();
            await driver.sleep(500);
            expect(await driver.findElements(By.id('nome'))).to.have.lengthOf(1);
        })

        var texto;
        it('comenta no link', async function() {
            await driver.findElement(By.id('acessar')).click();
            await driver.sleep(500);

            texto = 'Comentário do ' + nome;
            await driver.findElement(By.name('texto')).sendKeys(texto);
            await driver.findElement(By.id('comentar')).click();

            await driver.sleep(500);
            var encontrado = await driver.findElement(By.id('texto')).getText() === texto;
            expect(encontrado).to.be.true;
        })

        it('edita comentário', async function() {
            await driver.findElement(By.id('editar')).click();
            await driver.sleep(500);

            const e = await driver.findElement(By.name('nome'));
            await e.clear();

            texto += ' editado';
            await e.sendKeys(texto, Key.RETURN);
            await driver.sleep(500);

            var encontrado = await driver.findElement(By.id('texto')).getText() === texto;
            expect(encontrado).to.be.true;
        })

        it('comenta novamente no link', async function() {
            texto = 'Comentário 2 do ' + nome;
            await driver.findElement(By.name('texto')).sendKeys(texto);
            await driver.findElement(By.id('comentar')).click();

            await driver.sleep(500);
            expect(await driver.findElements(By.id('texto'))).to.have.lengthOf(2);
        })

        it('apaga último comentário', async function() {
            const [_primeiro, e] = await driver.findElements(By.id('excluir'));
            await e.click();

            expect(await driver.findElements(By.id('texto'))).to.have.lengthOf(1);
        })

        after(async function() {
            await driver.close();
        })
    })
}
