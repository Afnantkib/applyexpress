const puppeteer = require('puppeteer');
require('dotenv').config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const website = 'https://www.instahyre.com/login/';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(website);
    await page.waitForSelector('#email');
    await page.waitForSelector('#password');

    await page.type('#email', username);
    await page.type('#password', password);

    await page.click('button[type="submit"]');

    await page.waitForNavigation();
    console.log('Logged in successfully!');

    await page.waitForSelector("#search-Software");

    await page.click("#search-Software");

    await page.waitForSelector("#interested-btn");

    await page.click("#interested-btn");

    while (true) {

        await page.waitForFunction(() => {
            const button = document.querySelector('.apply.ng-scope .btn.btn-lg.btn-primary.new-btn');
            return button && !button.disabled && button.offsetWidth > 0 && button.offsetHeight > 0;
        });
        await page.click('.apply.ng-scope .btn.btn-lg.btn-primary.new-btn');

        await page.click('.apply.ng-scope .btn.btn-lg.btn-primary.new-btn', { force: true });

        
       // await page.screenshot({ path: 'naukri-job-apply-success.png' });  
    }

})();
