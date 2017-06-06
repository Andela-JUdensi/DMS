const config = require('./config/config');
const faker = require('faker');

const document = faker.lorem;

module.exports = {
  'search for a document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.button-signin')
      .setValue('input[name=identifier]', 'thePiper')
      .setValue('input[name=password]', 'password123')
      .click('.submit-login')
      .waitForElementVisible('.call-to-action', config.pause)
      .click('.button-dashboard')
      .waitForElementVisible('.app-breadcum', config.pause)
      .setValue('input[type=text]', 'c')
      .pause(2000)
      .assert.elementPresent('.each-document-in-stack-title')
      .assert.containsText('.each-document-in-stack-title', 'WHO MOVED MY CHEESE')
      .end();
  },
  'search for a user': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.button-signin')
      .setValue('input[name=identifier]', 'thePiper')
      .setValue('input[name=password]', 'password123')
      .click('.submit-login')
      .waitForElementVisible('.call-to-action', config.pause)
      .click('.top-nav-bar button')
      .waitForElementVisible('.view-users-link', config.pause)
      .click('a[href="/members"]')
      .waitForElementVisible('.users-list-table', config.pause)
      .click('.drawerHeader button')
      .setValue('input[type=text]', 'a')
      .assert.containsText('.table-username-row', 'SiliconValley')
      .end();
  },
}