import {
  SearchController,
} from './dependencies';


const searchRoute = (router) => {
  router
    .route('/search/users/')
    /**
     * @swagger
     * /api/search/users?q={username}:
     *    get:
     *      description: Returns the user
     *      tags:
     *        - Finds a user by username
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *        - in: query
     *          name: q
     *          description: username of a registred user
     *          required: true
     *          type: string
     *      responses:
     *        200:
     *          description: user
     *          schema:
     *            type: object
     */
    .get(SearchController.searchForAUser);
  router
    .route('/search/documents/')
    /**
     * @swagger
     * /api/search/documents?q=documentTitle}:
     *    get:
     *      description: Returns the documents
     *      tags:
     *        - Finds a document by title
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *        - in: query
     *          name: q
     *          description: title of a document
     *          required: true
     *          type: string
     *      responses:
     *        200:
     *          description: user
     *          schema:
     *            type: object
     */
    .get(SearchController.searchForAdocument);
};

export default searchRoute;
