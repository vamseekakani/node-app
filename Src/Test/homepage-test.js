const assert = require('assert');

describe("Test webdriveruni homepage", () => {
  it("Validate whether the webdriver uni homepage title is correct", () => {
      browser.url('www.webdriveruniversity.com')
      const title = browser.getTitle()
      assert.strictEqual(title, 'WebDriverUniversity.com')
  });
});
