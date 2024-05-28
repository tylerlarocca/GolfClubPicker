const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function fetchData() {
    const browser = await puppeteer.launch({ headless: false });
    console.log('launched puppeteer');
    const page = await browser.newPage();
    console.log('looking for page');
    await page.goto('https://www.titleist.com/golf-clubs/golf-drivers/?th=585&bh=3218&source=pdp', { waitUntil: 'networkidle0', timeout: 120000 });
    console.log('found page');

    // Wait for the specific element to ensure the page has loaded completely
    await page.waitForSelector('.products__list .product', { timeout: 60000 });
    
    // Adding a manual delay (optional)
    await page.waitForTimeout(5000);

    const drivers = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('.products__list .product');

        console.log('Found items:', items.length); // Debugging: log the number of items found

        items.forEach((item) => {
            const name = item.querySelector('.product__name')?.innerText.trim();
            const price = item.querySelector('.product__price')?.innerText.trim();
            const img = item.querySelector('.product__image img')?.src;

            console.log('Item details:', { name, price, img }); // Debugging: log each item's details

            if (name && price && img) {
                results.push({ name, price, img });
            }
        });

        return results;
    });

    console.log('Drivers:', drivers); // Debugging: log the drivers array

    fs.writeFileSync(path.join(__dirname, 'data', 'drivers.json'), JSON.stringify(drivers, null, 2));
    console.log('Data fetched and stored successfully.');
    await browser.close();
}

fetchData();
