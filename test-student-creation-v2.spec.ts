import { test, expect } from '@playwright/test';

test.describe('Student Creation Test - Network Monitoring', () => {
  test('should create a student and capture network request', async ({ page, context }) => {
    let capturedRequest: any = null;
    let capturedResponse: any = null;

    // Enable request interception
    await page.route('**/api/students', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        console.log('=== INTERCEPTED POST REQUEST ===');
        console.log('URL:', request.url());
        console.log('Method:', request.method());
        console.log('Headers:', request.headers());
        console.log('Post Data:', request.postData());
        capturedRequest = {
          url: request.url(),
          method: request.method(),
          postData: request.postData()
        };
      }
      // Continue with the request
      route.continue();
    });

    // Listen for responses
    page.on('response', async (response) => {
      if (response.url().includes('/api/students') && response.request().method() === 'POST') {
        console.log('=== RECEIVED RESPONSE ===');
        console.log('Status:', response.status());
        console.log('Status Text:', response.statusText());

        try {
          const responseBody = await response.json();
          console.log('Response Body:', JSON.stringify(responseBody, null, 2));
          capturedResponse = {
            status: response.status(),
            statusText: response.statusText(),
            body: responseBody
          };
        } catch (e) {
          const responseText = await response.text();
          console.log('Response Text:', responseText);
          capturedResponse = {
            status: response.status(),
            statusText: response.statusText(),
            body: responseText
          };
        }
      }
    });

    // 1. Navigate to the app
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // 2. Login
    await page.fill('input[type="email"]', 'test@test.com');
    await page.fill('input[type="password"]', 'test');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);

    // 3. Go to Schedule tab
    await page.getByRole('button', { name: 'Расписание' }).click();
    await page.waitForTimeout(1000);

    // 4. Click the user icon button next to 09:00
    const timeSlots = page.locator('[class*="flex"][class*="items-center"]:has-text("09:00")');
    const addButton = timeSlots.locator('button').first();
    await addButton.click();
    await page.waitForTimeout(1000);

    // 5. Click "Показать форму"
    await page.locator('text=Показать форму').click();
    await page.waitForTimeout(1000);

    // Take screenshot of empty form
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/network-test-1-form.png' });

    // 6. Fill out the form
    await page.locator('input[placeholder="Введите имя"]').fill('Maksym');
    await page.locator('input[placeholder="Введите фамилию"]').fill('Petrusenko');
    await page.locator('input[placeholder*="+7 (999) 123-45-67"]').fill('17865436688');
    await page.locator('input[placeholder="email@example.com"]').fill('max.petrusenko@gmail.com');

    // Take screenshot of filled form
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/network-test-2-filled.png' });

    // 7. Click submit
    await page.getByRole('button', { name: 'Добавить ученика' }).first().click();

    // Wait for response
    await page.waitForTimeout(3000);

    // Take screenshot after submit
    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/network-test-3-result.png' });

    // Print final results
    console.log('\n=== FINAL TEST RESULTS ===');
    if (capturedRequest) {
      console.log('✓ Request captured:');
      console.log('  Method:', capturedRequest.method);
      console.log('  URL:', capturedRequest.url);
      console.log('  Data:', capturedRequest.postData);
    } else {
      console.log('✗ No request captured');
    }

    if (capturedResponse) {
      console.log('✓ Response captured:');
      console.log('  Status:', capturedResponse.status);
      console.log('  Status Text:', capturedResponse.statusText);
      console.log('  Body:', JSON.stringify(capturedResponse.body, null, 2));
    } else {
      console.log('✗ No response captured');
    }
    console.log('========================\n');

    // Verify response
    if (capturedResponse) {
      expect(capturedResponse.status).toBeGreaterThanOrEqual(200);
      expect(capturedResponse.status).toBeLessThan(300);
      console.log(`✓ SUCCESS: Status code ${capturedResponse.status} (OK)`);
    }
  });
});
