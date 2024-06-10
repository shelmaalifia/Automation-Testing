const { test, expect } = require('@playwright/test');

const handphoneBrands = ['Samsung'];

handphoneBrands.forEach(brand => {
  test(`search for ${brand} handphone on Tokopedia and click on a product`, async ({ page }) => {
    try {
      // Navigate to Tokopedia
      await page.goto('https://www.tokopedia.com', { timeout: 120000 });
      console.log('Navigated to Tokopedia');

      // Add delay to wait for the page to load
      await page.waitForTimeout(5000);
      console.log('Waited for the page to load');

      // Perform search for handphone brand
      await page.fill('input[aria-label="Cari di Tokopedia"]', brand);
      await page.press('input[aria-label="Cari di Tokopedia"]', 'Enter');
      console.log(`Searched for ${brand}`);

      // Wait for search results to load
      await page.waitForSelector('div[data-testid="spnSRPProdName"]', { timeout: 120000 });
      console.log('Search results loaded');

      // Verify search results contain the brand keyword
      const results = await page.$$eval('div[data-testid="spnSRPProdName"]', items => {
        return items.map(item => item.innerText);
      });

      expect(results).toContainEqual(expect.stringContaining(brand));
      console.log(`Verified search results for ${brand}`);

      // Take a screenshot of the search results
      await page.screenshot({ path: `search-results-${brand}.png` });
      console.log(`Screenshot taken for ${brand}`);

      // Click on the first product in the search results
      await page.click('div[data-testid="spnSRPProdName"]:first-child');
      console.log('Clicked on the first product');

      // Add delay to wait for the product detail page to start loading
      await page.waitForTimeout(5000);

      // Wait for the product detail page to load
      const productDetailSelector = 'div[data-testid="lblPDPDetailProductName"], h1';
      await page.waitForSelector(productDetailSelector, { timeout: 120000 });
      console.log('Product detail page loaded');

      // Take a screenshot of the product detail page
      await page.screenshot({ path: `product-detail-${brand}.png` });
      console.log(`Screenshot taken for product detail of ${brand}`);
    } catch (error) {
      console.error(`Test failed for ${brand}:`, error);
      throw error;  // Rethrow the error to ensure the test fails properly
    }
  });
});
