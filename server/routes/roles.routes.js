import {
  RolesController,
  middlewares
} from './dependencies';

const rolesRoute = (router) => {
   /**
   * @swagger
   * definitions:
   *   NewRole:
   *     type: object
   *     required:
   *       - roleName
   *       - description
   *     properties:
   *       roleName:
   *         type: string
   *       description:
   *         type: string
   *   Role:
   *     allOf:
   *       - $ref: '#/definitions/NewRole'
   *       - required:
   *         - id
   *       - properties:
   *         id:
   *           type: integer
   *           format: int64
   */
  router
    .route('/roles')
    /**
     * @swagger
     * /api/roles:
     *   post:
     *     description: Creates a role
     *     tags:
     *      - Create Role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *       - name: body
     *         description: Role object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewRole'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .post(middlewares.validateRoleChange, RolesController.create)
    /**
     * @swagger
     * /api/roles:
     *   get:
     *      description: Returns a list of all roles
     *      tags:
     *        - Get Role List
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: false
     *          type: string
     *      responses:
     *          200:
     *              description: roles
     *              schema:
     *                  type: array
     *                  items:
     *                      $ref: '#/definitions/NewRole'
     */
    .get(RolesController.findAll);
  router
    .route('/roles/:id')
     /**
     * @swagger
     * /api/roles/{id}:
     *   get:
     *     description: Returns a role
     *     tags:
     *      - Returns a Role by id
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *       - name: id
     *         description: Role Id
     *         in:  path
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/NewRole'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .get(RolesController.findOne)
    /**
     * @swagger
     * /api/roles/{id}:
     *   put:
     *     description: Updates a role
     *     tags:
     *      - Updates a role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *       - name: id
     *         description: Role Id
     *         in:  path
     *         required: true
     *         type: integer
     *       - name: body
     *         description: Role object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewRole'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .put(middlewares.validateRoleChange, RolesController.update)
     /**
     * @swagger
     * /api/roles/{id}:
     *   delete:
     *     description: Deletes a role
     *     tags:
     *      - Deletes a role
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in:  header
     *         description: an authorization token
     *         required: true
     *         type: string
     *       - name: id
     *         description: Role Id
     *         in:  path
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/NewRole'
     *     responses:
     *       201:
     *         description: roles
     *         schema:
     *          type: object
     */
    .delete(middlewares.validateRoleChange, RolesController.delete);
};

export default rolesRoute;
