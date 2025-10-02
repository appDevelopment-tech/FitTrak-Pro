import { test, expect } from '@playwright/test';

test('FitTrak-Pro Smoke Test', async ({ page }) => {
  const results: string[] = [];

  // Set up console error tracking
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Filter out favicon errors
      if (!text.includes('favicon')) {
        consoleErrors.push(text);
      }
    }
  });

  // Track page errors
  page.on('pageerror', error => {
    consoleErrors.push(error.message);
  });

  try {
    // 1. Navigate to login page
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

    // Check if already logged in
    if (page.url().includes('dashboard') || page.url().includes('cabinet')) {
      results.push('✅ Already logged in - redirected to dashboard/cabinet');
    } else {
      // 2. Test Login
      const emailInput = await page.$('input[type="email"]');
      const passwordInput = await page.$('input[type="password"]');

      if (!emailInput || !passwordInput) {
        throw new Error('Login form not found on page');
      }

      await emailInput.fill('test@test.com');
      await passwordInput.fill('test');

      const submitButton = await page.$('button[type="submit"]');
      if (!submitButton) {
        throw new Error('Submit button not found');
      }

      await submitButton.click();

      // Wait for navigation after login (either dashboard or cabinet)
      try {
        await page.waitForURL(/\/(dashboard|cabinet)/, { timeout: 10000 });
        results.push('✅ Login works');
      } catch (e) {
        throw new Error(`Login failed. Current URL: ${page.url()}`);
      }
    }

    // 3. Navigate to Cabinet (Кабинет) section first
    await page.waitForLoadState('networkidle');

    // Click on Кабинет button if we're on dashboard
    if (page.url().includes('dashboard')) {
      const cabinetButton = await page.$('button:has-text("Кабинет")');
      if (cabinetButton) {
        await cabinetButton.click();
        await page.waitForLoadState('networkidle');
      }
    }

    // Now look for Students (Ученики) section
    // Try multiple selectors
    let studentsLink = await page.$('text=Ученики');

    if (!studentsLink) {
      studentsLink = await page.$('a[href*="students"]');
    }

    if (!studentsLink) {
      studentsLink = await page.$('a[href*="pupils"]');
    }

    if (!studentsLink) {
      studentsLink = await page.$('button:has-text("Ученики")');
    }

    if (!studentsLink) {
      // Maybe it's a tab or section - try div with text
      studentsLink = await page.$('[role="tab"]:has-text("Ученики")');
    }

    if (!studentsLink) {
      // Get all visible text elements for debugging
      const pageText = await page.evaluate(() => document.body.innerText);
      const hasStudentsText = pageText.includes('Ученики');

      if (hasStudentsText) {
        // Text exists but not clickable - try to click directly
        await page.click('text=Ученики');
      } else {
        throw new Error(`Students (Ученики) not found on page. Page contains: ${pageText.substring(0, 500)}`);
      }
    } else {
      await studentsLink.click();
    }

    await page.waitForLoadState('networkidle');

    // Wait for students section to load
    try {
      // Wait a bit for the section to render
      await page.waitForTimeout(1000);

      // Check if we can see "Ученики" in the heading
      const hasStudentsHeading = await page.$('h1:has-text("Ученики"), h2:has-text("Ученики")');

      if (hasStudentsHeading) {
        results.push('✅ Students section loads');
      } else {
        // Check if students list or table is visible
        const pageContent = await page.evaluate(() => document.body.innerText);
        if (pageContent.includes('Ученики')) {
          results.push('✅ Students section loads (text found)');
        } else {
          throw new Error('Students heading not found');
        }
      }
    } catch (e) {
      // Try to find any h1/h2 to see what loaded
      const headingText = await page.evaluate(() => {
        const h1 = document.querySelector('h1, h2');
        return h1 ? h1.textContent : 'No heading found';
      });
      const currentUrl = page.url();
      throw new Error(`Students section failed to load. Current URL: ${currentUrl}, Found heading: "${headingText}"`);
    }

    // 4. Check for localeCompare error
    const hasLocaleCompareError = consoleErrors.some(err =>
      err.toLowerCase().includes('localecompare')
    );

    if (hasLocaleCompareError) {
      results.push('❌ localeCompare error found');
    } else {
      results.push('✅ No localeCompare error');
    }

    // Report all errors
    if (consoleErrors.length > 0) {
      results.push('\n📋 Console Errors:');
      consoleErrors.forEach(err => {
        results.push(`  - ${err}`);
      });
    } else {
      results.push('\n✨ No console errors found');
    }

  } catch (error) {
    results.push(`❌ Test failed: ${error}`);

    // Add current console errors to results
    if (consoleErrors.length > 0) {
      results.push('\n📋 Console Errors at failure:');
      consoleErrors.forEach(err => {
        results.push(`  - ${err}`);
      });
    }
  }

  // Print results
  console.log('\n' + '='.repeat(50));
  console.log('SMOKE TEST RESULTS');
  console.log('='.repeat(50));
  results.forEach(r => console.log(r));
  console.log('='.repeat(50) + '\n');
});
