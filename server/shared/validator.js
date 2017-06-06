import checkIt from 'lodash-checkit';

/**
 *
 *
 * @export
 * @class ValidateInput
 */
export default class ValidateInput {
  /**
   * return validation status
   * for signup
   *
   * @static
   * @param {any} userInputs - userSignup Info
   * @returns {Object} - status of signup validation
   *
   * @memberof ValidateInput
   */
  static validateSignup(userInputs) {
    try {
      ['firstname',
        'lastname',
        'email',
        'username',
        'password',
        'passwordConfirmation'].forEach((eachField) => {
          if (!userInputs[eachField]) {
            throw new Error(`enter a valid ${eachField}`);
          }
        });
      if (!checkIt.isEmail(userInputs.email)) {
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
}
