import { test, expect, Page } from '@playwright/test';

test.describe('Student Creation Test', () => {
  let requestData: any = null;
  let responseData: any = null;
  let statusCode: number | null = null;

  test('should create a student through Schedule page', async ({ page }) => {
    // Set up network request interception
    page.on('response', async (response) => {
      if (response.url().includes('/api/students') && response.request().method() === 'POST') {
        statusCode = response.status();
        try {
          responseData = await response.json();
        } catch (e) {
          responseData = await response.text();
        }
      }
    });

    page.on('request', async (request) => {
      if (request.url().includes('/api/students') && request.method() === 'POST') {
        try {
          requestData = request.postDataJSON();
        } catch (e) {
          requestData = request.postData();
        }
      }
    });

    // 1. Navigate to the app
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // Take screenshot of login page
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/screenshot-1-login.png' });

    // 2. Login
    await page.fill('input[type="email"]', 'test@test.com');
    await page.fill('input[type="password"]', 'test');
    await page.click('button[type="submit"]');

    // Wait for navigation after login
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/screenshot-2-after-login.png' });

    // 3. Go to Schedule tab (Расписание)
    const scheduleTab = page.getByRole('button', { name: 'Расписание' });
    await scheduleTab.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/screenshot-3-schedule-tab.png' });

    // 4. Click the user icon button next to 09:00 time slot
    // The buttons with user icons are next to each time slot
    const timeSlots = page.locator('[class*="flex"][class*="items-center"]:has-text("09:00")');
    const addButton = timeSlots.locator('button').first();
    await addButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/screenshot-4-dialog-opened.png' });

    // 5. Click "Показать форму" under "Добавить нового ученика"
    const showFormButton = page.locator('text=Показать форму');
    await showFormButton.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/screenshot-5-form-visible.png' });

    // 6. Fill out the form
    // Use placeholder text to locate inputs
    await page.locator('input[placeholder="Введите имя"]').fill('Maksym');
    await page.locator('input[placeholder="Введите фамилию"]').fill('Petrusenko');
    await page.locator('input[placeholder*="+7 (999) 123-45-67"]').fill('17865436688');
    await page.locator('input[placeholder="email@example.com"]').fill('max.petrusenko@gmail.com');

    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/screenshot-6-form-filled.png' });

    // 7. Click "Добавить ученика" button (the orange button in the form)
    const submitButton = page.getByRole('button', { name: 'Добавить ученика' }).first();
    await submitButton.click();

    // Wait for the request to complete
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/screenshot-7-after-submit.png' });

    // Check console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Take final screenshot
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/screenshot-8-final.png' });

    // Output results
    console.log('\n=== TEST RESULTS ===');
    console.log('HTTP Status Code:', statusCode);
    console.log('Request Data:', JSON.stringify(requestData, null, 2));
    console.log('Response Data:', JSON.stringify(responseData, null, 2));
    console.log('Console Errors:', consoleErrors);
    console.log('===================\n');

    // Assertions
    if (statusCode) {
      console.log(`✓ Status Code: ${statusCode}`);
      if (statusCode === 200 || statusCode === 201) {
        console.log('✓ SUCCESS: Student created successfully');
      } else if (statusCode === 400) {
        console.log('✗ FAILED: Got 400 Bad Request');
      } else {
        console.log(`✗ FAILED: Got unexpected status ${statusCode}`);
      }
    } else {
      console.log('✗ No POST request to /api/students was detected');
    }
  });
});
