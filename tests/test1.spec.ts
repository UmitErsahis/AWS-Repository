import { test } from '@playwright/test';
import { PlaywrightPage } from '../POM/pom-test1';
import { checkServerIdentity } from 'tls';

test('test', async ({ page }) => {
  /**
   * Represents a Playwright page.
   */
  const playwrightPage = new PlaywrightPage(page);


  await playwrightPage.goto();
  await playwrightPage.clickDocsLink();
  await playwrightPage.clickWritingTestsLink();
  await playwrightPage.verifyH1Text('Writing tests');

  await playwrightPage.clickPerformActionsText();
  await playwrightPage.pressControlOrMetaArrowLeft(2);

  await playwrightPage.clickAnnotationsLink();
  await playwrightPage.verifyIntroductionText('Introduction');
});
  
  
