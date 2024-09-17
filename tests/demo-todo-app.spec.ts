import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

test.describe('New Todo', () => {
  test('should allow me to add multiple todo items', async ({ page }) => {
    // Create a locator for the new todo input field
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create 1st todo
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    //Verify the 1st todo with the locator getByTestId('todo-title')
    expect(page.locator('[data-testid="todo-title"]').nth(0)).toHaveText(TODO_ITEMS[0]);
    
    //Print text of the 1st todo with nth(0)
    console.log(await page.locator('[data-testid="todo-title"]').nth(0).textContent());


    // Create 2nd todo
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    //Verify the 2nd todo with the locator getByTestId('todo-title')
    expect((page.locator('[data-testid="todo-title"]').nth(1))).toHaveText(TODO_ITEMS[1]);

    //Print text of the 2nd todo
    console.log(await page.locator('[data-testid="todo-title"]').nth(1).textContent());

    
  });

  //write new test block in which it should append new items to the bottom of the list with forEach loop
  test('should append new items to the bottom of the list', async ({ page }) => {
    // Create a locator for the new todo input field
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create 3 todos
    for (const todo of TODO_ITEMS) {
      await newTodo.fill(todo);
      await newTodo.press('Enter');
    }

    // Verify all 3 todos with the locator getByTestId('todo-title')
    const todoTitles = await page.locator('[data-testid="todo-title"]').all();
    for (let i = 0; i < TODO_ITEMS.length; i++) {
      await expect(todoTitles[i]).toHaveText(TODO_ITEMS[i]);
    }

    //Print text of the 3 todos
    for (let i = 0; i < TODO_ITEMS.length; i++) {
      console.log(await todoTitles[i].textContent());
    }

    //First create a todo count locator
    const todoCount = page.locator('[data-testid="todo-count"]');

    //Now verify text of todo count locator using 4 different methods by stating "1st Method, 2rd Method and ..." in which 3rd method is using Regex
    //1st Method
    await expect(todoCount).toHaveText('3 items left');
    //2nd Method
    await expect(todoCount).toContainText('3 items');
    //3rd Method
    await expect(todoCount).toContainText(/3 items/);

    //4th Method
    await expect(todoCount).toContainText('3');
});
      

});

//create another test.describe block for the "Mark All as Completed" with an empty test.beforeEach block and empty test block
test.describe('Mark All as Completed', () => {
  test.beforeEach(async ({ page }) => {
    //call the createDefaultTodos method
    await createDefaultTodos(page);
    

  });

  test('should allow me to mark all items as completed', async ({ page }) => {
    //Check all todos with locator '#toggle-all'
    const toggleAll = page.locator('#toggle-all');
    await toggleAll.check();

    // Ensure all todos have 'completed' class with 2 diffrent methods and with for loop
    const todoItems = await page.getByTestId('todo-item').all();

    for (const todo of todoItems) {
     await expect(todo).toHaveClass('completed');
    }
    });

    //write another test block and it should clear text input field when an item is added'
    test('should clear text input field when an item is added', async ({ page }) => {
      // Create a locator for the new todo input field
      const newTodo = page.getByPlaceholder('What needs to be done?');

      // Create a new todo
      await newTodo.fill(TODO_ITEMS[0]);
      await newTodo.press('Enter');

      // Verify the input field is empty
      await expect(newTodo).toHaveValue('');

    
});

  //write another test block and it should allow me to mark items as complete
  test('should allow me to mark items as complete', async ({ page }) => {
    // Create a locator for the new todo input field
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create a new todo
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Mark the todo as completed
    const markAllComplete = page.locator('label[for="toggle-all"]');
    await markAllComplete.check();

    // Verify all todos have 'completed' class
    const todoItems = await page.locator('[data-testid="todo-item"]').all();
    for (const todo of todoItems) {
      await expect(todo).toHaveClass('completed');
    }
  });
  

 //Create a Default Todos method
  async function createDefaultTodos(page:Page) {
    const newTodo = page.getByPlaceholder('What needs to be done?');

    for (const todo of TODO_ITEMS) {
      await newTodo.fill(todo);
      await newTodo.press('Enter');
    }
  }
});

