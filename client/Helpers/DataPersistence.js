/**
 * Handles data persistency
 * uses localstorage to store data
 * 
 * @export
 * @class DataPersistence
 */
export default class DataPersistence {
    
    /**
     * saves a successful loggedin user info to localStorage
     * 
     * @static
     * @param {string} token - user jwt token
     * @param {integer} userId - user identity
     * @param {integer} roleId - user role identity
     * 
     * @memberof DataPersistence
     */
    static saveToLocalStorage(token, userId, roleId) {
        localStorage.setItem('hermesToken', token);
        localStorage.setItem('hermesuserId', userId);
        localStorage.setItem('hermesroleId', roleId);
    }

    /**
     * deletes a successful loggedOut user info from localStorage
     * 
     * @static
     * 
     * @memberof DataPersistence
     */
    static clearLocalStorage() {
        localStorage.removeItem('hermesToken');
        localStorage.removeItem('hermesuserId');
        localStorage.removeItem('hermesroleId');
    }
}