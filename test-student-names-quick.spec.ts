import { test, expect } from '@playwright/test';

test('Quick Verification - Student Names and Ages', async ({ page }) => {
  console.log('\n=== STARTING QUICK VERIFICATION TEST ===\n');

  // Step 1: Login
  console.log('Step 1: Logging in...');
  await page.goto('http://localhost:5173/');
  await page.fill('input[type="email"]', 'test@test.com');
  await page.fill('input[type="password"]', 'test');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard', { timeout: 10000 });
  console.log('✅ Login successful');

  // Step 2: Navigate to Students section
  console.log('\nStep 2: Navigating to Students section...');
  // Click the "Ученики" button if it exists in navigation, otherwise use JavaScript
  const studentsButtonExists = await page.locator('button:has-text("Ученики")').count() > 0;

  if (studentsButtonExists) {
    await page.click('button:has-text("Ученики")');
    console.log('✅ Clicked Students button in navigation');
  } else {
    // Students button doesn't exist in nav, need to access via other method
    // Check the page HTML to understand the structure
    const pageContent = await page.content();
    console.log('⚠️  Students button not found in navigation menu');
    console.log('⚠️  This is a navigation bug - students section exists but is not accessible');
  }

  await page.waitForTimeout(3000); // Wait for data to load

  // Step 3: Check for student names visibility
  console.log('\nStep 3: Checking for student names...');
  const studentsVisible = await page.locator('text=Maksym Petrusenko').isVisible({ timeout: 5000 }).catch(() => false);
  const testUserVisible = await page.locator('text=TestUser Automated').isVisible({ timeout: 5000 }).catch(() => false);

  console.log(`Names visible check:`);
  console.log(`  - "Maksym Petrusenko": ${studentsVisible ? '✅' : '❌'}`);
  console.log(`  - "TestUser Automated": ${testUserVisible ? '✅' : '❌'}`);

  // Step 4: Check for age display (looking for "NaN лет" issue)
  console.log('\nStep 4: Checking age display...');
  const nanAgesPresent = await page.locator('text=NaN лет').count();
  const ageDisplayCorrect = nanAgesPresent === 0;
  console.log(`Age display: ${ageDisplayCorrect ? '✅ No NaN errors' : `❌ Found ${nanAgesPresent} "NaN лет" instances`}`);

  // Step 5: Try clicking on a student
  console.log('\nStep 5: Testing student click...');
  let canClickStudent = false;
  try {
    // Look for any student card or row
    const studentElement = page.locator('[data-student-id], .student-card, .student-row').first();
    if (await studentElement.count() > 0) {
      await studentElement.click({ timeout: 3000 });
      await page.waitForTimeout(1000);
      canClickStudent = true;
      console.log('✅ Successfully clicked student');
    } else {
      // Try alternative: click on student name
      const nameElement = page.locator('text=Maksym Petrusenko, text=TestUser Automated').first();
      if (await nameElement.count() > 0) {
        await nameElement.click({ timeout: 3000 });
        await page.waitForTimeout(1000);
        canClickStudent = true;
        console.log('✅ Successfully clicked student name');
      } else {
        console.log('❌ Could not find clickable student element');
      }
    }
  } catch (error) {
    console.log(`❌ Failed to click student: ${error}`);
  }

  // Step 6: Take screenshot
  console.log('\nStep 6: Taking screenshot...');
  const screenshotPath = '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/test-results/student-list-verification.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`📸 Screenshot saved to: ${screenshotPath}`);

  // Final Report
  console.log('\n=== VERIFICATION RESULTS ===');
  console.log(`${studentsVisible || testUserVisible ? '✅' : '❌'} Names visible: ${studentsVisible || testUserVisible ? 'YES' : 'NO'}`);
  console.log(`${ageDisplayCorrect ? '✅' : '❌'} Ages correct: ${ageDisplayCorrect ? 'YES' : 'NO'}`);
  console.log(`${canClickStudent ? '✅' : '❌'} Can click student: ${canClickStudent ? 'YES' : 'NO'}`);
  console.log(`📸 Screenshot: ${screenshotPath}`);
  console.log('=============================\n');

  // Assertions
  expect(studentsVisible || testUserVisible, 'Student names should be visible').toBe(true);
  expect(ageDisplayCorrect, 'Ages should not show NaN').toBe(true);
  expect(canClickStudent, 'Should be able to click on a student').toBe(true);
});
