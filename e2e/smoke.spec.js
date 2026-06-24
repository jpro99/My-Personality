import { test, expect } from '@playwright/test';

test.describe('Color Survey App', () => {
  test('loads survey and completes sample flow', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#questions .question-prompt')).toBeVisible();
    await page.click('#sampleBtn');
    await expect(page.getByRole('button', { name: /See my results/i })).toBeVisible();
    await page.getByRole('button', { name: /See my results/i }).click();
    await expect(page.locator('#resultsPanel')).not.toHaveClass(/hidden/);
    await expect(page.locator('#teacherCode')).not.toBeEmpty();
    await expect(page.locator('#primaryTitle')).toContainText('Primary');
  });

  test('teacher lookup decodes code', async ({ page }) => {
    await page.goto('/');
    await page.click('#sampleBtn');
    await page.getByRole('button', { name: /See my results/i }).click();
    const code = await page.locator('#teacherCode').textContent();
    await page.fill('#lookupCode', code);
    await page.click('#lookupBtn');
    await expect(page.locator('#teacherOutput')).toContainText('Lookup by code');
  });

  test('team scanner accepts codes', async ({ page }) => {
    await page.goto('/');
    await page.click('#sampleBtn');
    await page.getByRole('button', { name: /See my results/i }).click();
    const code = await page.locator('#teacherCode').textContent();
    await page.fill('#teamCodes', code);
    await page.click('#teamBtn');
    await expect(page.locator('#teacherOutput')).toContainText('Team composition');
  });

  test('save and export flow', async ({ page }) => {
    await page.goto('/');
    await page.click('#sampleBtn');
    await page.getByRole('button', { name: /See my results/i }).click();
    await page.click('#saveBtn');
    await expect(page.locator('.save-item')).toHaveCount(1);
  });

  test('clicking score card switches color exploration', async ({ page }) => {
    await page.goto('/');
    await page.click('#sampleBtn');
    await expect(page.locator('#resultsPanel')).not.toHaveClass(/hidden/);
    await page.locator('.score-card-btn[data-color="blue"]').click();
    await page.getByRole('tab', { name: 'Teamwork' }).click();
    await expect(page.locator('#tabContentMount')).toContainText('This is you on a team');
    await page.locator('.score-card-btn[data-color="orange"]').click();
    await expect(page.locator('#tabContentMount')).toContainText('Orange');
  });

  test('result tabs switch', async ({ page }) => {
    await page.goto('/');
    await page.click('#sampleBtn');
    await expect(page.locator('#resultsPanel')).not.toHaveClass(/hidden/);
    await page.getByRole('tab', { name: 'Communication' }).click();
    await expect(page.locator('#tabContentMount')).toContainText('communicate');
    await page.getByRole('tab', { name: 'My card' }).click();
    await expect(page.locator('#tabContentMount')).toContainText('personal card');
  });

  test('theme toggle works', async ({ page }) => {
    await page.goto('/');
    await page.click('#themeToggle');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});
