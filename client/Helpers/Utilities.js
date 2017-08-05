/**
 * Provides utitlity functions
 * 
 * @export
 * @class Utilities
 */
export default class Utilities {

  /**
   * convert database date to readable format
   * 
   * @static
   * @param {string} dataString - date from database
   * @returns {string} - readabel date format
   * 
   * @memberof Utilities
   */
  static readDate (dataString) {
    const dateInstance = new Date(dataString);
    return dateInstance.toDateString();
  }

  /**
   *  get role name based on roleId
   * 
   * @static
   * @param {integer} roleId 
   * @returns {string} - role name
   * 
   * @memberof Utilities
   */
  static getRoleName(roleId) {
    switch (roleId) {
      case 1:
        return 'Superadmin';
      case 2:
        return 'Admin';
      default: return 'Regular';
    }
  }

  /**
   * 
   * 
   * @static
   * @param {object} documents 
   * @param {integer} userId 
   * @returns {integer} - user number of document(s)
   * 
   * @memberof Utilities
   */
  static countUserDocuments(documents, userId) {
    return documents.rows
      .filter(document => document.ownerID === userId)
        .length;
  }
}
