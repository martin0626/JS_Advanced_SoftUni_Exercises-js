const { chromium } = require('playwright-chromium');

const { expect } = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', async function() {

    this.timeout(5000);

    before(async() => { browser = await chromium.launch(); });

    after(async() => { await browser.close(); });

    beforeEach(async() => { page = await browser.newPage(); });

    afterEach(async() => { await page.close(); });

    it('Load messages!', async() => {
        this.timeout(5000)
        await page.goto('http://localhost:5500/Exercises/01.Messenger/index.html');
        await page.click('text=Refresh');
        this.timeout(5000);
        let content = await page.inputValue('textarea');
        expect(content).to.contain('Spami: Hello, are you there?')
    })
    it('Send messages!', async() => {
        this.timeout(5000)
        await page.goto('http://localhost:5500/Exercises/01.Messenger/index.html');
        await page.fill('#author', 'Ivan');
        await page.fill('#content', 'Ivan Ivanov');
        await page.click('text=Send');

        await page.click('text=Refresh');
        let content = await page.inputValue('textarea');
        expect(content).to.contain('Ivan: Ivan Ivanov');
    })

});

//Втория път тръгват и двата, но си скъсах нервите и не ми се занимава с тея тестове :D