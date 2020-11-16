var md5 = require('md5');
const puppeteer = require('puppeteer');

module.exports =  (url) => {
    return new Promise(async (resolve, reject) => {
        let nameWebsite = url.replace(/\s/g, '')
                            .replace(/(^\w+:|^)\/\//, '')
                            .replace(/\/+$/, '')
                            .replace('wwww', '')
                            .replace(/\./g,'_');
        console.log(nameWebsite);
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            
            await page.setViewport({
                    width: 1280,
                    height: 1280,
                    deviceScaleFactor: 1,
                });
            await page.goto(url,{ waitUntil: 'networkidle2' });
            let imageDesktop =  'desktop_' + nameWebsite + '_1280_1280.png'
            await page.screenshot({path: './public/screenshoot/' + imageDesktop});

            await page.setViewport({
                width: 375,
                height: 812,
                deviceScaleFactor: 2,
                });
            await page.goto(url, {waitUntil: 'networkidle0'});
            let imageMobile = 'mobile_' + nameWebsite + '_375_812.png'
            await page.screenshot({path: './public/screenshoot/' + imageMobile});

            await browser.close();
            console.log('done');
            resolve({
                desktop: imageDesktop,
                mobile: imageMobile
            });

        }catch(error){
            reject(error);
        }
        
    })
};
