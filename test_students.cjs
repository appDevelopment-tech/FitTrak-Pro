const { chromium } = require('playwright');

async function testStudentsSection() {
  const results = {
    ages_display: null,
    view_profile: null,
    edit_student: null,
    delete_student: null,
    errors: []
  };

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      results.errors.push(`Console ${msg.type()}: ${msg.text()}`);
    }
  });
  page.on('pageerror', err => results.errors.push(`Page error: ${err.toString()}`));

  try {
    // Step 1: Navigate and login
    console.log('Step 1: Navigating to login...');
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');

    // Fill login form
    await page.fill('input[type="email"]', 'test@test.com');
    await page.fill('input[type="password"]', 'test');
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Step 2: Navigate to Students section
    console.log('Step 2: Navigating to Students section...');
    await page.click('text=Ученики');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Step 3: Verify ages display correctly (NOT NaN)
    console.log('Step 3: Checking age display...');
    const nanCount = await page.locator('text="NaN лет"').count();
    const agePattern = await page.locator('text=/\\d+ лет/').count();

    if (nanCount > 0) {
      results.ages_display = '❌';
      results.errors.push(`Found ${nanCount} students with 'NaN лет'`);
    } else if (agePattern > 0) {
      results.ages_display = '✅';
      console.log(`Found ${agePattern} students with valid ages`);
    } else {
      results.ages_display = '❌';
      results.errors.push('No age elements found');
    }

    // Step 4: Click on a student to view profile
    console.log('Step 4: Viewing student profile...');
    const studentCards = await page.locator('[class*="cursor-pointer"]').all();
    if (studentCards.length > 0) {
      await studentCards[0].click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Check if profile opened
      const profileVisible = await page.locator('text=/Профиль|Информация|ФИО/').count() > 0;
      results.view_profile = profileVisible ? '✅' : '❌';

      if (!profileVisible) {
        results.errors.push('Student profile did not open or load correctly');
      }

      await page.screenshot({ path: '/tmp/student_profile.png' });
      console.log('Screenshot saved: /tmp/student_profile.png');
    } else {
      results.view_profile = '❌';
      results.errors.push('No student cards found to click');
    }

    // Step 5: Try to edit student
    console.log('Step 5: Attempting to edit student...');
    const editButtonCount = await page.locator('button:has-text("Редактировать"), button:has-text("Изменить")').count();
    if (editButtonCount > 0) {
      await page.locator('button:has-text("Редактировать"), button:has-text("Изменить")').first().click();
      await page.waitForTimeout(1000);

      // Check if edit form/dialog opened
      const editFormVisible = await page.locator('input[name="fullName"], input[placeholder*="ФИО"]').count() > 0;
      results.edit_student = editFormVisible ? '✅' : '❌';

      if (!editFormVisible) {
        results.errors.push('Edit form did not open');
      } else {
        // Close the edit dialog/form
        const cancelCount = await page.locator('button:has-text("Отмена"), button:has-text("Закрыть")').count();
        if (cancelCount > 0) {
          await page.locator('button:has-text("Отмена"), button:has-text("Закрыть")').first().click();
          await page.waitForTimeout(500);
        }
      }
    } else {
      results.edit_student = '❌';
      results.errors.push('Edit button not found');
    }

    // Step 6: Try to delete student
    console.log('Step 6: Attempting to delete student...');
    const deleteButtonCount = await page.locator('button:has-text("Удалить")').count();
    if (deleteButtonCount > 0) {
      await page.locator('button:has-text("Удалить")').first().click();
      await page.waitForTimeout(1000);

      // Check if confirmation dialog appeared
      const confirmDialog = await page.locator('text=/Вы уверены|Подтвердите|Удалить ученика/').count() > 0;
      results.delete_student = confirmDialog ? '✅' : '❌';

      if (!confirmDialog) {
        results.errors.push('Delete confirmation dialog did not appear');
      } else {
        // Cancel the deletion
        const cancelCount = await page.locator('button:has-text("Отмена"), button:has-text("Нет")').count();
        if (cancelCount > 0) {
          await page.locator('button:has-text("Отмена"), button:has-text("Нет")').last().click();
          await page.waitForTimeout(500);
        }
      }
    } else {
      results.delete_student = '❌';
      results.errors.push('Delete button not found');
    }

    // Take final screenshot
    await page.screenshot({ path: '/tmp/students_final.png' });
    console.log('Final screenshot saved: /tmp/students_final.png');

  } catch (error) {
    results.errors.push(`Test execution error: ${error.message}`);
    await page.screenshot({ path: '/tmp/error_screenshot.png' });
  } finally {
    await browser.close();
  }

  return results;
}

testStudentsSection().then(results => {
  console.log('\n=== TEST RESULTS ===');
  console.log(`Ages display correctly: ${results.ages_display}`);
  console.log(`Can view student profile: ${results.view_profile}`);
  console.log(`Can edit student: ${results.edit_student}`);
  console.log(`Can delete student: ${results.delete_student}`);

  if (results.errors.length > 0) {
    console.log('\nErrors found:');
    results.errors.forEach(err => console.log(`  - ${err}`));
  } else {
    console.log('\nNo errors detected!');
  }

  process.exit(results.errors.length > 0 ? 1 : 0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
