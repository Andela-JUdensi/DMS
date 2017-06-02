import {
  SearchController,
} from './dependencies';


const searchRoute = (router) => {
  router
    .route('/search/users/')
    /**
     * @swagger
     * /search/users?q={ajudensi}:
     *    get:
     *      description: Returns the user
     *      tags:
     *        - Finds a user by email
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
     *          description: email of a registred user
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
     * /search/documents?q={DocumentTitle}:
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
     *          description: email of a registred user
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
