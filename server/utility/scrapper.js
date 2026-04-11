const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");



puppeteer.use(StealthPlugin());

async function scrapJobs(platform, jobKeyword, location) {

    if (platform === "Linkedin") {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(`https://www.linkedin.com/search/results/all/?keywords=${jobKeyword}&origin=GLOBAL_SEARCH_HEADER`, {
            waitUntil: "domcontentloaded"
        });

        const data = await page.evaluate(() => {
            return document.title;
        });

         console.log(data);

  await browser.close();

    }

}

module.exports = scrapJobs;