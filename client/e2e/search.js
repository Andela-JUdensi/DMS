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
      .waitForElementVisible('.call-to-action', config.waitFor)
      .click('.button-dashboard')
      .waitForElementVisible('.app-breadcum', config.waitFor)
      .setValue('input[type=text]', 'c')
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
      .click('.top-nav-bar button')
      .waitForElementVisible('.view-users-link', config.waitFor)
      .click('a[href="/members"]')
      .waitForElementVisible('.users-list-table', config.waitFor)
      .click('.drawerHeader button')
      .setValue('input[type=text]', 'a')
      .assert.containsText('.table-username-row', 'SiliconValley')
      .end();
  },
}