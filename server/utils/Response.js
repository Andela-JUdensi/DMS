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
   * @param {any} status
   * @returns
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
   * @returns
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
   * @param {any} res
   * @param {any} data
   * @returns
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
   * @param {any} res
   * @param {any} data
   * @returns
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
   * @param {any} res
   * @param {any} message
   * @returns
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
   * @param {any} res
   * @param {any} message
   * @returns
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
   * @param {any} res
   * @param {any} message
   * @returns
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
   * @param {any} res
   * @param {any} message
   * @returns
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
   * @param {any} res
   * @param {any} message
   * @returns
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
   * @param {any} res
   * @param {any} data
   * @returns
   *
   * @memberOf Response
   */
  static created(res, data) {
    return this.setStatus(201)
      .respond(res, data);
  }
}
