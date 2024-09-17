// POM/son-demo-page.ts

import { Page, Locator, expect } from '@playwright/test';

class SonDemoPage {
	readonly page: Page;
	readonly newTodoInput: Locator;
	readonly todoTitles: Locator;
	readonly todoCount: Locator;
	readonly todoItems: Locator;
	readonly deleteButton: Locator;
	readonly completedButton: Locator;
	readonly activeButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.newTodoInput = page.getByPlaceholder('What needs to be done?');
		this.todoTitles = page.locator('[data-testid="todo-title"]');
		this.todoCount = page.locator('[data-testid="todo-count"]');
		this.todoItems = page.locator('[data-testid="todo-item"]');
		this.deleteButton = page.locator('button[aria-label="Delete"]');
		this.completedButton = page.locator('text="Completed"');
		this.activeButton = page.locator('text="Active"');
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

	async printTodoTexts() {
		const todoTitles = await this.todoTitles.all();
		for (const todo of todoTitles) {
			console.log(await todo.textContent());
		}
	}

	async deleteFirstTodoItem() {
		await this.todoItems.nth(0).hover();
		await this.deleteButton.nth(0).click();
	}

	async verifyTodoCountText(expectedText: string | RegExp) {
		await expect(this.todoCount).toContainText(expectedText);
	}

	async clickCompletedButton() {
		await this.completedButton.click();
	}

	async clickActiveButton() {
		await this.activeButton.click();
	}

	async verifyTodoVisibility(index: number, visible: boolean) {
		if (visible) {
			await expect(this.todoTitles.nth(index)).toBeVisible();
		} else {
			await expect(this.todoTitles.nth(index)).not.toBeVisible();
		}
	}
}

export { SonDemoPage };