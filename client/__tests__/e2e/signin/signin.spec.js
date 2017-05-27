module.exports = {
  'Demo test Google' : function (browser) {
    browser
      .url('http://localhost:9090/')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=identifier]', 'ajudensi')
      .setValue('input[name=password]', 'password123')
      .click('button')
      .pause(1000)
      .assert.containsText('h1', 'Create something awesome')
      .end();
  }
};
