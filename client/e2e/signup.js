const config = require('./config/config');
const faker = require('faker');

const alias = faker.internet;
const user = faker.name;

module.exports = {
  'User sign up without firstname': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signup')
      .setValue('input[name=firstname]', '')
      .setValue('input[name=lastname]', 'Stark')
      .setValue('input[name=email]', 'arya@stark.com')
      .setValue('input[name=username]', 'Arya')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.submit-signup')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'enter a valid firstname');
  },
  'User sign up without lastname': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signup')
      .setValue('input[name=firstname]', 'Arya')
      .setValue('input[name=lastname]', '')
      .setValue('input[name=email]', 'arya@stark.com')
      .setValue('input[name=username]', 'Arya')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.submit-signup')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'enter a valid lastname');
  },
  'User sign up without email': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signup')
      .setValue('input[name=firstname]', 'Arya')
      .setValue('input[name=lastname]', 'Stark')
      .setValue('input[name=email]', '')
      .setValue('input[name=username]', 'Arya')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.submit-signup')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'enter a valid email');
  },
  'User sign up without username': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signup')
      .setValue('input[name=firstname]', 'Arya')
      .setValue('input[name=lastname]', 'Stark')
      .setValue('input[name=email]', 'arya@stark.com')
      .setValue('input[name=username]', '')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.submit-signup')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'username');
  },
  'User sign up without password': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signup')
      .setValue('input[name=firstname]', 'Arya')
      .setValue('input[name=lastname]', 'Stark')
      .setValue('input[name=email]', 'arya@stark.com')
      .setValue('input[name=username]', 'Arya')
      .setValue('input[name=password]', '')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.submit-signup')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'enter a valid password');
  },
  'User sign up with wrong password confirmation': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signup')
      .setValue('input[name=firstname]', 'Arya')
      .setValue('input[name=lastname]', 'Stark')
      .setValue('input[name=email]', 'aryaa@stark.com')
      .setValue('input[name=username]', 'Arya')
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'anotherPassword')
      .click('.submit-signup')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'paswords did not match. try again');
  },
  'User sign up with short password': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signup')
      .setValue('input[name=firstname]', 'Arya')
      .setValue('input[name=lastname]', 'Stark')
      .setValue('input[name=email]', 'arya@stark.com')
      .setValue('input[name=username]', 'Arya')
      .setValue('input[name=password]', 'pass')
      .setValue('input[name=passwordConfirmation]', 'pass')
      .click('.submit-signup')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'password must be greater than 7 characters')
  },
  'User sign up with invalid email': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signup')
      .setValue('input[name=firstname]', 'Arya')
      .setValue('input[name=lastname]', 'Stark')
      .setValue('input[name=email]', 'arya@stark')
      .setValue('input[name=username]', 'Arya')
      .setValue('input[name=password]', 'pass')
      .setValue('input[name=passwordConfirmation]', 'pass')
      .click('.submit-signup')
      .waitForElementVisible('.alert-error', config.pause)
      .assert.containsText('.alert-error', 'enter a valid email')
  },
  'User successfully signs up': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body', 400)
      .click('.button-signup')
      .setValue('input[name=firstname]', user.firstName())
      .setValue('input[name=lastname]', user.lastName())
      .setValue('input[name=email]', alias.email())
      .setValue('input[name=username]', alias.userName())
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordConfirmation]', 'password')
      .click('.submit-signup')
      .waitForElementVisible('.signin-form', 3000)
      .assert.containsText('.form-container form h1', 'Sign in')
      .assert.urlEquals(`${config.url}signin`)
      .end();
  },
};