const fs = require('fs');
const puppeteer = require('puppeteer');

let cricketData = {};

/*{
        name: "Héctor Zelada",
        position: "goalkeeper",
        number: 22,
        isCaptain: false,
        nickname: null,
      }
       */



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

getPicture("ai cricket images", 50).then(()=>{
    fs.writeFileSync("./image.json", JSON.stringify(webImages));
})


// const getCricketData = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto("https://www.bcci.tv/players");
//     await page.waitForSelector('[onclick="click_player(this)"]');
//     const players = await page.evaluate(() => Array.from(document.querySelectorAll('[onclick="click_player(this)"]'), (e) => {
//         const playerStats = e.querySelectorAll(".player-type p");
//         let tempObj = {
//             name : e.querySelector(".player-name").textContent,
//             number : Number(e.querySelector(".t-shirt").textContent),
//             playerType : playerStats[0].textContent,
//             age : Number(playerStats[1].textContent),
//             hand : playerStats[2].textContent

//         };
//         return tempObj;

//     }));
//     cricketData.players = players;
//     fs.writeFileSync("./indian-cricket-players-data.json", JSON.stringify(cricketData, undefined, 5));
   
//     await browser.close();
// }
// getCricketData();









