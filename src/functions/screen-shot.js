var md5 = require('md5');
const puppeteer = require('puppeteer');
var slugify = require('slugify')
 

module.exports =  (url) => {
    return new Promise(async (resolve, reject) => {
        if(!url.includes('http')){
            url = 'http://' + url;
        }
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        try {
            const page = await browser.newPage();
            // console.log('name', webTitle);
            
            await page.setViewport({
                width: 1280,
                height: 1280,
                deviceScaleFactor: 1,
            });
            await page.goto(url,{ waitUntil: 'networkidle2' });
            let webTitle = await page.title();
            webTitle = slugify(webTitle, '_').substring(0, 25);
            console.log(webTitle);
            let imageDesktop =  'desktop_' + webTitle + '_1280_1280.png';
            await page.waitForTimeout(5000);
            await page.screenshot({path: './public/assets/captures/' + imageDesktop});

            await page.setViewport({
                    width: 375,
                    height: 812,
                    deviceScaleFactor: 2,
                });
            await page.goto(url, {waitUntil: 'networkidle2'});
            let imageMobile = 'mobile_' + webTitle + '_375_812.png';
            await page.waitForTimeout(5000);
            await page.screenshot({path: './public/assets/captures/' + imageMobile});

            await browser.close();
            console.log('done');
            resolve({
                desktop: imageDesktop,
                mobile: imageMobile
            });

        }catch(error){
            await browser.close();
            console.log("Error Capture Screen: ", error);
            reject(error);
        }
        
    })
};
