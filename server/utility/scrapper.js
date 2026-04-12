require("dotenv").config();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function scrapJobs(platform, jobKeyword, location) {

    if (platform === "Linkedin") {

        // 🔥 Launch browser
        const browser = await puppeteer.launch({
            headless: true, // keep false for debugging
            defaultViewport: null
        });

        const page = await browser.newPage();

        // 🔥 Debug ENV (REMOVE later if you want)
        console.log("EMAIL:", process.env.LINKEDIN_EMAIL);
        console.log("PASSWORD:", process.env.LINKEDIN_PASSWORD ? "Loaded ✅" : "Missing ❌");

        await page.goto("https://www.linkedin.in/login", {
            waitUntil: "networkidle2"
        });

        await page.waitForSelector("#username");
        await page.waitForSelector("#password");

        console.log("PROCESS ENV LINKEDIN EMAIL ",process.env.LINKEDIN_EMAIL)

        await page.type("#username", process.env.LINKEDIN_EMAIL || "", { delay: 50 });
        await page.type("#password", process.env.LINKEDIN_PASSWORD || "", { delay: 50 });

        await Promise.all([
            page.click("button[type='submit']"),
            page.waitForNavigation({ waitUntil: "networkidle2" })
        ]);

        console.log("Logged in");


        await page.goto(
            `https://www.linkedin.in/jobs/search/?keywords=${jobKeyword}&location=${location}`,
            { waitUntil: "networkidle2" }
        );

        // 🔥 Wait for jobs to load
        await page.waitForSelector("a[href*='/jobs/search-results']");

        // 🔥 Scrape jobs
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

                return {
                    title,
                    company,
                    location,
                    posted,
                    salary,
                    link
                };
            });
        });

        console.log("📦 Jobs:", jobs);

        // 🔥 Close browser
        await browser.close();

        return jobs;
    }

   else if (platform === "Internshala") {

    let url = `https://internshala.com/internships/keywords-${jobKeyword}/`;

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: "networkidle2"
    });

    // Wait for jobs to load
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

            data.push({
                title,
                company,
                location,
                stipend,
                link
            });
        });

        return data;
    });

    console.log(jobs);

    await browser.close();

    return jobs;
}
}

module.exports = scrapJobs;