import { test, expect, Page } from '@playwright/test';
import { DemoTodoAppPage } from '../POM/demo-todo-app';

const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment'];

test.describe('New Todo', () => {
    let demoTodoAppPage: DemoTodoAppPage;

    test.beforeEach(async ({ page }) => {
        demoTodoAppPage = new DemoTodoAppPage(page);
        await demoTodoAppPage.goto();
    });

    test('should allow me to add multiple todo items', async () => {
        // Create 1st todo
        await demoTodoAppPage.addTodoItem(TODO_ITEMS[0]);
        // Verify the 1st todo
        await demoTodoAppPage.verifyTodoItemText(0, TODO_ITEMS[0]);

        // Create 2nd todo
        await demoTodoAppPage.addTodoItem(TODO_ITEMS[1]);
        // Verify the 2nd todo
        await demoTodoAppPage.verifyTodoItemText(1, TODO_ITEMS[1]);
    });

    test('should append new items to the bottom of the list', async () => {
        // Create 3 todos
        await demoTodoAppPage.addMultipleTodoItems(TODO_ITEMS);

        // Verify all 3 todos
        for (let i = 0; i < TODO_ITEMS.length; i++) {
            await demoTodoAppPage.verifyTodoItemText(i, TODO_ITEMS[i]);
        }

        // Verify todo count
        await demoTodoAppPage.verifyTodoCountText('3 items left');
        await demoTodoAppPage.verifyTodoCountText('3 items');
        await demoTodoAppPage.verifyTodoCountText(/3 items/);
        await demoTodoAppPage.verifyTodoCountText('3');
    });
});

test.describe('Mark All as Completed', () => {
    let demoTodoAppPage: DemoTodoAppPage;

    test.beforeEach(async ({ page }) => {
        demoTodoAppPage = new DemoTodoAppPage(page);
        await demoTodoAppPage.goto();
        await createDefaultTodos(demoTodoAppPage); // Adjusted to pass the page object
    });

    test('should allow me to mark all items as completed', async () => {
        await demoTodoAppPage.markAllTodosAsCompleted();
        await demoTodoAppPage.verifyAllTodosCompleted();
    });
});

// Adjusted to accept and use DemoTodoAppPage instance
async function createDefaultTodos(demoTodoAppPage: DemoTodoAppPage) {
    await demoTodoAppPage.addMultipleTodoItems(TODO_ITEMS);
}