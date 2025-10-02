import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:5175';
const SCREENSHOTS_DIR = '/Users/maxpetrusenko/Desktop/Projects/FitTrak-Pro/test-screenshots';

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

interface TestResult {
  operation: string;
  status: string;
  httpCode: string;
  error: string;
  screenshot: string;
}

const results: TestResult[] = [];
const consoleErrors: string[] = [];

test.describe('Students Section CRUD Testing', () => {
  let page: Page;
  let studentId: string | null = null;

  test.setTimeout(120000); // 2 minutes per test

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    // Set longer timeout
    page.setDefaultTimeout(60000);

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Capture page errors
    page.on('pageerror', err => {
      consoleErrors.push(`Page Error: ${err.message}`);
    });
  });

  test('Phase 1: Login and Navigate to Students Section', async () => {
    try {
      // Navigate to login page
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Login
      await page.fill('input[type="email"]', 'test@test.com');
      await page.fill('input[type="password"]', 'test');
      await page.click('button[type="submit"]');

      // Wait for navigation
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-after-login.png'), fullPage: true });

      // Navigate to "Кабинет" tab
      const cabinetTab = page.locator('button:has-text("Кабинет")');
      await cabinetTab.click();

      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-cabinet-tab.png'), fullPage: true });

      // Now click on "Ученики" tab
      const studentsTab = page.locator('[role="tab"]:has-text("Ученики")').or(page.locator('button:has-text("Ученики")')).first();
      await studentsTab.click();

      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-students-section-loaded.png'), fullPage: true });

      results.push({
        operation: 'Load Section',
        status: '✅',
        httpCode: 'N/A',
        error: 'none',
        screenshot: '03-students-section-loaded.png'
      });
    } catch (error) {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-students-section-ERROR.png'), fullPage: true });
      results.push({
        operation: 'Load Section',
        status: '❌',
        httpCode: 'N/A',
        error: String(error),
        screenshot: '03-students-section-ERROR.png'
      });
      throw error;
    }
  });

  test('Phase 2: CREATE - Add New Student', async () => {
    try {
      // Find and click "Добавить ученика" button
      const addButton = page.locator('text=Добавить ученика').or(page.locator('button:has-text("Добавить")')).first();
      await addButton.click();

      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-add-student-form.png'), fullPage: true });

      // Fill form fields
      // Name (Имя)
      const nameInput = page.locator('input[name="firstName"]').or(page.locator('input[placeholder*="Имя"]')).first();
      await nameInput.fill('TestUser');

      // Last name (Фамилия)
      const lastNameInput = page.locator('input[name="lastName"]').or(page.locator('input[placeholder*="Фамилия"]')).first();
      await lastNameInput.fill('Automated');

      // Birth date (Дата рождения)
      const birthDateInput = page.locator('input[name="dateOfBirth"]').or(page.locator('input[type="date"]')).first();
      await birthDateInput.fill('2000-01-01');

      // Phone (Телефон)
      const phoneInput = page.locator('input[name="phone"]').or(page.locator('input[type="tel"]')).first();
      await phoneInput.fill('+79999999999');

      // Email
      const emailInput = page.locator('input[name="email"]').or(page.locator('input[type="email"]')).first();
      await emailInput.fill('test@automated.com');

      // Try to fill optional fields if present
      try {
        const weightInput = page.locator('input[name="weight"]').first();
        if (await weightInput.isVisible({ timeout: 1000 })) {
          await weightInput.fill('70');
        }
      } catch (e) { }

      try {
        const heightInput = page.locator('input[name="height"]').first();
        if (await heightInput.isVisible({ timeout: 1000 })) {
          await heightInput.fill('175');
        }
      } catch (e) { }

      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-add-student-form-filled.png'), fullPage: true });

      // Listen for API response
      const responsePromise = page.waitForResponse(response =>
        response.url().includes('/api/pupils') && response.request().method() === 'POST'
      );

      // Submit form
      const submitButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Сохранить")')).or(page.locator('button:has-text("Добавить")')).last();
      await submitButton.click();

      // Wait for response
      const response = await responsePromise;
      const status = response.status();

      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-add-student-success.png'), fullPage: true });

      // Try to extract student ID from response
      try {
        const responseBody = await response.json();
        studentId = responseBody.id || responseBody.pupil?.id || null;
      } catch (e) { }

      results.push({
        operation: 'Add Student',
        status: status === 201 ? '✅' : '❌',
        httpCode: String(status),
        error: status === 201 ? 'none' : `Expected 201, got ${status}`,
        screenshot: '06-add-student-success.png'
      });
    } catch (error) {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-add-student-ERROR.png'), fullPage: true });
      results.push({
        operation: 'Add Student',
        status: '❌',
        httpCode: 'N/A',
        error: String(error),
        screenshot: '06-add-student-ERROR.png'
      });
    }
  });

  test('Phase 3: READ - View Student Details', async () => {
    try {
      await page.waitForTimeout(1000);

      // Find and click on the newly created student
      // Look for "TestUser Automated" or similar
      const studentCard = page.locator('text=TestUser').or(page.locator('text=Automated')).first();
      await studentCard.click();

      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07-view-student-details.png'), fullPage: true });

      // Check if there are tabs and try to click them
      const tabs = page.locator('[role="tab"]');
      const tabCount = await tabs.count();

      for (let i = 0; i < Math.min(tabCount, 3); i++) {
        try {
          await tabs.nth(i).click();
          await page.waitForTimeout(500);
        } catch (e) { }
      }

      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08-view-student-tabs.png'), fullPage: true });

      results.push({
        operation: 'View Student',
        status: '✅',
        httpCode: 'N/A',
        error: 'none',
        screenshot: '07-view-student-details.png'
      });
    } catch (error) {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07-view-student-ERROR.png'), fullPage: true });
      results.push({
        operation: 'View Student',
        status: '❌',
        httpCode: 'N/A',
        error: String(error),
        screenshot: '06-view-student-ERROR.png'
      });
    }
  });

  test('Phase 4: UPDATE - Edit Student', async () => {
    try {
      // Find edit button - look for "Редактировать" or edit icon
      const editButton = page.locator('text=Редактировать').or(page.locator('button:has-text("Редактировать")')).or(page.locator('[aria-label*="Edit"]')).first();
      await editButton.click();

      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09-edit-student-form.png'), fullPage: true });

      // Modify fields
      const phoneInput = page.locator('input[name="phone"]').or(page.locator('input[type="tel"]')).first();
      await phoneInput.fill('+79888888888');

      try {
        const weightInput = page.locator('input[name="weight"]').first();
        if (await weightInput.isVisible({ timeout: 1000 })) {
          await weightInput.fill('75');
        }
      } catch (e) { }

      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10-edit-student-modified.png'), fullPage: true });

      // Listen for API response
      const responsePromise = page.waitForResponse(response =>
        response.url().includes('/api/pupils') && (response.request().method() === 'PUT' || response.request().method() === 'PATCH')
      );

      // Submit changes
      const saveButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Сохранить")')).last();
      await saveButton.click();

      const response = await responsePromise;
      const status = response.status();

      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11-edit-student-success.png'), fullPage: true });

      results.push({
        operation: 'Edit Student',
        status: status === 200 ? '✅' : '❌',
        httpCode: String(status),
        error: status === 200 ? 'none' : `Expected 200, got ${status}`,
        screenshot: '11-edit-student-success.png'
      });
    } catch (error) {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '11-edit-student-ERROR.png'), fullPage: true });
      results.push({
        operation: 'Edit Student',
        status: '❌',
        httpCode: 'N/A',
        error: String(error),
        screenshot: '10-edit-student-ERROR.png'
      });
    }
  });

  test('Phase 5: DELETE - Remove Student', async () => {
    try {
      // Navigate back to students list if needed
      const backButton = page.locator('text=Назад').or(page.locator('button:has-text("Назад")')).or(page.locator('[aria-label*="Back"]'));
      if (await backButton.count() > 0) {
        await backButton.first().click();
        await page.waitForTimeout(1000);
      }

      // Navigate back to students section
      const studentsLink = page.locator('text=Ученики').first();
      await studentsLink.click();
      await page.waitForTimeout(1500);

      // Find the test student again
      const studentCard = page.locator('text=TestUser').or(page.locator('text=Automated')).first();
      await studentCard.click();
      await page.waitForTimeout(1000);

      // Find delete button
      const deleteButton = page.locator('text=Удалить').or(page.locator('button:has-text("Удалить")')).or(page.locator('[aria-label*="Delete"]')).first();
      await deleteButton.click();

      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '12-delete-confirmation.png'), fullPage: true });

      // Listen for API response
      const responsePromise = page.waitForResponse(response =>
        response.url().includes('/api/pupils') && response.request().method() === 'DELETE'
      );

      // Confirm deletion
      const confirmButton = page.locator('button:has-text("Удалить")').or(page.locator('button:has-text("Подтвердить")')).or(page.locator('button:has-text("Да")')).last();
      await confirmButton.click();

      const response = await responsePromise;
      const status = response.status();

      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '13-delete-student-success.png'), fullPage: true });

      results.push({
        operation: 'Delete Student',
        status: status === 200 ? '✅' : '❌',
        httpCode: String(status),
        error: status === 200 ? 'none' : `Expected 200, got ${status}`,
        screenshot: '13-delete-student-success.png'
      });
    } catch (error) {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '13-delete-student-ERROR.png'), fullPage: true });
      results.push({
        operation: 'Delete Student',
        status: '❌',
        httpCode: 'N/A',
        error: String(error),
        screenshot: '12-delete-student-ERROR.png'
      });
    }
  });

  test('Phase 6: Test Other Buttons', async () => {
    try {
      // Navigate to students section
      await page.goto(`${BASE_URL}/cabinet/students`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      let buttonsTested = 0;

      // Test search functionality
      try {
        const searchInput = page.locator('input[type="search"]').or(page.locator('input[placeholder*="Поиск"]')).first();
        if (await searchInput.isVisible({ timeout: 2000 })) {
          await searchInput.fill('test');
          await page.waitForTimeout(1000);
          await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '14-search-test.png'), fullPage: true });
          buttonsTested++;
          results.push({
            operation: 'Search Function',
            status: '✅',
            httpCode: 'N/A',
            error: 'none',
            screenshot: '14-search-test.png'
          });
        }
      } catch (e) {
        results.push({
          operation: 'Search Function',
          status: '❌',
          httpCode: 'N/A',
          error: 'Search not found or not working',
          screenshot: 'N/A'
        });
      }

      // Test filter/sort buttons
      try {
        const filterButtons = page.locator('button:has-text("Фильтр")').or(page.locator('button:has-text("Сортировка")'));
        if (await filterButtons.count() > 0) {
          await filterButtons.first().click();
          await page.waitForTimeout(500);
          await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '15-filter-test.png'), fullPage: true });
          buttonsTested++;
          results.push({
            operation: 'Filter/Sort Button',
            status: '✅',
            httpCode: 'N/A',
            error: 'none',
            screenshot: '15-filter-test.png'
          });
        }
      } catch (e) { }

      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '16-final-state.png'), fullPage: true });

    } catch (error) {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '15-other-buttons-ERROR.png'), fullPage: true });
    }
  });

  test.afterAll(async () => {
    // Generate report
    const report = {
      results,
      consoleErrors,
      totalButtonsTested: results.length,
      timestamp: new Date().toISOString()
    };

    fs.writeFileSync(
      path.join(SCREENSHOTS_DIR, 'test-report.json'),
      JSON.stringify(report, null, 2)
    );

    await page.close();
  });
});
