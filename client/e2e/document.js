const config = require('./config/config');
const faker = require('faker');

const document = faker.lorem;

module.exports = {
  // 'view public document': (browser) => {
  //   browser
  //     .url(config.url)
  //     .waitForElementVisible('body', config.waitFor)
  //     .click('.read-document-icon')
  //     .waitForElementVisible('.document-view-dialog', config.pause)
  //     .assert.elementPresent('.document-view-body')
  //     .assert.elementPresent('.document-date')
  //     .assert.elementPresent('.document-user')
  //     .assert.urlEquals(config.url)
  // },
  'add new document successfully': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.button-signin')
      .setValue('input[name=identifier]', 'thePiper')
      .setValue('input[name=password]', 'password123')
      .click('.submit-login')
      .waitForElementVisible('.call-to-action', config.pause)
      .click('.top-nav-bar button')
      .waitForElementVisible('.new-document-link', config.pause)
      .click('a[href="/new-document"]')
      .waitForElementVisible('.add-document-form', config.pause)
      .click('.drawerHeader button')
      .assert.containsText('.add-document-form h1', 'Add new Document')
      .setValue('input[name=title]', document.words())
      .click('.app-select-dropdown div div button')
      .click('.public div div')
      .setValue('.md-editor-textarea', document.paragraphs())
      .click('button[type=submit]')
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
      .waitForElementVisible('.call-to-action', config.pause)
      .click('.button-dashboard')
      .waitForElementVisible('.app-breadcum', config.pause)
      .click('.selected-view div div button')
      .click('.select-view-own')
      .pause(2000)
      .assert.elementPresent('.each-document-in-stack-title')
      .assert.containsText('.each-document-in-stack-title', 'WHO MOVED MY CHEESE')
      .end();
  },
  'delete a document': (browser) => {
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
      .click('.document-options button')
      .click('.delete-document')
      .waitForElementVisible('.open-delete-dialog', config.waitFor)
      .assert.containsText('.open-delete-dialog h3', 'Delete Document')
      .assert.containsText('.delete-document-warning', 'Are you sure you want to delete this document')
      .click('.toggle-delete-dialog-close')
      .assert.urlEquals(`${config.url}dashboard`)
      .end();
  },
}