import { test, expect } from '@playwright/test';

test('home renders manifesto message', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'No invento valor. Lo revelo.' })).toBeVisible();
});
