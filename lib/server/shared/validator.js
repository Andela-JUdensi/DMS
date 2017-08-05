'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodashCheckit = require('lodash-checkit');

var _lodashCheckit2 = _interopRequireDefault(_lodashCheckit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: 'validateSignup',
    value: function validateSignup(userInputs) {
      try {
        ['firstname', 'lastname', 'email', 'username', 'password', 'passwordConfirmation'].forEach(function (eachField) {
          if (!userInputs[eachField]) {
            throw new Error('enter a valid ' + eachField);
          }
        });
        if (!_lodashCheckit2.default.isEmail(userInputs.email)) {
          throw new Error('enter a valid email');
        }
        if (userInputs.password !== userInputs.passwordConfirmation) {
          throw new Error('paswords did not match. try again');
        } else if (userInputs.password.length < 7) {
          throw new Error('password must be greater than 7 characters');
        }
      } catch (e) {
        return e.message;
      }
    }
  }, {
    key: 'validateUserUpdate',
    value: function validateUserUpdate(userInfo) {
      if (userInfo.password && userInfo.password.length < 7) {
        return 'password must not be less than 7 characters';
      }
      return true;
    }
  }]);

  return Validator;
}();

exports.default = Validator;