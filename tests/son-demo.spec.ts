import { test, expect, Page } from '@playwright/test';

const TODO_ITEMS = ['test 1', 'Test 2', 'test 3'];

test.describe('New Todo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('should allow me to add multiple todo items', async ({ page }) => {
    
    // Create a locator for the new todo input field
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create todos
    for (const todo of TODO_ITEMS) {
      await newTodo.fill(todo);
      await newTodo.press('Enter');
    }

    // Verify all todos
    const todoTitles = await page.locator('[data-testid="todo-title"]').all();

    for (let i = 0; i < TODO_ITEMS.length; i++) {
      await expect(todoTitles[i]).toHaveText(TODO_ITEMS[i]);
    }

    // Print text of the todos
    for (let i = 0; i < TODO_ITEMS.length; i++) {
      console.log(await todoTitles[i].textContent());
    }

    //delete first todo item and verify the remaining todos 
    //First hover over the todo item and then click on the delete button
    await page.locator('[data-testid="todo-item"]').nth(0).hover();
    await page.locator('button[aria-label="Delete"]').nth(0).click();
    await expect(page.locator('[data-testid="todo-title"]').nth(0)).toHaveText(TODO_ITEMS[1]);
    await expect(page.locator('[data-testid="todo-title"]').nth(1)).toHaveText(TODO_ITEMS[2]);

    //click on Completed button with any text locator and verify todos are not anymore with  visible methods
    await page.locator('text="Completed"').click();
    await expect(page.locator('[data-testid="todo-title"]').nth(0)).not.toBeVisible();
    await expect(page.locator('[data-testid="todo-title"]').nth(1)).not.toBeVisible();

    //take text todo-count and verify it is 2
    const todoCount = await page.locator('[data-testid="todo-count"]').textContent();
    await expect(todoCount).toBe('2 items left');
    console.log(todoCount);

    //click on Active button with any text locator and verify todos are visible again
    await page.locator('text="Active"').click();
    await expect(page.locator('[data-testid="todo-title"]').nth(0)).toBeVisible();
    await expect(page.locator('[data-testid="todo-title"]').nth(1)).toBeVisible();



    







    


    }); 
});
