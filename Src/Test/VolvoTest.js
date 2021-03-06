/*beforeEach(function () {
    browser.url('https://www.volvocars.com/intl/v/car-safety/a-million-more')
})
const fs = require("fs");
const real = require("./constants.js");
console.log(real.arr);*/
var title = 'https://www.volvocars.com/intl/v/car-safety/a-million-more'
const setupTest = async (browser) => {
  // Open website
  await browser.url(title)

  // Press 'Accept' if cookies popup is shown
  const acceptCookiesButton = await browser.$('.optanon-allow-all.accept-cookies-button')
  acceptCookiesButton && await acceptCookiesButton.isDisplayed() && await acceptCookiesButton.click()
}

describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url(title)
    await expect(browser).toHaveTitle('A million more | Volvo Cars')
  })
  it('should have expected pictures of cars', async () => {
    //await browser.url(lib.title)
    const expected = [
      'XC90 Recharge',
      'XC60 Recharge',
      'XC40-Recharge',
      'XC40-Recharge',
      'V90 Recharge',
      'V60 Recharge',
      'S90 Recharge',
      'S60 Recharge'
    ]
    const pictures = await browser.$$('#ProductListCarousel-1 picture')

    for (let i = 0; i < pictures.length; i++) {
      const modelName = await (await pictures[i].$('img')).getAttribute('alt')
      expect(modelName).toBe(expected[i])
    }
  })
  describe('Navigation menu structure', () => {
    it('renders main menu with expected options', async () => {
      // Setup
      await setupTest(browser)

      // Open menu
      const menuButton = await browser.$("button[data-autoid='nav:siteNavHamburgerIcon']")
      await menuButton.waitForClickable({ timeout: 10000 })
      await menuButton.click()
      
      // Assert on menu items
      const expected = [
        'Buy',
        'Own',
        'Why Volvo',
        'Explore',
        'More'
      ]
      const menuItems = await browser.$$("button[data-autoid='nav:sideNavLinksMenuDrawer']")
      for(let i = 0; i < menuItems.length; i++) {
        text = await menuItems[i].getText()
        expect(text).toBe(expected[i])
      }
    })
    it('renders "BUY" menu with expected suboptions', async () => {
      // Setup
      await setupTest(browser)

      // Open menu
      const menuButton = await browser.$("button[data-autoid='nav:siteNavHamburgerIcon']")
      await menuButton.waitForClickable({ timeout: 10000 })
      await menuButton.click()

      // Press "Buy" option
      const menuCloseButton = await browser.$("button[data-autoid='nav:siteNavCloseIcon']")
      await menuCloseButton.waitForDisplayed()

      const menuItems = await browser.$$("button[data-autoid='nav:sideNavLinksMenuDrawer']")
      const buyMenuItem = menuItems[0]
      await buyMenuItem.click()

      // Assert on visible links
      const expectedLinks = [{
        text: 'Build Your Own',
        url: 'https://www.volvocars.com/intl/build'
      }, {
        text: 'Fleet sales',
        url: 'https://www.volvocars.com/intl/buy/purchase/fleet-sales'
      }, {
        text: 'Used cars',
        url: 'https://www.volvocars.com/intl/buy/purchase/used-cars'
      }, {
        text: 'Diplomatic sales',
        url: 'https://www.volvocars.com/intl/buy/purchase/diplomat'
      }, {
        text: 'Child seats',
        url: 'https://www.volvocars.com/intl/own/owner-info/accessories/child-seats'
      }, {
        text: 'Experience Volvo Cars',
        url: 'https://www.volvocars.com/intl/buy/explore/experience-volvo-cars'
      }]
      const menuLinks = await browser.$$("a[data-autoid='nav:sideNavLinksMenuItem']")
      for (let i = 0; i < menuLinks.length; i++) {
        const text = await menuLinks[i].getText()
        const url = await menuLinks[i].getAttribute('href')
        expect(text).toBe(expectedLinks[i].text)
        expect(url).toBe(expectedLinks[i].url)
      }
    })
  })
})