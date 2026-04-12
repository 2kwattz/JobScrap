require("dotenv").config();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function scrapJobs(platform, jobKeyword, location) {

    // ================= LINKEDIN =================
    if (platform === "Linkedin") {

        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        });

        const page = await browser.newPage();

        await page.goto("https://www.linkedin.in/login", {
            waitUntil: "networkidle2"
        });

        await page.waitForSelector("#username");
        await page.waitForSelector("#password");

        await page.type("#username", process.env.LINKEDIN_EMAIL || "", { delay: 50 });
        await page.type("#password", process.env.LINKEDIN_PASSWORD || "", { delay: 50 });

        await Promise.all([
            page.click("button[type='submit']"),
            page.waitForNavigation({ waitUntil: "networkidle2" })
        ]);

        await page.goto(
            `https://www.linkedin.in/jobs/search/?keywords=${jobKeyword}&location=${location}`,
            { waitUntil: "networkidle2" }
        );

        await page.waitForSelector("a[href*='/jobs/search-results']");

        const jobs = await page.evaluate(() => {
            const jobCards = document.querySelectorAll("a[href*='/jobs/search-results']");

            return Array.from(jobCards).map((card) => {

                const title = card.querySelector("p span")?.innerText.trim();
                const company = card.querySelector("p.b424f291")?.innerText.trim();

                const location = Array.from(card.querySelectorAll("p"))
                    .find(el => el.innerText.includes("("))
                    ?.innerText.trim();

                const posted = Array.from(card.querySelectorAll("p"))
                    .find(el => el.innerText.toLowerCase().includes("posted"))
                    ?.innerText.trim();

                const salary = Array.from(card.querySelectorAll("p"))
                    .find(el => el.innerText.includes("₹"))
                    ?.innerText.trim();

                const link = "https://www.linkedin.com" + card.getAttribute("href");

                return { title, company, location, posted, salary, link };
            });
        });

        await browser.close();
        return jobs;
    }

    // ================= INTERNSHALA =================
    else if (platform === "Internshala") {

        let url = `https://internshala.com/internships/keywords-${jobKeyword}/`;

        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        });

        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle2" });

        await page.waitForSelector(".individual_internship");

        const jobs = await page.evaluate(() => {

            const jobCards = document.querySelectorAll(".individual_internship");

            let data = [];

            jobCards.forEach(card => {

                const title = card.querySelector(".job-title-href")?.innerText.trim();
                const company = card.querySelector(".company-name")?.innerText.trim();
                const location = card.querySelector(".locations span a")?.innerText.trim();
                const stipend = card.querySelector(".stipend")?.innerText.trim();
                const link = card.querySelector(".job-title-href")?.href;

                data.push({ title, company, location, stipend, link });
            });

            return data;
        });

        await browser.close();
        return jobs;
    }

    // ================= JOOBLE =================
    else if (platform === "Jooble") {

        let url = `https://in.jooble.org/SearchResult?ukw=${jobKeyword}&rgns=${location}`;

        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
        );

        await page.goto(url, { waitUntil: "domcontentloaded" });

        await new Promise(resolve => setTimeout(resolve, 1000));

        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await new Promise(resolve => setTimeout(resolve, 1000));

        const jobs = await page.evaluate(() => {

            const cards = document.querySelectorAll('[data-test-name="_jobCard"]');

            let data = [];

            cards.forEach(card => {

                const titleEl = card.querySelector('.job_card_link');
                const companyEl = card.querySelector('[data-test-name="_companyName"]');
                const captions = card.querySelectorAll('.caption');

                const title = titleEl?.innerText.trim();
                const link = titleEl?.href;
                const company = companyEl?.innerText.trim();
                const location = captions[0]?.innerText.trim();

                data.push({ title, company, location, link });
            });

            return data;
        });

        await browser.close();
        return jobs;
    }

    // ================= JOBRAPIDO =================
    else if (platform === "JobRapido") {

    let browser;

    try {
        let url = `https://in.jobrapido.com/?w=${jobKeyword}&l=${location}&r=auto&shm=all`;

        console.log("Opening URL:", url);

        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
        );

        await page.goto(url, { waitUntil: "domcontentloaded" });

        // Wait for JS rendering
        // await page.waitForTimeout(5000);
    // await new Promise(resolve => setTimeout(resolve, 1000));


        // Scroll (important for lazy loading)
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        // await new Promise(resolve => setTimeout(resolve, 1000));

        // Try selector safely
        let selectorExists = true;

        try {
            await page.waitForSelector(".result-item", { timeout: 1000 });
        } catch (err) {
            selectorExists = false;
            console.error("Selector .result-item not found");

            const html = await page.content();
            console.log("HTML Snapshot:", html.substring(0, 1000));
        }

        if (!selectorExists) {
            await browser.close();
            return [];
        }

        const jobs = await page.evaluate(() => {

            const cards = document.querySelectorAll(".result-item");

            return Array.from(cards).map(card => {

                const title = card.querySelector(".result-item__title")?.innerText.trim();
                const company = card.querySelector(".result-item__company-label")?.innerText.trim();
                const location = card.querySelector(".result-item__location-label span")?.innerText.trim();
                const link = card.querySelector(".result-item__link")?.href;

                return {
                    title,
                    company,
                    location,
                    link
                };
            });
        });

        console.log("Jobs:", jobs);

        await browser.close();
        return jobs;

    } catch (error) {
        console.error("JobRapido Scraper Error:", error);

        if (browser) {
            await browser.close();
        }

        return [];
    }
}
    // ================= DEFAULT =================
    else {
        console.log("Invalid platform");
        return [];
    }
}

module.exports = scrapJobs;