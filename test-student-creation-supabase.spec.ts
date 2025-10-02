import { test, expect } from '@playwright/test';

test.describe('Student Creation Test - Supabase Monitoring', () => {
  test('should create a student via Supabase', async ({ page }) => {
    let capturedRequests: any[] = [];
    let capturedResponses: any[] = [];

    // Monitor ALL network requests
    page.on('request', async (request) => {
      const url = request.url();
      // Look for Supabase requests to students table
      if (url.includes('supabase') || url.includes('students')) {
        console.log(`→ REQUEST: ${request.method()} ${url}`);
        capturedRequests.push({
          method: request.method(),
          url: url,
          headers: request.headers(),
          postData: request.postData()
        });
      }
    });

    page.on('response', async (response) => {
      const url = response.url();
      // Look for Supabase responses
      if (url.includes('supabase') || url.includes('students')) {
        console.log(`← RESPONSE: ${response.status()} ${url}`);

        try {
          const responseBody = await response.text();
          capturedResponses.push({
            status: response.status(),
            statusText: response.statusText(),
            url: url,
            body: responseBody
          });
        } catch (e) {
          console.log('Could not read response body');
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

    // Clear captured requests from login
    capturedRequests = [];
    capturedResponses = [];

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

    // Clear requests again to focus only on the creation
    capturedRequests = [];
    capturedResponses = [];

    // 6. Fill out the form with UNIQUE data to identify this test
    const timestamp = Date.now();
    await page.locator('input[placeholder="Введите имя"]').fill('TestUser');
    await page.locator('input[placeholder="Введите фамилию"]').fill('AutoTest');
    await page.locator('input[placeholder*="+7 (999) 123-45-67"]').fill(`1${timestamp.toString().slice(-9)}`);
    await page.locator('input[placeholder="email@example.com"]').fill(`test${timestamp}@test.com`);

    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/supabase-test-filled.png' });

    // 7. Click submit
    await page.getByRole('button', { name: 'Добавить ученика' }).first().click();

    // Wait for response
    await page.waitForTimeout(3000);

    await page.screenshot({ path: '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/supabase-test-result.png' });

    // Print captured network activity
    console.log('\n=== CAPTURED REQUESTS ===');
    capturedRequests.forEach((req, i) => {
      console.log(`\nRequest ${i + 1}:`);
      console.log('  Method:', req.method);
      console.log('  URL:', req.url);
      if (req.postData) {
        console.log('  POST Data:', req.postData);
      }
    });

    console.log('\n=== CAPTURED RESPONSES ===');
    capturedResponses.forEach((res, i) => {
      console.log(`\nResponse ${i + 1}:`);
      console.log('  Status:', res.status);
      console.log('  URL:', res.url);
      console.log('  Body:', res.body);
    });
    console.log('========================\n');

    // Find the POST request for creating student
    const postRequest = capturedRequests.find(req =>
      req.method === 'POST' && req.url.includes('students')
    );

    const postResponse = capturedResponses.find(res =>
      res.url.includes('students') &&
      capturedRequests.some(req => req.method === 'POST' && req.url === res.url)
    );

    // Print results
    console.log('\n=== FINAL TEST RESULTS ===');
    if (postRequest) {
      console.log('✓ POST request detected');
      console.log('  URL:', postRequest.url);
      console.log('  Data:', postRequest.postData);
    } else {
      console.log('✗ No POST request detected');
    }

    if (postResponse) {
      console.log('✓ POST response received');
      console.log('  Status:', postResponse.status);
      console.log('  Body:', postResponse.body);

      // Verify status code
      if (postResponse.status >= 200 && postResponse.status < 300) {
        console.log(`✓ SUCCESS: Status code ${postResponse.status} (OK)`);
      } else if (postResponse.status === 400) {
        console.log('✗ FAILED: Got 400 Bad Request');
      } else {
        console.log(`✗ FAILED: Got unexpected status ${postResponse.status}`);
      }
    } else {
      console.log('✗ No POST response detected');
    }
    console.log('========================\n');
  });
});
