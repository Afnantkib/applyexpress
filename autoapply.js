const puppeteer = require('puppeteer');
const website = 'https://www.linkedin.com/login';

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Set to false to see the browser
    const page = await browser.newPage();

    // Go to Naukri login page
    await page.goto(website);

    // Wait for the email and password fields to be available
    // await page.waitForSelector('#usernameField');
    // await page.waitForSelector('#passwordField');
    await page.waitForSelector('#username');
    await page.waitForSelector('#password');
    await page.type('#username', username); 
    await page.type('#password', password); 
    await page.click('button[type="submit"]'); 
    await page.waitForNavigation();
    console.log('Logged in successfully!');

    await page.waitForSelector(".nI-gNb-sb__placeholder");

    await page.click(".nI-gNb-sb__placeholder");

    await page.type(".nI-gNb-sb__placeholder", "Java");

    console.log("Typed the job keyword");

    await page.waitForSelector(".nI-gNb-sb__icon-wrapper");

    await page.click(".nI-gNb-sb__icon-wrapper");

    console.log("Clicked on the search button successfully");

    await page.waitForSelector('a.styles_btn-secondary__2AsIP');


    console.log('reached here')

    const elements = (await page.$$('a.styles_btn-secondary__2AsIP')).map(element=> element.href);


    console.log("next button link ", elements)
    var pages = new Set();



    await page.goto('https://www.naukri.com/java-jobs-8');

    console.log("clickedddd");

    let hasNextPage = true;
    let pageNumber = 1;

    while (hasNextPage) {
        console.log(`Processing page ${pageNumber}`);
        await page.waitForSelector('.jobTuple');

         const jobLinks = await page.$$eval('.jobTuple .title a', links => links.map(link => link.href));

        console.log(`Found ${jobLinks.length} Java jobs on page ${pageNumber}`);

        for (let jobLink of jobLinks) {
            console.log(`Applying to job: ${jobLink}`);

            await page.goto(jobLink);

            await page.waitForSelector('.applyButton');

            await page.click('.applyButton');

            await page.waitForTimeout(2000); 
            console.log('Applied successfully to job');

            await page.goBack();
        }

       const nextPageButton = await page.$('.pagination .next');
        if (nextPageButton) {
            await nextPageButton.click();
            await page.waitForNavigation(); 
            pageNumber++;
        } else {
            hasNextPage = false; 
        }
    }

    await page.screenshot({ path: 'naukri-job-apply-success.png' });

})();
