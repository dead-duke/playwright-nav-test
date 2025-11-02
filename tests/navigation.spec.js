import { test, expect } from '@playwright/test';
import pagesData from './data/pagesData.js';

test.describe('Navigation functionality', () => {
  for (const currentPage of pagesData) {
    test.describe(`${currentPage.name} page navigation`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(currentPage.url);
      });

      test(`should display correct page header`, async ({ page }) => {
        const currentPageHeader = page.getByRole('heading', { level: 1, name: currentPage.name });
        await expect(currentPageHeader).toBeVisible();
      });

      const otherPages = pagesData.filter((pageData) => pageData.name !== currentPage.name);
      for (const targetPage of otherPages) {
        test(`should navigate from ${currentPage.name} to ${targetPage.name}`, async ({ page }) => {
          await page.getByRole('link', { name: targetPage.name }).click();
          await expect(page).toHaveURL(new RegExp(`${targetPage.url}$`));
          await expect(page).toHaveTitle(targetPage.name);

          const targetPageHeader = page.getByRole('heading', { level: 1, name: targetPage.name });
          await expect(targetPageHeader).toBeVisible();
        });
      }
    });
  }
});
