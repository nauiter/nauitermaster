import { test, expect } from '@playwright/test';

/**
 * Language Navigation E2E Tests
 * 
 * Validates:
 * - EN/PT route switching
 * - Language toggle button functionality
 * - Content translation updates
 * - URL persistence
 * - localStorage preference saving
 */

test.describe('Language Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('should load English version by default on /en route', async ({ page }) => {
    await expect(page).toHaveURL(/\/en/);
    
    // Verify English content is visible
    await expect(page.getByText('AI Strategist & Digital Artist')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
  });

  test('should switch to Portuguese when clicking PT button', async ({ page }) => {
    // Click PT language toggle
    await page.getByRole('button', { name: 'PT' }).click();
    
    // Wait for navigation
    await page.waitForURL(/\/pt/);
    
    // Verify Portuguese content
    await expect(page.getByText('Estrategista de IA & Artista Digital')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Projetos' })).toBeVisible();
  });

  test('should switch back to English from Portuguese', async ({ page }) => {
    // Navigate to PT first
    await page.goto('/pt');
    await expect(page.getByText('Estrategista de IA & Artista Digital')).toBeVisible();
    
    // Click EN button
    await page.getByRole('button', { name: 'EN' }).click();
    await page.waitForURL(/\/en/);
    
    // Verify English content
    await expect(page.getByText('AI Strategist & Digital Artist')).toBeVisible();
  });

  test('should persist language preference in localStorage', async ({ page }) => {
    // Switch to Portuguese
    await page.getByRole('button', { name: 'PT' }).click();
    await page.waitForURL(/\/pt/);
    
    // Check localStorage
    const language = await page.evaluate(() => localStorage.getItem('preferred-language'));
    expect(language).toBe('pt');
    
    // Reload and verify persistence
    await page.reload();
    await expect(page).toHaveURL(/\/pt/);
  });

  test('should update all section titles when language changes', async ({ page }) => {
    // Verify English titles
    await expect(page.getByRole('heading', { name: 'Showcase Projects' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Skills & Competencies' })).toBeVisible();
    
    // Switch to Portuguese
    await page.getByRole('button', { name: 'PT' }).click();
    await page.waitForURL(/\/pt/);
    
    // Verify Portuguese titles
    await expect(page.getByRole('heading', { name: 'Projetos em Destaque' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Habilidades & Competências' })).toBeVisible();
  });

  test('should maintain scroll position when switching languages', async ({ page }) => {
    // Scroll to projects section
    await page.locator('#projects').scrollIntoViewIfNeeded();
    
    const scrollY = await page.evaluate(() => window.scrollY);
    
    // Switch language
    await page.getByRole('button', { name: 'PT' }).click();
    await page.waitForURL(/\/pt/);
    
    // Verify scroll position is maintained (with some tolerance)
    const newScrollY = await page.evaluate(() => window.scrollY);
    expect(Math.abs(newScrollY - scrollY)).toBeLessThan(100);
  });
});
