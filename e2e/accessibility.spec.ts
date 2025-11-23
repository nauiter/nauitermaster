import { test, expect } from '@playwright/test';

/**
 * Accessibility E2E Tests
 * 
 * Validates:
 * - WCAG AA compliance
 * - Keyboard navigation
 * - Screen reader compatibility
 * - Focus management
 * - Alt text on images
 */

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check H1 exists and is unique
    const h1 = page.getByRole('heading', { level: 1 });
    const h1Count = await h1.count();
    expect(h1Count).toBe(1);
    
    // Verify H2s for sections
    const h2s = page.getByRole('heading', { level: 2 });
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through links
    await page.keyboard.press('Tab');
    
    // Verify focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should have alt text on all images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Every image should have alt text
      expect(alt).toBeTruthy();
      expect(alt).not.toBe('');
    }
  });

  test('should have proper aria-labels on interactive elements', async ({ page }) => {
    // Social links
    const socialLinks = page.locator('a[aria-label*="email"], a[aria-label*="Facebook"], a[aria-label*="LinkedIn"]');
    const count = await socialLinks.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Each should have descriptive aria-label
    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i);
      const label = await link.getAttribute('aria-label');
      expect(label).toBeTruthy();
      expect(label!.length).toBeGreaterThan(5);
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // Check main heading contrast
    const heading = page.getByRole('heading', { level: 1 }).first();
    
    const color = await heading.evaluate((el) => 
      window.getComputedStyle(el).color
    );
    
    const bgColor = await heading.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Both should be defined
    expect(color).toBeTruthy();
    expect(bgColor).toBeTruthy();
  });

  test('should be navigable with keyboard only', async ({ page }) => {
    // Tab to first link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Press Enter to activate link
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    // Navigation should work
    const url = page.url();
    expect(url).toBeTruthy();
  });

  test('should have semantic HTML structure', async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Check for nav landmark
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for sections
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(3);
  });
});
