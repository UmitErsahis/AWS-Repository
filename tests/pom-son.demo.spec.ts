// tests/son-demo.spec.ts

import { test, expect } from '@playwright/test';
import { SonDemoPage} from '../POM/son-demo';

const TODO_ITEMS = ['test 1', 'Test 2', 'test 3'];

test.describe('New Todo', () => {
  test.beforeEach(async ({ page }) => {
	const sonDemoPage = new SonDemoPage(page);
	await sonDemoPage.goto();
  });

  test('should allow me to add multiple todo items', async ({ page }) => {
	const sonDemoPage = new SonDemoPage(page);

	// Create todos
	await sonDemoPage.addMultipleTodoItems(TODO_ITEMS);

	// Verify all todos
	for (let i = 0; i < TODO_ITEMS.length; i++) {
	  await sonDemoPage.verifyTodoItemText(i, TODO_ITEMS[i]);
	}

	// Print text of the todos
	await sonDemoPage.printTodoTexts();

	// Delete first todo item and verify the remaining todos
	await sonDemoPage.deleteFirstTodoItem();
	await sonDemoPage.verifyTodoItemText(0, TODO_ITEMS[1]);
	await sonDemoPage.verifyTodoItemText(1, TODO_ITEMS[2]);

	// Click on Completed button and verify todos are not visible
	await sonDemoPage.clickCompletedButton();
	await sonDemoPage.verifyTodoVisibility(0, false);
	await sonDemoPage.verifyTodoVisibility(1, false);

	// Verify todo count
	await sonDemoPage.verifyTodoCountText('2 items left');

	// Click on Active button and verify todos are visible again
	await sonDemoPage.clickActiveButton();
	await sonDemoPage.verifyTodoVisibility(0, true);
	await sonDemoPage.verifyTodoVisibility(1, true);
  });
});