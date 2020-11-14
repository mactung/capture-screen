var md5 = require('md5');
const puppeteer = require('puppeteer');

module.exports =  (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setViewport({
                    width: 1920,
                    height: 1920,
                    deviceScaleFactor: 0,
                });
            await page.goto(url,{ waitUntil: 'networkidle0' });
            let nameImage = md5(url) + '.png'
            await page.screenshot({path: './public/screenshoot/' + nameImage});
            await browser.close();
            resolve(nameImage);

        }catch(error){
            reject(error);
        }
        
    })
};


// const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);
//     await page.setViewport({
//             width: 1920,
//             height: 40000,
//             deviceScaleFactor: 1,
//         });

    
//     const element = await page.$('body > div.container > div > div > div.table-responsive');  

//     await element.screenshot({path: './screenshoot/' + md5(url) + '.png'});
//     await browser.close();