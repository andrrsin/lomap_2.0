import { defineFeature, loadFeature } from "jest-cucumber";
import puppeteer from "puppeteer";

const feature = loadFeature('./features/addMarker.feature');

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
    // Scenario: The user is logged in the site
    // Given A logged in user clicks in the map and the infowindow is shown
    // When  The form is filled and add is pressed
    // Then the markers should reload and appear the new one
    test("A logged user creates a marker",({given,when,then}) => {
        jest.setTimeout(100000);
        given("A logged in user clicks in the map and the infowindow is shown", async () => {
            await expect(page).toClick("button", {text:"Login"});
      
            await page.waitForNavigation(); // wait for the login page to load
      
            await page.type('#username', "ArqSoftLoMapEn2b")
            await page.type('#password', "#HappySW123")
      
            await page.click('#login')
      
            await page.waitForNavigation(); // wait for the redirect
            // await page.waitForTimeout(30000); // wait for 25 seconds (load locations??)
            await page.waitForTimeout(8000);

            await page.click("GoogleMap");
            await page.waitForTimeout(200); 
           

      
        });

        when("The form is filled and add is pressed", async () => {
            await page.type('#name', "Test Marker")
            await page.type('#description', "Test Description")

        });

        then("the markers should reload and appear the new one", async () => {
            await expect(page).toMatchElement("Marker");
        });

    })

    afterAll(async ()=>{
        browser.close()
    })

});


