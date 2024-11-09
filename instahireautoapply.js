const puppeteer = require('puppeteer');
const website = 'https://www.instahyre.com/login/';
const username = 'afnantkib@gmail.com';
const password = 'Great@@@123';

(async () => {
    // Launch a new browser
    const browser = await puppeteer.launch({ headless: false }); // Set to false to see the browser
    const page = await browser.newPage();

    // Go to Naukri login page
    await page.goto(website);

    // Wait for the email and password fields to be available
    // await page.waitForSelector('#usernameField');
    // await page.waitForSelector('#passwordField');
    await page.waitForSelector('#email');
    await page.waitForSelector('#password');

    // Type your username and password (replace these with your actual credentials)

    // await page.type('#usernameField', 'trashdata10@gmail.com'); // Replace with your email
    // await page.type('#passwordField', 'Yg@4tWf@fTB9MqU'); // Replace with your password
    await page.type('#email', username); // Replace with your email
    await page.type('#password', password); // Replace with your password

    // Click the login button
    await page.click('button[type="submit"]'); // You may need to adjust the selector if necessary

    // Wait for navigation to complete (e.g., after successful login)
    await page.waitForNavigation();
    console.log('Logged in successfully!');

    await page.waitForSelector("#search-Software");

    await page.click("#search-Software");

    await page.waitForSelector("#interested-btn");

    await page.click("#interested-btn");

    while(true) {

    await page.waitForFunction(() => {
        const button = document.querySelector('.apply.ng-scope .btn.btn-lg.btn-primary.new-btn');
        return button && !button.disabled && button.offsetWidth > 0 && button.offsetHeight > 0;
      });
      await page.click('.apply.ng-scope .btn.btn-lg.btn-primary.new-btn');
      

    // Click the button inside the div
    await page.click('.apply.ng-scope .btn.btn-lg.btn-primary.new-btn', { force: true });
    }



    return;

    await page.type(".nI-gNb-sb__placeholder", "Java");

    console.log("Typed the job keyword");

    await page.waitForSelector(".nI-gNb-sb__icon-wrapper");

    await page.click(".nI-gNb-sb__icon-wrapper");

    console.log("Clicked on the search button successfully");

    await page.waitForSelector('a.styles_btn-secondary__2AsIP');


    // await page.click('a.styles_btn-secondary__2AsIP');
    console.log('reached here')

    const elements = (await page.$$('a.styles_btn-secondary__2AsIP')).map(element => element.href);


    console.log("next button link ", elements)
    var pages = new Set();



    await page.goto('https://www.naukri.com/java-jobs-8');

    console.log("clickedddd");


    // Loop through all pages
    let hasNextPage = true;
    let pageNumber = 1;

    while (hasNextPage) {
        console.log(`Processing page ${pageNumber}`);

        // Wait for the job listings to load
        await page.waitForSelector('.jobTuple');

        // Get the list of jobs (You can change the selector based on the actual page structure)
        const jobLinks = await page.$$eval('.jobTuple .title a', links => links.map(link => link.href));

        // Print the job links to the console
        console.log(`Found ${jobLinks.length} Java jobs on page ${pageNumber}`);

        // Apply to each job (you can adjust this logic as needed)
        for (let jobLink of jobLinks) {
            console.log(`Applying to job: ${jobLink}`);

            // Go to the job page
            await page.goto(jobLink);

            // Wait for the "Apply" button to be available
            await page.waitForSelector('.applyButton');

            // Click the "Apply" button
            await page.click('.applyButton');

            // Wait for the application process to complete (you may need to handle confirmation modals or forms)
            await page.waitForTimeout(2000); // Adjust timeout if necessary
            console.log('Applied successfully to job');

            // Return to the job listings page to apply to the next job
            await page.goBack();
        }

        // Check if there is a next page and navigate to it
        const nextPageButton = await page.$('.pagination .next'); // Modify if needed for pagination
        if (nextPageButton) {
            await nextPageButton.click(); // Click the "Next" page button
            await page.waitForNavigation(); // Wait for the page to load
            pageNumber++;
        } else {
            hasNextPage = false; // No more pages, stop the loop
        }
    }

    // Take a screenshot (optional)
    await page.screenshot({ path: 'naukri-job-apply-success.png' });

    // Close the browser
    //   await browser.close();
})();
