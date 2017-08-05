/**
 * create response codes
 *
 * @export
 * @class Response
 */
export default class Response {

  /**
   * Creates an instance of Response.
   *
   * @memberOf Response
   */
  constructor() {
    this.status = 200;
  }

  /**
   *
   *
   * @static
   * @param {integer} status
   * @returns {integer} - response code
   *
   * @memberOf Response
   */
  static setStatus(status) {
    this.status = status;
    return this;
  }

  /**
   *
   *
   * @static
   * @returns {object} - response object
   *
   * @memberOf Response
   */
  static getStatus() {
    return this.status;
  }

  /**
   *
   *
   * @static
   * @param {object} res
   * @param {object} data
   * @returns {object} - response object
   *
   * @memberOf Response
   */
  static respond(res, data) {
    return res.status(this.getStatus())
      .json(data);
  }

  /**
   *
   *
   * @static
   * @param {object} res
   * @param {object} data
   * @returns {object} - response object
   *
   * @memberOf Response
   */
  static success(res, data) {
    return this.setStatus(200)
      .respond(res, data);
  }

  /**
   *
   *
   * @static
   * @param {object} res
   * @param {string} message
   * @returns {object} - response object
   *
   * @memberOf Response
   */
  static notFound(res, message) {
    return this.setStatus(404)
      .respond(res, {
        message,
      });
  }

  /**
   *
   *
   * @static
   * @param {object} res
   * @param {string} message
   * @returns {object} - response object
   *
   * @memberOf Response
   */
  static internalError(res, message) {
    return this.setStatus(500)
      .respond(res, {
        message,
      });
  }

  /**
   *
   *
   * @static
   * @param {object} res
   * @param {string} message
   * @returns {object} - response object
   *
   * @memberOf Response
   */
  static badRequest(res, message) {
    return this.setStatus(400)
      .respond(res, {
        message
      });
  }

  /**
   *
   *
   * @static
   * @param {object} res
   * @param {string} message
   * @returns {object} - response object
   *
   * @memberOf Response
   */
  static unAuthorized(res, message) {
    return this.setStatus(401)
      .respond(res, {
        message
      });
  }

  /**
   *
   *
   * @static
   * @param {object} res
   * @param {string} message
   * @returns {object} - response object
   *
   * @memberOf Response
   */
  static forbidden(res, message) {
    return this.setStatus(403)
      .respond(res, {
        message
      });
  }

  /**
   *
   *
   * @static
   * @param {object} res
   * @param {string} data
   * @returns {object} - response object
   *
   * @memberOf Response
   */
  static created(res, data) {
    return this.setStatus(201)
      .respond(res, data);
  }
}
