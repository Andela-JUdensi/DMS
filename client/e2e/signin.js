const config = require('./config/config');

module.exports = {
  'User sign in without credentials': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signin')
      .setValue('input[name=identifier]', '')
      .setValue('input[name=password]', '')
      .click('.submit-login')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'username and password are required');
  },
  'User sign in with wrong identifier': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signin')
      .setValue('input[name=identifier]', 'I do not exist')
      .setValue('input[name=password]', 'password123')
      .click('.submit-login')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'You don\'t exist');
  },
  'User sign in with wrong password': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.button-signin')
      .setValue('input[name=identifier]', 'thePiper')
      .setValue('input[name=password]', 'a very wrong password')
      .click('.submit-login')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'wrong login credentials');
  },
  'User sign in success': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', config.waitFor)
      .click('.button-signin')
      .setValue('input[name=identifier]', 'ajudensi')
      .setValue('input[name=password]', 'password123')
      .click('.submit-login')
      .waitForElementVisible('.call-to-action', config.pause)
      .assert.containsText('.call-to-action', 'Create something awesome')
      .assert.urlEquals(config.url)
      .end();
  },
};