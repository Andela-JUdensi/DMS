import {
  UsersController,
  middlewares
} from './dependencies';

const userRoute = (router) => {
    /**
     * @swagger
     * definitions:
     *   NewUser:
     *     type: object
     *     required:
     *       - firstname
     *       - lastname
     *       - username
     *       - email
     *       - password
     *     properties:
     *       firstname:
     *         type: string
     *       lastname:
     *         type: string
     *       username:
     *         type: string
     *       password:
     *         type: string
     *         format: password
     *       email:
     *         type: string
     *   User:
     *     allOf:
     *       - $ref: '#/definitions/NewUser'
     *       - required:
     *         - id
     *       - properties:
     *         id:
     *           type: integer
     *           format: int64
     */
  router
    .route('/users')
    /**
     * @swagger
     * /api/users:
     *   post:
     *     description: Creates a user
     *     tags:
     *      - Create User
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: object
     */
    .post(middlewares.validateUserInput, UsersController.create)
     /**
     * @swagger
     * /api/users:
     *   get:
     *     description: Gets a list of all users
     *     tags:
     *      - Get Users List
     *     produces:
     *      - application/json
     *     parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *     responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/NewUser'
     */
    .get(UsersController.findAll);
  router
    .route('/users/:id')
     /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     description: Return a single user by id
     *     tags:
     *      - Return a single user by id
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: id
     *         description: User Id
     *         in:  path
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: array
     */
    .get(UsersController.findOne)
     /**
     * @swagger
     * /api/users/{id}:
     *   put:
     *     description: Updates details of a single user by id
     *     tags:
     *      - Updates user details
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: id
     *         description: User Id
     *         in:  path
     *         required: true
     *         type: integer
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: array
     */
    .put(middlewares.validateUserUpdate, UsersController.update)
    /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     description: Deletes a user by id
     *     tags:
     *      - Deletes a user by id
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: id
     *         description: User Id
     *         in:  path
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: array
     */
    .delete(middlewares.validateDeleteUser, UsersController.delete);
    /**
     * @swagger
     * definitions:
     *   Login:
     *     type: object
     *     required:
     *       - identifier
     *       - password
     *     properties:
     *       password:
     *         type: string
     *         format: password
     *       identifier:
     *         type: string
     */
  router
    .route('/users/login')
      /**
       * @swagger
       * /api/users/login:
       *   post:
       *     description: Signs in a user
       *     tags:
       *      - Signs in a user
       *     produces:
       *      - application/json
       *     parameters:
       *       - name: body
       *         description: User object
       *         in:  body
       *         required: true
       *         type: string
       *         schema:
       *           $ref: '#/definitions/Login'
       *     responses:
       *       200:
       *         description: users
       *         schema:
       *          type: object
       */
    .post(middlewares.validateLoginInput, UsersController.login);
    /**
     * @swagger
     * definitions:
     *   Logout:
     *     type: object
     *     required:
     *       - Authorization
     */
  router
    .route('/users/logout')
    /**
     * @swagger
     * /api/users/logout:
     *   post:
     *     description: Logout a user
     *     tags:
     *      - Logout a user
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/Logout'
     *     responses:
     *       200:
     *         description: successfully logout
     *         schema:
     *          type: object
     */
    .post(UsersController.logout);
  router
    .route('/users/:id/documents')
    /**
     * @swagger
     * /api/users/{id}/documents:
     *    get:
     *      description: Returns the documents belonging to the user of id
     *      tags:
     *        - Returns Documents of A User
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *        - name: id
     *          description: User Id
     *          in:  path
     *          required: true
     *          type: integer
     *      responses:
     *          200:
     *            description: user's documents
     *          schema:
     *            type: object
     */
    .get(UsersController.documentsByUser);
};

export default userRoute;
