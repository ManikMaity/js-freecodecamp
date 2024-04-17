const fs = require('fs');
const puppeteer = require('puppeteer');
let webImages = [];

const getPicture = async (name, num) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://yandex.com/images/");
    await page.type('input[type="text"]', name);
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ContentImage-Image');
    const links = await page.evaluate(() => Array.from(document.querySelectorAll("img.ContentImage-Image"), (e) => e.src));
    for (let i = 0; i <= num; i++){
        webImages.push(links[i])
    }
    await browser.close();
}

getPicture("ai man foodball image", 22).then(()=>{
    fs.writeFileSync("./image.json", JSON.stringify(webImages));
})









