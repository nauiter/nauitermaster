import { test, expect } from '@playwright/test';

/**
 * Responsive Behavior E2E Tests
 * 
 * Validates:
 * - Mobile viewport rendering
 * - Tablet viewport rendering
 * - Desktop viewport rendering
 * - Navigation menu behavior
 * - Touch interactions on mobile
 */

test.describe('Responsive Behavior', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];

  for (const viewport of viewports) {
    test(`should render correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/en');

      // Verify page loads
      await expect(page.getByText('AI Strategist & Digital Artist')).toBeVisible();
      
      // Verify navigation is accessible
      await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
    });
  }

  test('should show mobile navigation correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');

    // Navigation should be visible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should handle touch interactions on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/en');

    // Scroll to projects
    await page.locator('#projects').scrollIntoViewIfNeeded();
    
    // Touch carousel navigation
    await page.getByRole('button', { name: /next/i }).tap();
    await page.waitForTimeout(500);
    
    // Verify navigation worked
    const carousel = page.locator('[data-tour="projects"]');
    await expect(carousel).toBeVisible();
  });

  test('should maintain readability on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/en');

    // Check font sizes are appropriate
    const heading = page.getByRole('heading', { level: 1 }).first();
    const fontSize = await heading.evaluate((el) => 
      window.getComputedStyle(el).fontSize
    );
    
    // Font should be readable (at least 24px on tablet)
    const size = parseInt(fontSize);
    expect(size).toBeGreaterThanOrEqual(24);
  });

  test('should adapt grid layouts on different screens', async ({ page }) => {
    // Desktop - 3 columns
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/en');
    await page.locator('#ecosystem').scrollIntoViewIfNeeded();
    
    let grid = page.locator('#ecosystem .grid').first();
    let gridCols = await grid.evaluate((el) => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    
    // Should have multiple columns on desktop
    expect(gridCols.split(' ').length).toBeGreaterThanOrEqual(3);
    
    // Mobile - 1 column
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.locator('#ecosystem').scrollIntoViewIfNeeded();
    
    grid = page.locator('#ecosystem .grid').first();
    gridCols = await grid.evaluate((el) => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    
    // Should have single column on mobile
    expect(gridCols.split(' ').length).toBeLessThanOrEqual(1);
  });
});
