require('dotenv').config();
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Kunjungi halaman login Instagram
    await page.goto('https://www.instagram.com/accounts/login/');

    // Tunggu halaman login muncul dan isi kredensial
    await page.fill('input[name="username"]', process.env.INSTAGRAM_USERNAME);
    await page.fill('input[name="password"]', process.env.INSTAGRAM_PASSWORD);
    await page.click('button[type="submit"]');

    // Tunggu sampai login selesai
    await page.waitForNavigation();

    // Tunggu hingga halaman home Instagram muncul
    await page.waitForSelector('[placeholder="Cari Input"]');

    // Cari akun Instagram artis/aktor favorit
    await page.fill('[placeholder="Cari Input"]', 'princesssyahrini');
    await page.waitForSelector('x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1uhb9sk x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf xqjyukv x1cy8zhl x1oa3qoh x1nhvcw1'); // Menunggu hasil pencarian muncul
    await page.click('x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1uhb9sk x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf xqjyukv x1cy8zhl x1oa3qoh x1nhvcw1'); // Klik hasil pencarian pertama

    // Tunggu hingga halaman profil muncul
    await page.waitForSelector('xpdipgo x972fbf xcfux6l x1qhh985 xm0m39n xk390pu x5yr21d xdj266r x11i5rnm xat24cr x1mh8g0r xl1xv1r xexx8yu x4uap5 x18d9i69 xkhd6sd x11njtxf xh8yej3');

    // Ambil screenshot dari postingan terbaru
    const latestPost = await page.$('xpdipgo x972fbf xcfux6l x1qhh985 xm0m39n xk390pu x5yr21d xdj266r x11i5rnm xat24cr x1mh8g0r xl1xv1r xexx8yu x4uap5 x18d9i69 xkhd6sd x11njtxf xh8yej3');
    await latestPost.screenshot({ path: 'latest-post.png' });

    // Tutup browser
    await browser.close();
})();