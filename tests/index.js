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
        })

        it('verifica se grupo foi criado', async function() {
            const elementos = await driver.findElements(By.id('nome-grupo'));
            var encontrado = false;
            for (const elemento of elementos) {
                if (await elemento.getText() === nomeGrupo) encontrado = true;
            }
            expect(encontrado).to.be.true;
        })

        it('edita nome do grupo', async function() {
            await driver.findElement(By.id('editar')).click();
            await driver.findElement(By.name('novo-nome')).clear();
            await driver.findElement(By.name('novo-nome')).sendKeys('teste');
        })

        it('cria outro grupo', async function() {

        })

        it('apaga último grupo', async function() {

        })

        it('adiciona link ao grupo', async function() {

        })

        it('edita atributos do link', async function() {

        })

        it('adiciona outro link', async function() {

        })

        it('apaga último link', async function() {

        })

        it('comenta no link', async function() {

        })

        it('edita comentário', async function() {

        })

        it('comenta novamente no link', async function() {

        })

        it('apaga último comentário', async function() {

        })

        after(async function() {
            // await driver.close();
        })
    })
}
