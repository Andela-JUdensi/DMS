import {
  UsersController,
  middlewares
} from './dependencies';

const userRoute = (router) => {
  router
    .route('/users')
    /**
     * @swagger
     * /users:
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
     * /users:
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
     *              $ref: '#/definitions/User'
     */
    .get(UsersController.findAll);
  router
    .route('/users/:id')
     /**
     * @swagger
     * /users/{id}:
     *   get:
     *     description: Return a single user by id
     *     tags:
     *      - Return a single user by id
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: array
     */
    .get(UsersController.findOne)
     /**
     * @swagger
     * /users/{id}:
     *   put:
     *     description: Updates details of a single user by id
     *     tags:
     *      - Updates user details
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: array
     */
    .put(middlewares.validateUserUpdate, UsersController.update)
    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     description: Deletes a user by id
     *     tags:
     *      - Deletes a user by id
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       201:
     *         description: users
     *         schema:
     *          type: array
     */
    .delete(middlewares.validateDeleteUser, UsersController.delete);
  router
    .route('/users/login')
      /**
       * @swagger
       * /users/login:
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
       *       201:
       *         description: users
       *         schema:
       *          type: object
       */
    .post(middlewares.validateLoginInput, UsersController.login);
  router
    .route('/users/logout')
    .post(UsersController.logout);
  router
    .route('/users/:id/documents')
    /**
     * @swagger
     * /users/{id}/documents:
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
     *      responses:
     *        200:
     *          description: user's documents
     *          schema:
     *            type: object
     */
    .get(UsersController.documentsByUser);
};

export default userRoute;
