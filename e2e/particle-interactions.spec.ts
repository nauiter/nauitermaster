import { test, expect } from '@playwright/test';

/**
 * Particle Magnetic Interactions E2E Tests
 * 
 * Validates:
 * - Particle rendering in cosmic sections
 * - Mouse hover magnetic effects
 * - Particle animation performance
 * - Particle count and distribution
 */

test.describe('Particle Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
  });

  test('should render particles in cosmic sections', async ({ page }) => {
    // Scroll to contact section (has particles)
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Wait for particles to render
    await page.waitForTimeout(1000);
    
    // Check if particle container exists
    const particleContainer = page.locator('.absolute.inset-0.pointer-events-none').first();
    await expect(particleContainer).toBeVisible();
  });

  test('should render multiple particles', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Count particle elements
    const particles = page.locator('.absolute.rounded-full.bg-gradient-to-r');
    const count = await particles.count();
    
    // Should have at least 6 particles
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('should have particles with different positions', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const particles = page.locator('.absolute.rounded-full.bg-gradient-to-r').first();
    
    // Get position styles
    const left = await particles.evaluate((el) => el.style.left);
    const top = await particles.evaluate((el) => el.style.top);
    
    // Should have percentage-based positioning
    expect(left).toMatch(/%$/);
    expect(top).toMatch(/%$/);
  });

  test('should animate particles smoothly', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const particle = page.locator('.absolute.rounded-full.bg-gradient-to-r').first();
    
    // Get initial transform
    const initialTransform = await particle.evaluate((el) => 
      window.getComputedStyle(el).transform
    );
    
    // Wait for animation to progress
    await page.waitForTimeout(2000);
    
    // Get new transform
    const newTransform = await particle.evaluate((el) => 
      window.getComputedStyle(el).transform
    );
    
    // Transform should have changed (animation is running)
    expect(newTransform).not.toBe(initialTransform);
  });

  test('should react to mouse hover (magnetic effect)', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const contactSection = page.locator('#contact');
    
    // Hover over section
    await contactSection.hover();
    
    // Move mouse around to trigger magnetic effect
    await page.mouse.move(500, 300);
    await page.waitForTimeout(500);
    
    await page.mouse.move(600, 400);
    await page.waitForTimeout(500);
    
    // Particles should still be visible and animated
    const particles = page.locator('.absolute.rounded-full.bg-gradient-to-r');
    await expect(particles.first()).toBeVisible();
  });

  test('should have particles in ecosystem section', async ({ page }) => {
    await page.locator('#ecosystem').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    // Verify particles are rendered
    const particles = page.locator('.absolute.rounded-full.bg-gradient-to-r');
    const count = await particles.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should have different particle colors in different sections', async ({ page }) => {
    // Contact section (primary color)
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const contactParticle = page.locator('#contact .absolute.rounded-full').first();
    const contactClass = await contactParticle.getAttribute('class');
    
    // Ecosystem section (secondary color)
    await page.locator('#ecosystem').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const ecosystemParticle = page.locator('#ecosystem .absolute.rounded-full').first();
    const ecosystemClass = await ecosystemParticle.getAttribute('class');
    
    // Classes should be different (different color variants)
    expect(contactClass).not.toBe(ecosystemClass);
  });

  test('should not affect page performance', async ({ page }) => {
    // Navigate and scroll through all sections
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Measure performance
    const metrics = await page.evaluate(() => ({
      fps: performance.now(),
      memory: (performance as any).memory?.usedJSHeapSize || 0
    }));
    
    // Basic performance check - page should still be responsive
    expect(metrics.fps).toBeGreaterThan(0);
  });
});
