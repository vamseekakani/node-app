global.title ="http://volvocars.com/intl/v/car-safety/a-million-more"
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url(title)
    await expect(browser).toHaveTitle('A million more | Volvo Cars')
  })
  it('should have expected pictures of cars', async () => {
    //await browser.url(title)
    const pictures = await browser.$$('#ProductListCarousel-1 picture')

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

    for (let i = 0; i < pictures.length; i++) {
      const modelName = await (await pictures[i].$('img')).getAttribute('alt')
      expect(modelName).toBe(expected[i])
    }
  })
})