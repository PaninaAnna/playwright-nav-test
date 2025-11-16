import { test, expect } from '@playwright/test';

test.describe('Site Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Home page shows Home <h1>', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Home');
  });

  test('Home page shows correct page title', async ({ page }) => {
    await expect(page).toHaveTitle('Home');
  });

  test('About link navigates to About and H1 updates', async ({ page }) => {
    await page.click('a[href="about.html"]');
    await expect(page).toHaveURL(/about\.html$/);
    await expect(page.locator('h1')).toHaveText('About');
    await expect(page).toHaveTitle('About');
  });

  test('Contact link navigates to Contact and H1 updates', async ({ page }) => {
    await page.click('a[href="contact.html"]');
    await expect(page).toHaveURL(/contact\.html$/);
    await expect(page.locator('h1')).toHaveText('Contact');
    await expect(page).toHaveTitle('Contact');
  });

  test('Navigation links are visible, functional and have meaningful text', async ({ page }) => {
    const navLinks = page.locator('nav a');
    const EXPECTED_TEXTS = ['Home', 'About', 'Contact'];
  
    await expect(navLinks).toHaveCount(EXPECTED_TEXTS.length);
  
    const actualTexts = await navLinks.allTextContents();
  
    for (let i = 0; i < EXPECTED_TEXTS.length; i++) {
      await expect(navLinks.nth(i)).toBeVisible();
      await expect(navLinks.nth(i)).toBeEnabled();
      await expect(navLinks.nth(i)).toHaveAttribute('href');
    }
  
    for (const expectedText of EXPECTED_TEXTS) {
      await expect(actualTexts).toContain(expectedText);
    }
  });
});