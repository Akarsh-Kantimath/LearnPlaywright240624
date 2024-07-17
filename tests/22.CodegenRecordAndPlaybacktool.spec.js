//To use Codegen - npx playwrightt codegen https://google.com 
//command is used -> after codegen URL of the site is used

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('button', { name: 'Accept all' }).click();
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('Akarsh Kantimath');
  await page.goto('https://www.google.com/search?q=Akarsh+Kantimath&sca_esv=cc0e0c03d1bc2a3c&source=hp&ei=JziVZsijK-KshbIPn4iQgA0&iflsig=AL9hbdgAAAAAZpVGN6GPQBNK0zzEpBZi08VtS9C28ive&ved=0ahUKEwiI0-_ApqmHAxViVkEAHR8EBNAQ4dUDCA0&uact=5&oq=Akarsh+Kantimath&gs_lp=Egdnd3Mtd2l6IhBBa2Fyc2ggS2FudGltYXRoMgUQIRigATIFECEYoAEyBRAhGKABMgUQIRigAUjytgFQ4yVYmWFwAXgAkAEAmAHYAaABtBmqAQYwLjYuMTC4AQPIAQD4AQGYAhGgAqcaqAIKwgIQEC4YAxjlAhjqAhiMAxiPAcICEBAAGAMY5QIY6gIYjAMYjwHCAhEQLhiABBixAxjRAxiDARjHAcICFBAuGIAEGLEDGNEDGIMBGMcBGIoFwgIOEC4YgAQYsQMYgwEYigXCAg4QABiABBixAxiDARiKBcICCxAAGIAEGLEDGIoFwgILEC4YgAQYsQMYgwHCAggQLhiABBixA8ICCxAuGIAEGMcBGK8BwgIIEAAYgAQYsQPCAgUQABiABMICCxAAGIAEGLEDGIMBwgIOEC4YgAQYsQMYgwEY1ALCAggQLhiABBjUAsICBRAuGIAEwgIKEC4YgAQYsQMYCsICDRAAGIAEGLEDGIMBGArCAg0QLhiABBjHARgKGK8BwgIHEAAYgAQYCsICBhAAGBYYHsICCBAAGKIEGIkFwgIIEAAYgAQYogTCAgcQABiABBgNmAMLkgcGMS4zLjEzoAeXhwE&sclient=gws-wiz');
  await page.goto('https://contactout.com/company/soft-suave-technologies-3256004');
  await page.getByText('Akarsh Kantimath').click();
  await page.locator('div:nth-child(7) > .profileCard__wrapper > .profileCard__button-wrapper > .btn').click();
});