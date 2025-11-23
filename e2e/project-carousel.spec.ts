import { test, expect } from '@playwright/test';

/**
 * Project Carousel E2E Tests
 * 
 * Validates:
 * - Carousel navigation (prev/next)
 * - Slide transitions
 * - Project card content
 * - External links functionality
 * - Responsive behavior
 */

test.describe('Project Carousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
  });

  test('should display projects carousel', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Showcase Projects' })).toBeVisible();
    
    // Verify carousel container exists
    const carousel = page.locator('[data-tour="projects"]');
    await expect(carousel).toBeVisible();
  });

  test('should navigate to next project on next button click', async ({ page }) => {
    // Wait for carousel to load
    await page.waitForSelector('[role="group"]', { timeout: 5000 });
    
    // Get initial project title
    const initialProject = await page.locator('.carousel-item').first().textContent();
    
    // Click next button
    await page.getByRole('button', { name: /next/i }).click();
    
    // Wait for transition
    await page.waitForTimeout(500);
    
    // Verify project changed
    const newProject = await page.locator('.carousel-item').first().textContent();
    expect(newProject).not.toBe(initialProject);
  });

  test('should navigate to previous project on prev button click', async ({ page }) => {
    // Navigate forward first
    await page.getByRole('button', { name: /next/i }).click();
    await page.waitForTimeout(500);
    
    const secondProject = await page.locator('.carousel-item').first().textContent();
    
    // Navigate back
    await page.getByRole('button', { name: /previous/i }).click();
    await page.waitForTimeout(500);
    
    const firstProject = await page.locator('.carousel-item').first().textContent();
    expect(firstProject).not.toBe(secondProject);
  });

  test('should display all project cards with correct content', async ({ page }) => {
    const projects = [
      'Sweet Life Animes',
      'Sweet Life Academy',
      'O Verme Passeia',
      'Figueiredo Law'
    ];
    
    for (const projectName of projects) {
      // Navigate through carousel to find project
      let found = false;
      for (let i = 0; i < 5; i++) {
        const content = await page.textContent('body');
        if (content?.includes(projectName)) {
          found = true;
          break;
        }
        await page.getByRole('button', { name: /next/i }).click();
        await page.waitForTimeout(500);
      }
      
      expect(found).toBeTruthy();
    }
  });

  test('should open project link in new tab', async ({ page, context }) => {
    // Wait for carousel
    await page.waitForSelector('[role="group"]');
    
    // Find project link
    const projectLink = page.locator('a[href*="http"]').first();
    
    // Listen for new page
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      projectLink.click()
    ]);
    
    // Verify new tab opened
    expect(newPage.url()).toBeTruthy();
    expect(newPage.url()).not.toContain('localhost');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Scroll to projects
    await page.locator('#projects').scrollIntoViewIfNeeded();
    
    // Verify carousel is visible
    await expect(page.getByRole('heading', { name: 'Showcase Projects' })).toBeVisible();
    
    // Navigation buttons should be visible
    await expect(page.getByRole('button', { name: /next/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /previous/i })).toBeVisible();
  });
});
