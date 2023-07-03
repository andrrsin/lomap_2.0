import { defineFeature, loadFeature } from "jest-cucumber";
import puppeteer from "puppeteer";

const feature = loadFeature('./features/profile.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;
// Scenario: A user views his profile
//   Given The user logs in
//   When Clicks to show profile
//   Then the profile is shown
defineFeature(feature, test => {

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: false, slowMo: 100, args: ['--incognito'] });
        page = await browser.newPage();

        await page
            .goto("http://localhost:3000", {
                waitUntil: "networkidle0",
            })
            .catch(() => {});
        jest.setTimeout(100000);
    });

    test("A user views his profile",({given,when,then}) => {
        jest.setTimeout(100000);
        given("The user logs in", async () => {
            await expect(page).toClick("button", {text:"Login"});
      
            await page.waitForNavigation(); // wait for the login page to load
      
            await page.type('#username', "ArqSoftLoMapEn2b")
            await page.type('#password', "#HappySW123")
      
            await page.click('#login')
      
            await page.waitForNavigation(); // wait for the redirect
            // await page.waitForTimeout(30000); // wait for 25 seconds (load locations??)
            await page.waitForTimeout(8000);
      
        });

        when("Clicks to show profile", async () => {
            const profile = await page.click("button");
            await page.waitForTimeout(3000); // wait for 10 seconds

        });

        then("The profile is shown", async () => {
            await expect(page).toMatch('WebID:')
        });

    })

    afterAll(async ()=>{
        browser.close()
    })

});


