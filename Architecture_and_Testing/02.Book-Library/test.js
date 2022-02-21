const { chromium } = require('playwright-chromium');

const { expect } = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', async function() {

    this.timeout(5000);

    before(async() => { browser = await chromium.launch(); });

    after(async() => { await browser.close(); });

    beforeEach(async() => { page = await browser.newPage(); });

    afterEach(async() => { await page.close(); });

    it('load all books!', async() => {
        await page.goto(`http://127.0.0.1:5500/Exercises/02.Book-Library/index.html`)
        await page.click('text=LOAD ALL BOOKS');

        await page.fill('form#createForm >> input[name="title"]', 'Kniga na biznesmena!');
        await page.fill('form#createForm >> input[name="author"]', 'Ivan');
        await page.click('form#createForm >> text=Submit')


        let content = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));
        expect(content[1]).to.contains('Harry Potter');
        expect(content[2]).to.contains('C#');
        expect(content[1]).to.contains('Rowling');
        expect(content[2]).to.contains('Nakov');
    })

    it('Submit book!', async() => {
        await page.goto(`http://127.0.0.1:5500/Exercises/02.Book-Library/index.html`)

        await page.fill('form#createForm >> input[name="title"]', 'Kniga na biznesmena!');
        await page.fill('form#createForm >> input[name="author"]', 'Ivan');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('form#createForm >> text=Submit')
        ])

        const data = JSON.parse(request.postData());

        expect(data.title).to.equal('Kniga na biznesmena!');
        expect(data.author).to.equal('Ivan');

    })

    it('Edit book!', async() => {
        await page.goto(`http://localhost:5500/Exercises/02.Book-Library/index.html`)
        await page.click('text=LOAD ALL BOOKS');

        await page.click('button.editBtn >> nth=2');

        let contentTitle = await page.inputValue('form#editForm >> input[name="title"]');

        expect(contentTitle).to.contain('biznesmena');

        await page.fill('form#editForm >> input[name="author"]', 'Gosho');


        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'PUT'),
            await page.click('text=Save')
        ])

        const data = JSON.parse(request.postData());
        expect(data.author).to.equal('Gosho');
    })

    it('Delete book!', async() => {
        await page.goto(`http://localhost:5500/Exercises/02.Book-Library/index.html`)
        await page.click('text=LOAD ALL BOOKS');
        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'DELETE'),
            page.click('button.deleteBtn >> nth=2')
        ])
    })



});