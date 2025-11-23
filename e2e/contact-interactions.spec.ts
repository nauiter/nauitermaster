import { test, expect } from '@playwright/test';

/**
 * Contact & Social Links E2E Tests
 * 
 * Validates:
 * - Email contact links
 * - Social media links (Facebook, Instagram, LinkedIn)
 * - Book a Call CTA functionality
 * - Link accessibility attributes
 * - External link behavior
 */

test.describe('Contact Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en');
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('should display contact section with title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Let's Co-Create the Future/i })).toBeVisible();
  });

  test('should have "Book a Call" CTA with email link', async ({ page }) => {
    const bookCallButton = page.getByRole('link', { name: /Book a Discovery Call/i });
    
    await expect(bookCallButton).toBeVisible();
    
    // Verify it's a mailto link
    const href = await bookCallButton.getAttribute('href');
    expect(href).toContain('mailto:');
  });

  test('should display all social media icons', async ({ page }) => {
    const socialLinks = [
      { name: 'Contact via email', platform: 'Email' },
      { name: 'Follow on Facebook', platform: 'Facebook' },
      { name: 'Follow on Instagram', platform: 'Instagram' },
      { name: 'Connect on LinkedIn', platform: 'LinkedIn' }
    ];
    
    for (const social of socialLinks) {
      const link = page.getByLabel(social.name);
      await expect(link).toBeVisible();
    }
  });

  test('should open social links in new tab', async ({ page, context }) => {
    // Test LinkedIn link
    const linkedinLink = page.getByLabel('Connect on LinkedIn');
    
    // Verify target="_blank"
    const target = await linkedinLink.getAttribute('target');
    expect(target).toBe('_blank');
    
    // Verify rel="noopener noreferrer" for security
    const rel = await linkedinLink.getAttribute('rel');
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  });

  test('should have proper aria-labels for accessibility', async ({ page }) => {
    const emailLink = page.getByLabel('Contact via email');
    await expect(emailLink).toHaveAttribute('aria-label', 'Contact via email');
    
    const facebookLink = page.getByLabel('Follow on Facebook');
    await expect(facebookLink).toHaveAttribute('aria-label', 'Follow on Facebook');
  });

  test('should show hover effects on social icons', async ({ page }) => {
    const emailIcon = page.getByLabel('Contact via email');
    
    // Hover and verify visual feedback
    await emailIcon.hover();
    
    // Check if hover animation is applied (scale transform)
    const transform = await emailIcon.evaluate((el) => 
      window.getComputedStyle(el).transform
    );
    
    // Should have some transform applied (not 'none')
    expect(transform).not.toBe('none');
  });

  test('should display "View Projects" secondary CTA', async ({ page }) => {
    const viewProjectsButton = page.getByRole('link', { name: /View Projects/i });
    
    await expect(viewProjectsButton).toBeVisible();
    
    // Should link to projects section
    const href = await viewProjectsButton.getAttribute('href');
    expect(href).toBe('#projects');
  });

  test('should navigate to projects section when clicking "View Projects"', async ({ page }) => {
    const viewProjectsButton = page.getByRole('link', { name: /View Projects/i });
    
    await viewProjectsButton.click();
    
    // Wait for scroll
    await page.waitForTimeout(500);
    
    // Verify projects section is in viewport
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('should have correct contact information in Portuguese', async ({ page }) => {
    await page.goto('/pt');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    await expect(page.getByRole('heading', { name: /Vamos Co-Criar o Futuro/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Agendar Chamada/i })).toBeVisible();
  });
});
