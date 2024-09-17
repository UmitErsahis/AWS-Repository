// POM/demo-todo-app.ts

import { Page, Locator, expect } from '@playwright/test';

class DemoTodoAppPage {
    readonly page: Page;
    readonly newTodoInput: Locator;
    readonly todoTitles: Locator;
    readonly todoCount: Locator;
    readonly toggleAllCheckbox: Locator;
    readonly todoItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTodoInput = page.getByPlaceholder('What needs to be done?');
        this.todoTitles = page.locator('[data-testid="todo-title"]');
        this.todoCount = page.locator('[data-testid="todo-count"]');
        this.toggleAllCheckbox = page.locator('#toggle-all');
        this.todoItems = page.locator('[data-testid="todo-item"]');
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc');
    }

    async addTodoItem(todoText: string) {
        await this.newTodoInput.fill(todoText);
        await this.newTodoInput.press('Enter');
    }

    async addMultipleTodoItems(todoItems: string[]) {
        for (const item of todoItems) {
            await this.addTodoItem(item);
        }
    }

    async verifyTodoItemText(index: number, expectedText: string) {
        await expect(this.todoTitles.nth(index)).toHaveText(expectedText);
    }

    async verifyTodoCountText(expectedText: string | RegExp) {
        await expect(this.todoCount).toContainText(expectedText);
    }

    async markAllTodosAsCompleted() {
        await this.toggleAllCheckbox.check();
    }

    async verifyAllTodosCompleted() {
        const todoItems = await this.todoItems.all();
        for (const todo of todoItems) {
            await expect(todo).toHaveClass('completed');
        }
    }
}

export { DemoTodoAppPage };