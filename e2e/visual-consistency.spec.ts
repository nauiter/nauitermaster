import { test, expect } from '@playwright/test';

/**
 * Visual Consistency Tests
 * 
 * Comprehensive visual regression testing to ensure
 * design consistency across all breakpoints and sections
 */

const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1920, height: 1080 },
};

test.describe('Section Visual Consistency', () => {
  const sections = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'projects', name: 'Projects Section' },
    { id: 'impact', name: 'Impact Metrics' },
    { id: 'contact', name: 'Contact Section' },
  ];

  for (const section of sections) {
    test(`${section.name} should be visually consistent on mobile`, async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.mobile);
      await page.goto('/en');
      
      await page.locator(`#${section.id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const element = page.locator(`#${section.id}`);
      await expect(element).toHaveScreenshot(`${section.id}-mobile.png`, {
        maxDiffPixels: 200,
        animations: 'disabled',
      });
    });

    test(`${section.name} should be visually consistent on tablet`, async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.tablet);
      await page.goto('/en');
      
      await page.locator(`#${section.id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const element = page.locator(`#${section.id}`);
      await expect(element).toHaveScreenshot(`${section.id}-tablet.png`, {
        maxDiffPixels: 200,
        animations: 'disabled',
      });
    });

    test(`${section.name} should be visually consistent on desktop`, async ({ page }) => {
      await page.setViewportSize(VIEWPORTS.desktop);
      await page.goto('/en');
      
      await page.locator(`#${section.id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const element = page.locator(`#${section.id}`);
      await expect(element).toHaveScreenshot(`${section.id}-desktop.png`, {
        maxDiffPixels: 200,
        animations: 'disabled',
      });
    });
  }
});

test.describe('Component Visual Consistency', () => {
  test('Navigation should look consistent across devices', async ({ page }) => {
    for (const [device, viewport] of Object.entries(VIEWPORTS)) {
      await page.setViewportSize(viewport);
      await page.goto('/en');
      
      const nav = page.locator('nav');
      await expect(nav).toHaveScreenshot(`nav-${device}.png`, {
        maxDiffPixels: 100,
      });
    }
  });

  test('Buttons should maintain consistent styling', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/en');
    
    const buttons = page.locator('button, a[class*="button"]').first();
    await expect(buttons).toHaveScreenshot('button-style.png', {
      maxDiffPixels: 50,
    });
  });

  test('Cards should have consistent shadows and borders', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/en');
    
    await page.locator('#impact').scrollIntoViewIfNeeded();
    
    const card = page.locator('#impact .rounded-xl').first();
    await expect(card).toHaveScreenshot('card-style.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Color Consistency', () => {
  test('Primary gradient should render consistently', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/en');
    
    const gradient = page.locator('h1 span[class*="gradient"]').first();
    const background = await gradient.evaluate((el) => 
      window.getComputedStyle(el).backgroundImage
    );
    
    expect(background).toContain('gradient');
  });

  test('Accent colors should be consistent', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/en');
    
    // Check multiple elements with accent colors
    const elements = await page.locator('[class*="text-\\[#00C4FF\\]"]').all();
    
    for (const element of elements.slice(0, 3)) {
      const color = await element.evaluate((el) => 
        window.getComputedStyle(el).color
      );
      
      // Should be cyan (#00C4FF)
      expect(color).toMatch(/rgb\(0,\s*196,\s*255\)/);
    }
  });
});

test.describe('Animation Consistency', () => {
  test('Hover effects should work consistently', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/en');
    
    const button = page.locator('a[href*="Nauiter_Master_Profile.pdf"]');
    
    // Get initial styles
    const initialBox = await button.evaluate((el) => 
      window.getComputedStyle(el).boxShadow
    );
    
    // Hover
    await button.hover();
    await page.waitForTimeout(300);
    
    const hoverBox = await button.evaluate((el) => 
      window.getComputedStyle(el).boxShadow
    );
    
    // Shadow should change on hover
    expect(initialBox).not.toBe(hoverBox);
  });

  test('Motion should be disabled with prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto('/en');
    
    const animated = page.locator('[class*="animate"]').first();
    const animationDuration = await animated.evaluate((el) => 
      window.getComputedStyle(el).animationDuration
    ).catch(() => '0s');
    
    // Should be very short or none with reduced motion
    expect(animationDuration).toMatch(/0\.01ms|0s|none/);
  });
});
