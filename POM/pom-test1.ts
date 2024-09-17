// POM/playwright-page.ts

import { Page, Locator, expect } from '@playwright/test';

class PlaywrightPage {
	readonly page: Page;
	readonly docsLink: Locator;
	readonly writingTestsLink: Locator;
	readonly performActionsText: Locator;
	readonly annotationsLink: Locator;
	readonly h1Locator: Locator;
	readonly introductionLocator: Locator;

	constructor(page: Page) {
		this.page = page;
		this.docsLink = page.getByRole('link', { name: 'Docs' });
		this.writingTestsLink = page.getByRole('link', { name: 'Writing tests', exact: true });
		this.performActionsText = page.getByText('perform actions', { exact: true });
		this.annotationsLink = page.getByRole('link', { name: 'Annotations' });
		this.h1Locator = page.locator('h1');
		this.introductionLocator = page.locator('#introduction');
	}

	async goto() {
		await this.page.goto('https://playwright.dev/');
	}

	async clickDocsLink() {
		await this.docsLink.click();
	}

	async clickWritingTestsLink() {
		await this.writingTestsLink.click();
	}

	async verifyH1Text(expectedText: string) {
		await expect(this.h1Locator).toContainText(expectedText);
	}

	async clickPerformActionsText() {
		await this.performActionsText.click();
	}

	async pressControlOrMetaArrowLeft(times: number) {
		for (let i = 0; i < times; i++) {
			await this.page.locator('body').press('ControlOrMeta+ArrowLeft');
		}
	}

	async clickAnnotationsLink() {
		await this.annotationsLink.click();
	}

	async verifyIntroductionText(expectedText: string) {
		await expect(this.introductionLocator).toContainText(expectedText);
	}
}

export { PlaywrightPage };