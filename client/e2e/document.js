const config = require('./config/config');
const faker = require('faker');

const document = faker.lorem;

module.exports = {
  'view public document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.read-document-icon')
      .waitForElementVisible('.document-view-dialog', config.waitFor)
      .assert.elementPresent('.document-view-body')
      .assert.elementPresent('.document-date')
      .assert.elementPresent('.document-user')
      .assert.urlEquals(config.url)
  },
  'add new document successfully': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.button-signin')
      .setValue('input[name=identifier]', 'thePiper')
      .setValue('input[name=password]', 'password123')
      .click('.submit-login')
      .click('.top-nav-bar button')
      .waitForElementVisible('.new-document-link', config.waitFor)
      .click('a[href="/new-document"]')
      .waitForElementVisible('.add-document-form', config.waitFor)
      .click('.drawerHeader button')
      .assert.containsText('.add-document-form h1', 'Add new Document')
      .setValue('input[name=title]', document.words())
      .click('.app-select-dropdown div div button')
      .click('.public div')
      .setValue('.md-editor-textarea', document.paragraphs())
      .click('button[type=submit]')
      .waitForElementVisible('.alert-success', config.waitFor)
      .assert.containsText('.alert-success', 'Document has been added successfully.')
      .end();
  },
  'get user own documents': (browser) => {
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
      .click('.selected-view div div button')
      .click('.select-view-own')
      .waitForElementVisible('.each-document-in-stack-title', config.waitFor)
      .assert.elementPresent('.each-document-in-stack-title')
      .assert.containsText('.each-document-in-stack-title', 'WHO MOVED MY CHEESE')
      .end();
  },
  'delete a document': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.button-signin')
      .setValue('input[name=identifier]', 'ajudensi')
      .setValue('input[name=password]', 'password123')
      .click('.submit-login')
      .waitForElementVisible('.call-to-action', config.waitFor)
      .click('.button-dashboard')
      .waitForElementVisible('.app-breadcum', config.waitFor)
      .assert.containsText('.mui-col-md-3.dashboard-document-count div div div span:last-child', '56')
      .click('.document-options button')
      .click('.delete-document')
      .waitForElementVisible('.open-delete-dialog', config.waitFor)
      .assert.containsText('.open-delete-dialog h3', 'Delete Document')
      .assert.containsText('.delete-document-warning', 'Are you sure you want to delete this document')
      .click('.delete-document-button')
      .pause(config.waitFor)
      .assert.containsText('.mui-col-md-3.dashboard-document-count div div div span:last-child', '55')
      .assert.urlEquals(`${config.url}dashboard`)
      .end();
  },
}