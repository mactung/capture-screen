var md5 = require('md5');
const puppeteer = require('puppeteer');

module.exports =  (url = 'https://www.youtube.com/watch?v=pEzouCjzu9M') => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url,{ waitUntil: 'networkidle0' });
            let nameImage = md5(url) + '.png'
            setTimeout(()=> {
                page.screenshot({path: './public/screenshoot/anh.png' , fullPage: true});
            }, 3000);
            resolve(nameImage);
        }catch(error){
            reject(error);
        }
    })
};
